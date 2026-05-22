import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import type { SourceData } from "../source-template";
export declare function regRefToUuid(doc_type: "Item" | "Actor" | "ActiveEffect", rr: any): null | string;
export declare function regRefToId(doc_type: "Item" | "Actor" | "ActiveEffect", rr: any): null | string;
export declare function regRefToLid(rr: any): null | string;
/** Converts a stat array from compcon/old lancer standard to modern standards */
export declare function convertNpcStats(raw_data: Record<string, any>): DeepPartial<SourceData.NpcClass["base_stats"]>;
