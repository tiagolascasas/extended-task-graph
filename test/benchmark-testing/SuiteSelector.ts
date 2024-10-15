import { BenchmarkSuite } from "./BenchmarkLoader.js";

export const SuiteSelector: Record<string, BenchmarkSuite> = {
    GENERIC: {
        name: "TestApps",
        path: "inputs/",
        apps: {
            "disparity": { standard: "c11", topFunction: "top_level", input: "disparity" },
            "edgedetect": { standard: "c++11", topFunction: "edge_detect", input: "edgedetect" },
            "stresstest": { standard: "c++11", topFunction: "app_start", input: "stresstest" },
            "scenarioA": { standard: "c11", topFunction: "main", input: "scenarioA" },
            "scenarioB": { standard: "c11", topFunction: "scenario", input: "scenarioB" },
            "trivial": { standard: "c11", topFunction: "main", input: "trivial" },
        }
    },
    AXBENCH: {
        name: "AxBench",
        path: "clava-benchmarks/AxSuite/lara/benchmark/",
        apps: {
            "blackscholes": { standard: "c++17", topFunction: "BlkSchlsEqEuroNoDiv" },
            "fft": { standard: "c++17", topFunction: "radix2DitCooleyTykeyFft" },
            "inversek2j": { standard: "c++17", topFunction: "main" },
            "jmeint": { standard: "c++17", topFunction: "main" },
            "jpeg": { standard: "c++17", topFunction: "main" },
            "kmeans": { standard: "c++17", topFunction: "segmentImage" },
            "sobel": { standard: "c++17", topFunction: "main" },
        }
    },
    CHSTONE: {
        name: "CHStone",
        path: "clava-benchmarks/CHStone/lara/benchmark/",
        apps: {
            "adpcm": { standard: "c11", topFunction: "adpcm_main" },
            "aes": { standard: "c11", topFunction: "aes_main" },
            "blowfish": { standard: "c11", topFunction: "blowfish_main" },
            "dfadd": { standard: "c11", topFunction: "float64_add" },
            "dfdiv": { standard: "c11", topFunction: "float64_div" },
            "dfmul": { standard: "c11", topFunction: "float64_mul" },
            "dfsin": { standard: "c11", topFunction: "_sin" },
            "gsm": { standard: "c11", topFunction: "Gsm_LPC_Analysis" },
            "jpeg": { standard: "c11", topFunction: "jpeg2bmp_main" },
            "mips": { standard: "c11", topFunction: "mips" },
            "motion": { standard: "c11", topFunction: "main" },
            "sha": { standard: "c11", topFunction: "sha_stream" }
        }
    },
    CORTEXSUITE_CORTEX: {
        name: "CortexSuite",
        path: "clava-benchmarks/CortexSuite/lara/benchmark/",
        apps: {
            "cortex-clustering-kmeans": { standard: "c11", topFunction: "main" },
            "cortex-clustering-spectral": { standard: "c11", topFunction: "main" },
            "cortex-cnn": { standard: "c11", topFunction: "main" },
            "cortex-lda": { standard: "c11", topFunction: "main" },
            "cortex-liblinear": { standard: "c11", topFunction: "main" },
            "cortex-motion-estimation": { standard: "c11", topFunction: "main" },
            "cortex-rbm": { standard: "c11", topFunction: "main" },
            "cortex-sphinx": { standard: "c11", topFunction: "main" },
            "cortex-srr": { standard: "c11", topFunction: "main" },
            "cortex-svd3": { standard: "c11", topFunction: "main" },
            "cortex-word2vec-compute-accuracy": { standard: "c11", topFunction: "main" },
            "cortex-word2vec-distance": { standard: "c11", topFunction: "main" },
            "cortex-word2vec-word2phrase": { standard: "c11", topFunction: "main" },
            "cortex-word2vec-word2vec": { standard: "c11", topFunction: "main" },
            "cortex-word2vec-word-analogy": { standard: "c11", topFunction: "main" }
        }
    },
    CORTEXSUITE_VISION: {
        name: "CortexSuite",
        path: "clava-benchmarks/CortexSuite/lara/benchmark/",
        apps: {
            "vision-disparity": { standard: "c11", topFunction: "getDisparity" },
            "vision-localization": { standard: "c11", topFunction: "main" },
            "vision-mser": { standard: "c11", topFunction: "main" },
            "vision-multicut": { standard: "c11", topFunction: "main" },
            "vision-pca": { standard: "c11", topFunction: "main" },
            "vision-sift": { standard: "c11", topFunction: "main" },
            "vision-stitch": { standard: "c11", topFunction: "main" },
            "vision-svm": { standard: "c11", topFunction: "main" },
            "vision-texture-synthesis": { standard: "c11", topFunction: "create_texture" },
            "vision-tracking": { standard: "c11", topFunction: "main" }
        }
    },
    MACHSUITE: {
        name: "MachSuite",
        path: "clava-benchmarks/MachSuite/lara/benchmark/",
        apps: {
            "aes": { standard: "c11", topFunction: "aes256_encrypt_ecb" },
            "backprop": { standard: "c11", topFunction: "backprop" },
            "bfs-bulk": { standard: "c11", topFunction: "bfs" },
            "bfs-queue": { standard: "c11", topFunction: "bfs" },
            "fft-strided": { standard: "c11", topFunction: "fft" },
            "fft-transpose": { standard: "c11", topFunction: "fft1D_512" },
            "gemm-blocked": { standard: "c11", topFunction: "bbgemm" },
            "gemm-ncubed": { standard: "c11", topFunction: "gemm" },
            "kmp": { standard: "c11", topFunction: "kmp" },
            "md-grid": { standard: "c11", topFunction: "md" },
            "md-knn": { standard: "c11", topFunction: "md_kernel" },
            "nw": { standard: "c11", topFunction: "needwun" },
            "sort-merge": { standard: "c11", topFunction: "ms_mergesort" },
            "sort-radix": { standard: "c11", topFunction: "ss_sort" },
            "spmv-crs": { standard: "c11", topFunction: "spmv" },
            "spmv-ellpack": { standard: "c11", topFunction: "ellpack" },
            "stencil-2d": { standard: "c11", topFunction: "stencil" },
            "stencil-3d": { standard: "c11", topFunction: "stencil3d" },
            "viterbi": { standard: "c11", topFunction: "viterbi" }
        }
    },
    RODINIA: {
        name: "Rodinia",
        path: "clava-benchmarks/Rodinia/lara/benchmark/",
        apps: {
            "backprop": { standard: "c11", topFunction: "main" },
            "bfs": { standard: "c++11", topFunction: "main" },
            "b+tree": { standard: "c11", topFunction: "main" },
            "cfd-euler3d": { standard: "c++11", topFunction: "main" },
            "cfd-euler3d-double": { standard: "c++11", topFunction: "main" },
            "cfd-pre-euler3d": { standard: "c++11", topFunction: "main" },
            "cfd-pre-euler3d-double": { standard: "c++11", topFunction: "main" },
            "heartwall": { standard: "c11", topFunction: "main" },
            "hotspot": { standard: "c++11", topFunction: "main" },
            "hotspot3D": { standard: "c11", topFunction: "main" },
            "kmeans": { standard: "c11", topFunction: "main" },
            "lavaMD": { standard: "c++11", topFunction: "main" },
            "leukocyte": { standard: "c11", topFunction: "main" },
            "lud": { standard: "c11", topFunction: "main" },
            "myocyte": { standard: "c11", topFunction: "main" },
            "nn": { standard: "c11", topFunction: "main" },
            "nw": { standard: "c++11", topFunction: "main" },
            "particlefilter": { standard: "c11", topFunction: "main" },
            "pathfinder": { standard: "c++11", topFunction: "main" },
            "srad-v1": { standard: "c11", topFunction: "main" },
            "srad-v2": { standard: "c++11", topFunction: "main" },
            "streamcluster": { standard: "c++11", topFunction: "main" }
        }
    },
    ROSETTA: {
        name: "Rosetta",
        path: "clava-benchmarks/Rosetta/lara/benchmark/",
        apps: {
            "3d-rendering": { standard: "c++11", topFunction: "rendering_sw" },
            "digit-recognition": { standard: "c++11", topFunction: "DigitRec_sw" },
            "face-detection": { standard: "c++11", topFunction: "face_detect_sw" },
            "optical-flow": { standard: "c++11", topFunction: "optical_flow_sw" },
            "spam-filter": { standard: "c++11", topFunction: "SgdLR_sw", alternateTopFunction: "main" }
        }
    }
} as const;