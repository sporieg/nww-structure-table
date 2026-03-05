import type { DeepPartial } from "@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs";
import { EntryType } from "../../enums";
import { SourceData } from "../../source-template";
import { PackedPilotGearData } from "../../util/unpacking/packed-types";
import { LancerDataModel, UnpackContext } from "../shared";
export declare class PilotGearModel extends LancerDataModel<DataSchema, Item> {
    static DEFAULT_ICON: string;
    static defineSchema(): {
        bonuses: any;
        actions: any;
        synergies: any;
        counters: any;
        deployables: any;
        integrated: any;
        tags: any;
        uses: import("../shared").FakeBoundedNumberField<{
            integer: true;
            nullable: false;
            initial: number;
        }>;
        lid: import("../shared").LIDField;
        description: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<{
            readonly nullable: true;
        }, null, null, null>;
        effect: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.DefaultOptions, string, string, string>;
    };
}
export declare function unpackPilotGear(data: PackedPilotGearData, context: UnpackContext): {
    name: string;
    type: EntryType.PILOT_GEAR;
    system: DeepPartial<SourceData.PilotGear>;
};
