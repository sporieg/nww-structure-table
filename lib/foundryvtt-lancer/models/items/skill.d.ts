import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedSkillData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class SkillModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        lid: import("../shared").LIDField;
        description: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
        detail: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        curr_rank: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
            readonly nullable: false;
            readonly initial: 1;
            readonly min: 1;
            readonly max: 3;
        }, number, number, number>;
    };
    static migrateData(data: any): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").AnyObject;
}
export declare function unpackSkill(data: PackedSkillData, context: UnpackContext): {
    name: string;
    type: EntryType.SKILL;
    system: DeepPartial<SourceData.Skill>;
};
