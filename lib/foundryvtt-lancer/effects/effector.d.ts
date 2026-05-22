import { LancerActor } from "../actor/lancer-actor";
import { ChangeWatchHelper } from "../util/misc";
import { LancerActiveEffect } from "./lancer-active-effect";
export interface InheritedEffectsState {
    from_uuid: string;
    data: object[];
    visible: boolean;
}
/**
 * A helper class purposed with managing inherited ("ephemeral") active effects on a particular actor.
 * These effects never live on the DB, and are instead instantiated ad-hoc from the system.inherited_effects + item inherited effects
 *
 * Foundry doesn't have a way for actors to transfer effects impermanently to each other (and honestly, it really shouldn't!),
 * so we do it ourselves here. It's a little odd, but all in the name of minimizing DB operations.
 */
export declare class EffectHelper {
    private readonly actor;
    /** Most actors can "passdown" effects to their descendants (deployed drones, etc).
     * Doing this passdown can be expensive - it's a lot of updates possibly!
     * This ChangeWatchHelper makes it so we only push down our ephemerals if we really need to
     */
    _passdownEffectTracker: ChangeWatchHelper;
    constructor(actor: LancerActor);
    setEphemeralEffects(source_uuid: string, data: [], visible?: boolean): Promise<LancerActor>;
    clearEphemeralEffects(): Promise<void>;
    inheritedEffects(): LancerActiveEffect[];
    /**
     * Collect from our current effects (and pilot/mech innate effects) any that should be passed down to descendants.
     * as well as from any innate features (pilot grit, mech save target, etc)
     */
    collectPassdownEffects(): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
        [x: string]: any;
        _id: string;
        changes: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            key: never;
            value: never;
            mode: number;
            priority: number;
        }>[];
        disabled: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        duration: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            startTime: number;
            seconds: number;
            combat: string;
            rounds: number;
            turns: number;
            startRound: number;
            startTurn: number;
        }>;
        description: string;
        icon: string;
        name: never;
        origin: null;
        tint: string;
        transfer: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            initial: true;
            label: "EFFECT.Transfer";
        }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        statuses: never[];
        flags: {
            lancer: {
                ephemeral?: boolean;
                target_type?: import("./lancer-active-effect").LancerEffectTarget;
                deep_origin?: string;
                status_type?: "status" | "effect" | "condition";
            };
        } & import("@league-of-foundry-developers/foundry-vtt-types/src/types/helperTypes.mjs").InterfaceToObject<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/documents/active-effect.mjs").default.CoreFlags>;
    }>[];
    /**
     * Sends appropriate active effects to "children".
     * Utilizes delta tracker + debounce to minimize how often we actually send it. As such, feel free to call it as often as you want
     * @param force If we should do it even if not dirty. Useful for when new deployables dropped etc
     * Debounced
     */
    propagateEffects: (force: boolean) => void;
    propagateEffectsInner(force: boolean): Promise<void>;
    /**
     * Wipes all Statuses and (non ephemeral) ActiveEffects from the Actor.
     *
     * This isn't really in the effectors purview per-say, but it tidies things up a bit
     */
    removeAllStatuses(): Promise<void>;
    /**
     * Locates an ActiveEffect on the Actor by name and removes it if present.
     * @param effect String name of the ActiveEffect to remove.
     */
    removeActiveEffect(effect: string): Promise<void>;
    /**
     * Locates ActiveEffects on the Actor by names provided and removes them if present.
     * @param effects Array of String names of the ActiveEffects to remove.
     */
    removeActiveEffects(effects: string[]): Promise<void>;
    findEffect(effect: string): LancerActiveEffect | null;
}
