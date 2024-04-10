"use strict";

laraImport("lara.Io");
laraImport("flextask/analysis/ast/AstDumper");
laraImport("flextask/analysis/ast/CallGraphDumper");
laraImport("flextask/analysis/ast/CallTreeDumper");
laraImport("flextask/analysis/ast/SourceCodeStats");
laraImport("flextask/AStage");

class ApplicationAnalyser extends AStage {
    constructor(topFunction, outputDir, appName) {
        super("CTFlow-ApplicationAnalyser", topFunction, outputDir, appName);
    }

    runAllTasks(dumpCallGraph = true, dumpAST = true, generateStatistics = true) {
        if (dumpCallGraph) {
            try {
                this.dumpCallGraph(true);
            } catch (e) {
                this.showTrace(e);
                this.warn("Failed to dump call graph");
            }
            try {
                this.dumpCallTree(true);
            }
            catch (e) {
                this.showTrace(e);
                this.warn("Failed to dump call tree");
            }
        }
        if (dumpAST) {
            try {
                this.dumpAST();
            } catch (e) {
                this.showTrace(e);
                this.warn("Failed to dump AST");
            }
        }
        if (generateStatistics) {
            try {
                this.generateStatistics();
            } catch (e) {
                this.showTrace(e);
                this.warn("Failed to generate statistics");
            }
        }
    }

    dumpAST() {
        const dumper = new AstDumper();
        const str = dumper.dump();

        const path = this.saveToFile(str, "ast.txt");
        this.log(`AST dumped to file ${path}`);
    }

    dumpCallGraph(startFromMain = true) {
        const dumper = new CallGraphDumper();
        const topFun = startFromMain ?
            Query.search("function", { name: "main" }).first() :
            this.getTopFunctionJoinPoint();

        const dot1 = dumper.dump(topFun, "TB");
        const path1 = this.saveToFile(dot1, "callgraph_tb.dot");
        this.log(`Call graph TB dumped to files ${path1}`);

        const dot2 = dumper.dump(topFun, "LR");
        const path2 = this.saveToFile(dot2, "callgraph_lr.dot");
        this.log(`Call graph LR dumped to files ${path2}`);
    }

    dumpCallTree(startFromMain = true) {
        const dumper = new CallTreeDumper();
        const topFun = startFromMain ?
            Query.search("function", { name: "main" }).first() :
            this.getTopFunctionJoinPoint();

        const dot1 = dumper.dump(topFun, "TB");
        const path1 = this.saveToFile(dot1, "calltree_tb.dot");
        this.log(`Call tree TB dumped to files ${path1}`);

        const dot2 = dumper.dump(topFun, "LR");
        const path2 = this.saveToFile(dot2, "calltree_lr.dot");
        this.log(`Call tree LR dumped to files ${path2}`);
    }

    generateStatistics() {
        const codeStats = new SourceCodeStats();
        codeStats.generateAll();
        const str = codeStats.asCsv();

        const path = this.saveToFile(str, "code_stats.csv");
        this.log(`Generated source code statistics in file ${path}`);
    }
}