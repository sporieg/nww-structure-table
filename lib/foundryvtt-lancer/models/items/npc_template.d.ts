import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedNpcTemplateData } from "../../util/unpacking/packed-types";
import { LancerDataModel, LIDField, UnpackContext } from "../shared";
export declare class NpcTemplateModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        lid: LIDField;
        description: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
        base_features: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField<LIDField, any, any, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField.DefaultOptions<any>, any, Set<any>, string, string[]>;
        optional_features: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField<LIDField, any, any, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField.DefaultOptions<any>, any, Set<any>, string, string[]>;
    };
    static migrateData(data: any): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").AnyObject;
}
export declare function unpackNpcTemplate(data: PackedNpcTemplateData, context: UnpackContext): {
    name: string;
    type: EntryType.NPC_TEMPLATE;
    system: DeepPartial<SourceData.NpcTemplate>;
};
