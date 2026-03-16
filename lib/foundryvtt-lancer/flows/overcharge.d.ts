import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
import { Flow } from "./flow";
import { LancerFlowState } from "./interfaces";
export declare function registerOverchargeSteps(flowSteps: Map<string, any>): void;
export declare class OverchargeFlow extends Flow<LancerFlowState.OverchargeRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: Partial<LancerFlowState.OverchargeRollData>);
}
