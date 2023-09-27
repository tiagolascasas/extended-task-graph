"use strict";

class ACpuEstimator extends AEstimator {
    constructor() {
        super();
    }

    updateTaskWithCpuInfo(task, cpuTime) {
        task.setProperty("cpuTime", cpuTime);
    }
}