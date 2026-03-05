import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedStatusData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
import { ActiveEffectData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents/_types.mjs";
export declare class StatusModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        lid: import("../shared").LIDField;
        effects: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
        type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<{
            readonly choices: readonly ["status", "condition", "effect"];
            readonly initial: "effect";
        }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
            readonly choices: readonly ["status", "condition", "effect"];
            readonly initial: "effect";
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
            readonly choices: readonly ["status", "condition", "effect"];
            readonly initial: "effect";
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
            readonly choices: readonly ["status", "condition", "effect"];
            readonly initial: "effect";
        }>>;
    };
    static migrateData(data: any): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").AnyObject;
    _preCreate(...[data, options, user]: Parameters<LancerDataModel<DataSchema, Item>["_preCreate"]>): Promise<boolean>;
}
export declare function generateStunnedEffect({ name, description }: {
    name?: string;
    description?: string;
}): Partial<ActiveEffectData>;
export declare function unpackStatus(data: PackedStatusData, _context: UnpackContext): {
    name: string;
    type: EntryType.STATUS;
    img: string;
    effects: Partial<ActiveEffectData>[];
    system: DeepPartial<SourceData.Status>;
};
