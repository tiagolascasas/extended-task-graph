import { Call, Literal, Loop, Vardecl } from "@specs-feup/clava/api/Joinpoints.js";
import { TaskType } from "./TaskType.js";
import { DataItem } from "../DataItem.js";
import { Communication } from "../Communication.js";
import { ControlEdge } from "../ControlEdge.js";
import { DataItemOrigin } from "../DataItemOrigin.js";
import { AccessType } from "../AccessType.js";

export abstract class Task {
    // Basic task details
    private id: string = "TNull";
    private name: string = "<anonymous>"
    private type: TaskType = TaskType.REGULAR;
    private loopReference: Loop | null = null;

    // Data properties
    private dataParams: DataItem[] = [];
    private dataGlobalRefs: DataItem[] = [];
    private dataNew: DataItem[] = [];
    private dataConstants: DataItem[] = [];

    // Data communication properties
    private incomingComm: Communication[] = [];
    private outgoingComm: Communication[] = [];

    // Control properties
    private incomingControl: ControlEdge[] = [];
    private outgoingControl: ControlEdge[] = [];

    // Annotations
    private annotations: Record<string, any> = {};

    constructor(type: TaskType) {
        this.type = type;
    }

    public getType(): TaskType {
        return this.type;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getUniqueName(): string {
        return `${this.id}-${this.name}`;
    }

    public getLoopReference(): Loop | null {
        return this.loopReference;
    }

    // Data methods
    public getDataRead(type = DataItemOrigin.ANY): DataItem[] {
        return this.getDataByAccessType(AccessType.READ, type);
    }

    public getDataWritten(type = DataItemOrigin.ANY): DataItem[] {
        return this.getDataByAccessType(AccessType.WRITE, type);
    }

    public getData(): DataItem[] {
        return [...this.dataParams, ...this.dataGlobalRefs, ...this.dataNew, ...this.dataConstants];
    }

    public getDataAsMap(): Map<string, DataItem> {
        const data = new Map();
        for (const datum of this.getData()) {
            data.set(datum.getName(), datum);
        }
        return data;
    }

    public getDataItemByName(name: string): DataItem | null {
        for (const datum of this.getData()) {
            if (datum.getName() == name) {
                return datum;
            }
        }
        return null;
    }

    public getDataItemByAltName(name: string): DataItem | null {
        for (const datum of this.getData()) {
            if (datum.getAlternateName() == name) {
                return datum;
            }
        }
        return null;
    }

    public getParamData(): DataItem[] {
        return this.dataParams;
    }

    public addParamData(dataItem: DataItem): void {
        this.dataParams.push(dataItem);
    }

    public getGlobalRefData(): DataItem[] {
        return this.dataGlobalRefs;
    }

    public addGlobalRefData(dataItem: DataItem): void {
        this.dataGlobalRefs.push(dataItem);
    }

    public getNewData(): DataItem[] {
        return this.dataNew;
    }

    public addNewData(dataItem: DataItem): void {
        this.dataNew.push(dataItem);
    }

    public getConstantData(): DataItem[] {
        return this.dataConstants;
    }

    public addConstantData(dataItem: DataItem): void {
        this.dataConstants.push(dataItem);
    }

    public getReferencedData(): DataItem[] {
        return [...this.dataParams, ...this.dataGlobalRefs];
    }

    // Communication methods
    public addOutgoingComm(communication: Communication): void {
        this.outgoingComm.push(communication);
    }

    public addIncomingComm(communication: Communication): void {
        this.incomingComm.push(communication);
    }

    public getOutgoingComm(): Communication[] {
        return this.outgoingComm;
    }

    public getIncomingComm(): Communication[] {
        return this.incomingComm;
    }

    public getOutgoingOfData(datum: DataItem): Communication[] {
        const comm = [];
        for (const communication of this.outgoingComm) {
            if (communication.getSourceData().getName() == datum.getName() ||
                communication.getSourceData().getAlternateName() == datum.getName()) {
                comm.push(communication);
            }
        }
        return comm;
    }

    public getIncomingOfData(datum: DataItem): Communication | null {
        for (const communication of this.incomingComm) {
            if (communication.getTargetData().getName() == datum.getName() ||
                communication.getTargetData().getAlternateName() == datum.getName()) {
                return communication;
            }
        }
        return null;
    }

    // Control methods
    public getOutgoingControl(): ControlEdge[] {
        return this.outgoingControl;
    }

    public getIncomingControl(): ControlEdge[] {
        return this.incomingControl;
    }

    public addOutgoingControl(control: ControlEdge): void {
        this.outgoingControl.push(control);
    }

    public addIncomingControl(control: ControlEdge): void {
        this.incomingControl.push(control);
    }

    public createDataObjects(vars: Vardecl[], originType: DataItemOrigin): void {
        for (const vardecl of vars) {
            const data = new DataItem(vardecl, originType);

            switch (originType) {
                case DataItemOrigin.PARAM:
                    this.dataParams.push(data);
                    break;
                case DataItemOrigin.GLOBAL_REF:
                    this.dataGlobalRefs.push(data);
                    break;
                case DataItemOrigin.NEW:
                    this.dataNew.push(data);
                    break;
                default:
                    break;
            }
        }
    }

    public createConstantObject(immConst: Literal, funCall: Call): void {
        const datum = new DataItem(immConst, DataItemOrigin.CONSTANT);
        datum.setImmediateFunctionCall(funCall);
        this.dataConstants.push(datum);
    }

    // Annotations
    public getAnnotation(key: string): any {
        return this.annotations[key];
    }

    public setAnnotation(key: string, value: any): void {
        this.annotations[key] = value;
    }

    public getAnnotations(): Record<string, any> {
        return this.annotations;
    }

    public setAnnotations(annotations: Record<string, any>): void {
        this.annotations = annotations;
    }

    // ---------------------------------------------------------------------
    private getDataByAccessType(accessType: AccessType, origin = DataItemOrigin.ANY): DataItem[] {
        let data: DataItem[] = [];
        if (origin == DataItemOrigin.ANY) {
            data = [
                ...this.dataParams,
                ...this.dataGlobalRefs,
                ...this.dataNew,
                ...this.dataConstants];
        }
        if (origin == DataItemOrigin.PARAM) {
            data = this.dataParams;
        }
        if (origin == DataItemOrigin.GLOBAL_REF) {
            data = this.dataGlobalRefs;
        }
        if (origin == DataItemOrigin.NEW) {
            data = this.dataNew;
        }
        if (origin == DataItemOrigin.CONSTANT) {
            data = this.dataConstants;
        }

        const dataAccessed = [];
        for (const datum of data) {
            if (accessType === AccessType.READ) {
                if (datum.isWritten()) {
                    dataAccessed.push(datum);
                }
            }
            else if (accessType === AccessType.WRITE) {
                if (datum.isWritten()) {
                    dataAccessed.push(datum);
                }
            }
        }
        return dataAccessed;
    }
}