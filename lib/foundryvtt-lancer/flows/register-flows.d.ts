import type { Flow, Step } from "./flow";
export declare function registerFlows(): {
    flows: Map<string, typeof Flow<any>>;
    flowSteps: Map<string, Step<any, any> | Flow<any>>;
};
