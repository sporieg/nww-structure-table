import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType, ReserveType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedReserveData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class ReserveModel extends LancerDataModel<DataSchema, Item> {
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
        consumable: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>>;
        label: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<{
            readonly initial: ReserveType.Tactical;
        }, null, undefined, undefined>;
        used: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>>;
        description: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
    };
}
export declare function unpackReserve(data: PackedReserveData, context: UnpackContext): {
    name: string;
    type: EntryType.RESERVE;
    system: DeepPartial<SourceData.Reserve>;
};
