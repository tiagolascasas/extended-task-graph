"use strict";

laraImport("lara.Io");
laraImport("flextask/analysis/ast/AstDumper");
laraImport("flextask/analysis/ast/CallGraphDumper");
laraImport("flextask/analysis/ast/SourceCodeStats");
laraImport("flextask/AStage");

class ApplicationAnalyser extends AStage {
    constructor(topFunction, outputDir, appName) {
        super("CTFlow-ApplicationAnalyser", topFunction, outputDir, appName);
    }

    runAllTasks() {
        this.dumpAST();
        this.dumpCallGraph();
        this.generateStatistics();
    }

    dumpAST() {
        const dumper = new AstDumper();
        const str = dumper.dump();

        this.saveToFile(str, "ast.txt");
        this.log("AST dumped to file ast.txt");
    }

    dumpCallGraph() {
        const dumper = new CallGraphDumper();
        const str = dumper.dump(this.getTopFunctionJoinPoint());

        this.saveToFile(str, "callgraph.dot");
        this.log("Call graph dumped to file callgraph.dot")
    }

    generateStatistics() {
        const codeStats = new SourceCodeStats();
        codeStats.generateAll();
        const str = codeStats.asCsv();

        this.saveToFile(str, "code_stats.csv");
        this.log("Generated file with source code statistics");
    }
}