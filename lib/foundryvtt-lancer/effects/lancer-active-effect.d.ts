import { LancerActor } from "../actor/lancer-actor";
import { EntryType } from "../enums";
import { LancerItem } from "../item/lancer-item";
export type LancerEffectTarget = EntryType.PILOT | EntryType.MECH | EntryType.NPC | EntryType.DEPLOYABLE | "only_drone" | "only_deployable" | "mech_and_npc";
export declare class LancerActiveEffect extends ActiveEffect {
    /**
     * Determine whether this Active Effect is suppressed or not.
     */
    get isSuppressed(): boolean;
    /**
     * Determine whether this Active Effect is present only to be passed to descendants
     */
    affectsUs(): boolean;
    /**
     * Prepare the data structure for Active Effects which are currently applied to an Actor or Item.
     */
    static prepareActiveEffectCategories(actor: LancerActor): Array<{
        type: string;
        label: string;
        effects: [number, LancerActiveEffect][];
    }>;
    static updateIcons(): Promise<void>;
    static initConfig(): Promise<void>;
    /**
     * Load statuses from the compendia and world items and backfill into CONFIG.statusEffects.
     */
    static populateFromWorldItems(): Promise<void>;
    static populateFromCompendiumItems(): Promise<void>;
    static _populateFromItems(items?: LancerItem[], overwrite?: boolean): Promise<void>;
}
export declare const AE_MODE_SET_JSON: any;
export declare const AE_MODE_APPEND_JSON: any;
declare global {
    interface DocumentClassConfig {
        ActiveEffect: typeof LancerActiveEffect;
    }
    interface FlagConfig {
        ActiveEffect: {
            lancer: {
                ephemeral?: boolean;
                target_type?: LancerEffectTarget;
                deep_origin?: string | null;
                status_type?: "status" | "effect" | "condition";
            };
        };
    }
}
