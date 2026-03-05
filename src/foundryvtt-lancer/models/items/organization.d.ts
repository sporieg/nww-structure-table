import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType, OrgType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedOrganizationData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class OrganizationModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        lid: import("../shared").LIDField;
        description: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
        actions: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        efficiency: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
            readonly integer: true;
            readonly initial: 0;
            readonly minimum: 0;
            readonly maximum: 6;
        }, number, number, number>;
        influence: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
            readonly integer: true;
            readonly initial: 0;
            readonly minimum: 0;
            readonly maximum: 6;
        }, number, number, number>;
        purpose: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<{
            readonly initial: OrgType.Military;
        }, null, undefined, undefined>;
    };
}
export declare function unpackOrganization(data: PackedOrganizationData, context: UnpackContext): {
    name: string;
    type: EntryType.ORGANIZATION;
    system: DeepPartial<SourceData.Organization>;
};
