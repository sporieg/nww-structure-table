import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
import { UUIDRef } from "../source-template";
import { Flow, FlowState, Step } from "./flow";
import { LancerFlowState } from "./interfaces";
export declare function registerTextSteps(flowSteps: Map<string, Step<any, any> | Flow<any>>): void;
export declare class SimpleTextFlow extends Flow<LancerFlowState.TextRollData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data: Partial<LancerFlowState.TextRollData>);
}
export declare function printGenericCard(state: FlowState<any>, options?: {
    template?: string;
}): Promise<boolean>;
export declare class SimpleHTMLFlow extends Flow<LancerFlowState.HTMLToChatData> {
    static steps: string[];
    constructor(uuid: UUIDRef | LancerItem | LancerActor, data: Partial<LancerFlowState.HTMLToChatData>);
}
