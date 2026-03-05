import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedNpcClassData } from "../../util/unpacking/packed-types";
import { ControlledLengthArrayField, LIDField, LancerDataModel, NpcStatBlockField, UnpackContext } from "../shared";
export declare class NpcClassModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        lid: LIDField;
        role: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        flavor: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
        tactics: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
        base_features: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField<LIDField, any, any, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField.DefaultOptions<any>, any, Set<any>, string, string[]>;
        optional_features: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField<LIDField, any, any, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SetField.DefaultOptions<any>, any, Set<any>, string, string[]>;
        base_stats: ControlledLengthArrayField<NpcStatBlockField, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            [x: string]: any;
            activations?: number;
            armor?: number;
            hp?: number;
            evasion?: number;
            edef?: number;
            heatcap?: number;
            speed?: number;
            sensor_range?: number;
            save?: number;
            hull?: number;
            agi?: number;
            sys?: number;
            eng?: number;
            size?: number;
            structure?: number;
            stress?: number;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            [x: string]: any;
            activations: number;
            armor: number;
            hp: number;
            evasion: number;
            edef: number;
            heatcap: number;
            speed: number;
            sensor_range: number;
            save: number;
            hull: number;
            agi: number;
            sys: number;
            eng: number;
            size: number;
            structure: number;
            stress: number;
        }>>;
    };
    static migrateData(data: any): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").AnyObject;
}
export declare function unpackNpcClass(data: PackedNpcClassData, context: UnpackContext): {
    name: string;
    type: EntryType.NPC_CLASS;
    img: string | undefined;
    system: DeepPartial<SourceData.NpcClass>;
};
