import os
from tester import test_app_flows, test_bench_flows


def main():
    os.chdir("src")

    test_app_flows("edgedetect", False, True)
    # test_app_flows("scenarioA", True, True)
    # test_app_flows("scenarioB", True, True)

    ### CHStone
    # test_bench_flows("CHStone-aes-N", True, True)
    # test_bench_flows("CHStone-blowfish-N", True, True)
    # test_bench_flows("CHStone-dfdiv-N", True, True)
    # test_bench_flows("CHStone-dfmul-N", True, True)
    # test_bench_flows("CHStone-gsm-N", True, True)
    # test_bench_flows("CHStone-mips-N", True, True)
    # test_bench_flows("CHStone-sha-N", True, True)
    # test_bench_flows("CHStone-motion-N", True, True)
    # test_bench_flows("CHStone-dfadd-N", True, True)
    # -----------------------------------
    # test_bench_flows("CHStone-adpcm-N", True, True)   # abs issue
    # test_bench_flows("CHStone-dfsin-N", True, True)  # label issue
    # test_bench_flows("CHStone-jpeg-N", True, True)  # bunch of issues

    ### HiFlipVX
    # test_bench_flows("HiFlipVX-v2-N", True, True)

    ### Rosetta
    # test_bench_flows("Rosetta-3d-rendering-N", False, True)
    # test_bench_flows("Rosetta-digit-recognition-N", False, True)
    # test_bench_flows("Rosetta-face-detection-N", False, True)
    # test_bench_flows("Rosetta-optical-flow-current", False, True)
    # test_bench_flows("Rosetta-spam-filter-N", False, True)

    # test_bench_flows("Rosetta-optical-flow-sintel", False, True)


if __name__ == "__main__":
    main()