import { LancerActor, LancerDEPLOYABLE } from "../actor/lancer-actor";
export declare function lookupOwnedDeployables(owner: LancerActor, filter?: string[]): Record<string, LancerDEPLOYABLE>;
export declare function slugify(name: string, dash?: string): string;
export declare function randomString(length: number): string;
