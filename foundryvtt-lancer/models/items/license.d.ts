import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class LicenseModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        lid: import("../shared").LIDField;
        key: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        manufacturer: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
        curr_rank: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
            readonly nullable: false;
            readonly initial: 1;
            readonly min: 1;
            readonly max: 3;
        }, number, number, number>;
    };
    static migrateData(data: any): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").AnyObject;
}
export declare function unpackLicense(name: string, key: string, manufacturer: string, _context: UnpackContext): {
    name: string;
    type: EntryType.LICENSE;
    system: DeepPartial<SourceData.License>;
};
