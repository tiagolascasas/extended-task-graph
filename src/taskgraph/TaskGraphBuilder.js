"use strict";

laraImport("weaver.Query");
laraImport("UPTStage");
laraImport("taskgraph/TaskGraph");
laraImport("taskgraph/Task");
laraImport("taskgraph/Communication");
laraImport("taskgraph/TaskGraphDumper");

class TaskGraphBuilder {
    #lastUsedGlobal = new Map();

    constructor() { }

    build(topFunction) {
        const taskGraph = new TaskGraph();

        this.#populateGlobalMap(taskGraph);

        const topTask = this.#buildLevel(taskGraph, topFunction, null, null);

        // main_begin and main_end are special, and outside of the hierarchy
        let rank = 1;
        for (const data of topTask.getReferencedData()) {
            taskGraph.addCommunication(taskGraph.getSource(), topTask, data, data, rank);
            rank++;
        }
        rank = 1;
        for (const data of topTask.getDataWritten()) {
            taskGraph.addCommunication(topTask, taskGraph.getSink(), data, data, rank);
            rank++;
        }

        return taskGraph;
    }

    #populateGlobalMap(taskGraph) {
        const globalTask = taskGraph.getGlobalTask();

        for (const datum of globalTask.getData()) {
            if (datum.isInitialized()) {
                this.#lastUsedGlobal.set(datum.getName(), globalTask);
            }
            else {
                this.#lastUsedGlobal.set(datum.getName(), null);
            }
        }
    }

    #buildLevel(taskGraph, fun, parent, call) {
        const task = new Task(fun, parent, "REGULAR");
        // if task was called by another, add the argument names
        // as alternate names for the task param data
        if (call != null) {
            task.updateWithAlternateNames(call);
        }
        taskGraph.addTask(task);

        const childTasks = [];

        for (const call of Query.searchFrom(fun, "call")) {
            const callee = call.function;

            // Is of type "REGULAR", handle recursively
            if (ClavaUtils.functionHasImplementation(callee)) {
                const regularTask = this.#buildLevel(taskGraph, callee, task, call);
                task.addHierarchicalChild(regularTask);
                childTasks.push(regularTask);
            }
            // Is of type "EXTERNAL", create it on the spot
            else if (!ExternalFunctionsMatcher.isValidExternal(callee)) {
                const externalTask = new Task(callee, task, "EXTERNAL");
                externalTask.setCall(call);
                taskGraph.addTask(externalTask);
                task.addHierarchicalChild(externalTask);
                childTasks.push(externalTask);
            }
            // Should only happen for inlinable functions (e.g., math.h)
            else {
                println("Found an inlinable function: " + callee.signature);
                taskGraph.addInlinable(call);
            }
        }

        // Add communications
        this.#addParentChildrenComm(taskGraph, task, childTasks);

        // update task with R/W data from the children
        this.#updateTaskWithChildrenData(task, childTasks);
        return task;
    }

    #addParentChildrenComm(taskGraph, parent, children) {

        for (const child of children) {
            const childData = child.getData();

            let rank = 1;
            for (const childDatum of childData) {
                if (childDatum.isFromParam()) {
                    this.#buildCommParam(parent, child, childDatum, taskGraph, rank);

                }
                if (childDatum.isFromGlobal()) {
                    this.#buildCommGlobal(childDatum, child, taskGraph, rank);
                }
                rank++;
            }
        }
    }

    #buildCommParam(parent, child, childDatum, taskGraph, rank) {
        const parentData = parent.getData();
        const lastUsed = new Map();
        const dataMap = new Map();

        for (const datum of parentData) {
            lastUsed.set(datum.getName(), parent);
            dataMap.set(datum.getName(), datum);
        }

        const dataAlt = childDatum.getAlternateName();

        const parentDatum = dataMap.get(dataAlt);
        const lastUsedTask = lastUsed.get(dataAlt);

        if (lastUsedTask != null) {
            taskGraph.addCommunication(lastUsedTask, child, parentDatum, childDatum, rank);

            if (childDatum.isWritten()) {
                lastUsed.set(dataAlt, child);
            }
        }
        else {
            println("WARNING: " + dataAlt + " not found in " + parent.getName());
        }
    }

    #buildCommGlobal(childDatum, child, taskGraph, rank) {
        const dataName = childDatum.getName();
        const lastUsedTask = this.#lastUsedGlobal.get(dataName);

        let parentDatum = childDatum;
        for (const datum of lastUsedTask.getData()) {
            if (datum.getName() == dataName) {
                parentDatum = datum;
                break;
            }
        }

        if (lastUsedTask != null && lastUsedTask != child) {
            taskGraph.addCommunication(lastUsedTask, child, parentDatum, childDatum, rank);
        }
        if (childDatum.isWritten()) {
            this.#lastUsedGlobal.set(dataName, child);
        }
    }

    #updateTaskWithChildrenData(task, children) {
        const dataMap = task.getDataAsMap();

        for (const child of children) {
            for (const data of child.getParamData()) {
                const altName = data.getAlternateName();

                if (data.isWritten()) {
                    dataMap.get(altName).setWritten();
                }
            }
        }
    }
}