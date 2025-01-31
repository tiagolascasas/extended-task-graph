export enum OutputDirectories {
    // Stats about the source code (i.e., AST-level analysis)
    APP_STATS_ORIGINAL = "ast/original",
    APP_STATS_TASKS = "ast/trans",

    // Weaved source code at different stages
    SRC_ORIGINAL = "src/original",
    SRC_SUBSET = "src/subset",
    SRC_TASKS = "src/trans",
    SRC_TASKS_INSTRUMENTED = "src/trans_instr",

    // Stats about the task graph
    TASKGRAPH = "etg"
}