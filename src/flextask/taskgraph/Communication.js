"use strict";

class Communication {
    #source = null;
    #target = null;
    #sourceData = null;
    #targetData = null;
    #rank = -1;

    constructor(source, target, sourceData, targetData, rank) {
        this.#source = source;
        this.#target = target;
        this.#sourceData = sourceData;
        this.#targetData = targetData;
        this.#rank = rank;
    }

    getSource() {
        return this.#source;
    }

    getTarget() {
        return this.#target;
    }

    getSourceData() {
        return this.#sourceData;
    }

    getTargetData() {
        return this.#targetData;
    }

    getData() {
        return [this.#sourceData, this.#targetData];
    }

    getRank() {
        return this.#rank;
    }

    toString() {
        const source = this.#sourceData.getName();
        const target = this.#targetData.getName();
        const limit = 5;

        const nl = (source.length > limit || target.length > limit) ? "\n" : "";
        const str = `${source}/${nl}${target} (${this.#rank})\n{${this.#sourceData.getSizeInBytes()}}`;
        return str;
    }
}