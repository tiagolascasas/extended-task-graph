"use strict";

laraImport("lara.Io");
laraImport("analysis/AstDumper");
laraImport("analysis/CallGraphDumper");
laraImport("analysis/SourceCodeStats");
laraImport("UPTStage");

class ApplicationAnalyser extends UPTStage {
    #outputDir
    #appName

    constructor(outputDir, appName) {
        super("ApplicationAnalyser")
        this.#outputDir = outputDir;
        this.#appName = appName;
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
        const str = dumper.dump();
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

    saveToFile(str, filename) {
        Io.writeFile(this.#outputDir + "/" + this.#appName + "_" + filename, str);
    }
}