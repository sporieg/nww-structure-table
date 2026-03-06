import { LancerActor } from "../actor/lancer-actor";
import { EntryType } from "../enums";
import { LancerFRAME, LancerItem, LancerMECH_WEAPON, LancerNPC_CLASS, LancerNPC_FEATURE, LancerSTATUS } from "../item/lancer-item";
import { BonusData } from "../models/bits/bonus";
import { LancerActiveEffect } from "./lancer-active-effect";
export declare function frameInnateEffect(frame: LancerFRAME): {
    flags: {
        lancer: {
            ephemeral: boolean;
        };
    };
    name: never;
    img: string;
    origin: string;
    transfer: boolean;
    changes: {
        key: string;
        mode: 5;
        priority: number;
        value: number;
    }[];
};
/**
 * Creates the "innate" ActiveEffect of a pilot, essentially just the buff supplied by being piloted by this mech
 */
export declare function pilotInnateEffects(pilot: LancerActor): LancerActiveEffect[];
/**
 * Creates the "innate" ActiveEffect of an NPC, conferring its tier as a grit bonus to its deployables
 */
export declare function npcInnateEffects(npc: LancerActor): LancerActiveEffect[];
/**
 * Creates the ActiveEffect data for a status/condition
 */
export declare function statusInnateEffect(status: LancerSTATUS): {
    name: never;
    changes: {
        key: string;
        mode: 5;
        priority: number;
    }[];
    origin: string;
    img: string;
    flags: {
        lancer: {
            ephemeral: boolean;
            status_type: "status" | "effect" | "condition";
        };
        core: {
            statusId: string;
        };
    };
};
/**
 * Creates the pseudo-activeeffect-data that goes in the CONFIG.statusEffects variable,
 * based on a particular status
 * @param status Status to convert
 * @returns A value to be placed in CONFIG.statusEffects
 */
export declare function statusConfigEffect(status: LancerSTATUS): any;
export declare function npcClassInnateEffect(class_: LancerNPC_CLASS): {
    flags: {
        lancer: {
            ephemeral: boolean;
        };
    };
    name: never;
    img: string;
    origin: string;
    transfer: boolean;
    changes: {
        key: string;
        mode: number;
        priority: number;
        value: number;
    }[];
};
export declare function npcFeatureBonusEffects(feature: LancerNPC_FEATURE): {
    flags: {
        lancer: {
            ephemeral: boolean;
        };
    };
    name: string;
    img: string;
    origin: string;
    transfer: boolean;
    changes: {
        key: string;
        mode: number;
        priority: number;
        value: number;
    }[];
};
export declare function npcFeatureOverrideEffects(feature: LancerNPC_FEATURE): {
    flags: {
        lancer: {
            ephemeral: boolean;
        };
    };
    name: string;
    img: string;
    origin: string;
    transfer: boolean;
    changes: {
        key: string;
        mode: number;
        priority: number;
        value: number;
    }[];
};
export declare function convertBonus(item: LancerItem, name: string, bonus: BonusData): {
    name: string;
    flags: {
        lancer: {
            target_type: EntryType;
            ephemeral: boolean;
        };
    };
    changes: {
        mode: any;
        value: string;
        priority: number;
        key: string;
    }[];
    transfer: boolean;
    disabled: boolean;
    origin: string;
} | {
    name: string;
    flags: {
        lancer: {
            target_type: EntryType.MECH | EntryType.PILOT | "only_drone" | "only_deployable";
            ephemeral: boolean;
        };
    };
    changes: {
        mode: 2 | 5;
        value: string;
        priority: number;
        key: string;
    }[];
    transfer: boolean;
    disabled: boolean;
    origin: string;
};
/**
 * Determine whether this Active Effect applies to the given weapon
 */
export declare function bonusAffectsWeapon(weapon: LancerMECH_WEAPON, bonus: BonusData): boolean;
