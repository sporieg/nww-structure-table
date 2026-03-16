import { EntryType } from "../../enums";
import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { SourceData } from "../../source-template";
import { LancerDataModel } from "../shared";
declare const npc_schema: {
    stress: import("../shared").FullBoundedNumberField;
    structure: import("../shared").FullBoundedNumberField;
    heat: import("../shared").FullBoundedNumberField;
    action_tracker: any;
    lid: import("../shared").LIDField;
    burn: any;
    activations: any;
    custom_counters: any;
    hp: import("../shared").FullBoundedNumberField;
    overshield: import("../shared").FullBoundedNumberField;
    inherited_effects: any;
    destroyed: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>>;
    meltdown_timer: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
        readonly required: false;
        readonly nullable: true;
        readonly integer: true;
        readonly min: 0;
    }, number, number, number>;
    notes: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
    tier: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
        readonly min: 1;
        readonly max: 3;
        readonly initial: 1;
        readonly integer: true;
    }, number, number, number>;
};
type NpcSchema = typeof npc_schema;
export declare class NpcModel extends LancerDataModel<DataSchema, Actor> {
    static DEFAULT_ICON: string;
    static defineSchema(): NpcSchema;
}
export declare function generateNpcDataFromClass(npc_class: {
    name: string;
    type: EntryType.NPC_CLASS;
    img: string | undefined;
    system: DeepPartial<SourceData.NpcClass>;
}): {
    name: string;
    type: EntryType.NPC;
    img: string | undefined;
    system: DeepPartial<SourceData.Npc>;
};
export {};
