"use strict";

laraImport("clava.code.Outliner");
laraImport("clava.profiling.FunctionLevelInstrumentator");
laraImport("preprocessing/OutlineRegionFinder");
laraImport("preprocessing/AppTimerInserter");
laraImport("UPTStage");

class TaskPreprocessor extends UPTStage {
    constructor(topFunction, outputDir, appName) {
        super("CTFlow-TaskPreprocessor", topFunction, outputDir, appName);
    }

    preprocess() {
        this.outlineAll();
        this.insertTimer();
        return this.insertInstrumentation();
    }

    outlineAll() {
        const annotator = new OutlineRegionFinder(this.getTopFunction());

        const genericRegions = annotator.annotateGenericPass();
        const genCnt = this.#applyOutlining(genericRegions, "outlined_fun_");
        this.log(`Outlined ${genCnt} generic regions`);


        // annotator also does the outlining
        // probably need to change the generic annotator to do the same
        const loopCnt = annotator.annotateLoopPass();
        this.log(`Outlined ${loopCnt} loop regions`);

        this.log("Finished outlining regions");
    }

    #applyOutlining(regions, prefix) {
        const outliner = new Outliner();
        outliner.setVerbosity(false);
        outliner.setDefaultPrefix(prefix);

        let outCount = 0;
        for (const region of regions) {
            const start = region[0];
            const end = region[region.length - 1];

            outliner.outline(start, end);

            start.detach();
            end.detach();
            outCount++;
        }
        return outCount;
    }

    insertTimer() {
        const timerInserter = new AppTimerInserter();
        const couldInsert = timerInserter.insertTimer(this.getTopFunction());
        const topFunName = this.getTopFunction().name;

        if (!couldInsert) {
            this.log(`Could not insert timer around application starting point "${topFunName}"`);
        }
        else {
            this.log(`Inserted timer around application starting point "${topFunName}"`);
        }
    }

    insertInstrumentation() {
        const inst = new FunctionLevelInstrumentator();
        const flags = inst.instrument();
        const joinedFlags = flags.join("\n");
        return joinedFlags;
    }
}