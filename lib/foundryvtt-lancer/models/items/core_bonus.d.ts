import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedCoreBonusData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class CoreBonusModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        bonuses: any;
        actions: any;
        synergies: any;
        counters: any;
        deployables: any;
        integrated: any;
        tags: any;
        lid: import("../shared").LIDField;
        description: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<{
            readonly nullable: true;
        }, null, null, null>;
        effect: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        mounted_effect: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        manufacturer: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
    };
    static migrateData(data: any): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").AnyObject;
}
export declare function unpackCoreBonus(data: PackedCoreBonusData, context: UnpackContext): {
    name: string;
    type: EntryType.CORE_BONUS;
    system: DeepPartial<SourceData.CoreBonus>;
};
