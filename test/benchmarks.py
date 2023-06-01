# appName: (inputFolderName, outputFolderName, standard, toolConfig)
apps = {
    "scenarioA": ("scenarioA", ".", "c11", {"clock": 10, "starterFunction": "main"}),
    "scenarioB": ("scenarioB", ".", "c11", {"clock": 10, "starterFunction": "main"}),
}

# appName: (canonicalName, inputSize, suite, standard, config)
benchmarks = {
    "CHStone-adpcm": (
        "adpcm",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "adpcm_main"},
    ),
    "CHStone-aes": (
        "aes",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "aes_main"},
    ),
    "CHStone-blowfish": (
        "blowfish",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "blowfish_main"},
    ),
    "CHStone-dfadd": (
        "dfadd",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "float64_add"},
    ),
    "CHStone-dfdiv": (
        "dfdiv",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "float64_div"},
    ),
    "CHStone-dfmul": (
        "dfmul",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "float64_mul"},
    ),
    "CHStone-dfsin": (
        "dfsin",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "_sin"},
    ),
    "CHStone-gsm": (
        "gsm",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "Gsm_LPC_Analysis"},
    ),
    "CHStone-jpeg": (
        "jpeg",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "jpeg2bmp_main"},
    ),
    "CHStone-mips": (
        "mips",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "mips"},
    ),
    "CHStone-motion": (
        "motion",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "main"},
    ),
    "CHStone-sha": (
        "sha",
        "N",
        "CHStone",
        "c11",
        {"clock": 10, "starterFunction": "sha_stream"},
    ),
    "HiFlipVX": (
        "v2",
        "N",
        "HiFlipVX",
        "c++11",
        {"clock": 10, "starterFunction": "main"},
    ),
    "Rosetta-3drendering": (
        "3d-rendering",
        "N",
        "Rosetta",
        "c++11",
        {"clock": 10, "starterFunction": "rendering_sw"},
    ),
    "Rosetta-digitrecog": (
        "digit-recognition",
        "N",
        "Rosetta",
        "c++11",
        {"clock": 10, "starterFunction": "DigitRec_sw"},
    ),
    "Rosetta-facedetect": (
        "face-detection",
        "N",
        "Rosetta",
        "c++11",
        {"clock": 10, "starterFunction": "face_detect_sw"},
    ),
    "Rosetta-opticalflow-curr": (
        "optical-flow",
        "current",
        "Rosetta",
        "c++11",
        {"clock": 10, "starterFunction": "optical_flow_sw"},
    ),
    "Rosetta-opticalflow-sintel": (
        "optical-flow",
        "sintel",
        "Rosetta",
        "c++11",
        {"clock": 10, "starterFunction": "optical_flow_sw"},
    ),
    "Rosetta-spamfilter": (
        "spam-filter",
        "N",
        "Rosetta",
        "c++11",
        {"clock": 10, "starterFunction": "SgdLR_sw"},
    ),
}
