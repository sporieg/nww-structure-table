import type { LancerCombat, LancerCombatant } from "./combat/lancer-combat";
import fields = foundry.data.fields;
export declare const registerSettings: () => void;
/**
 * Retrieve the automation settings for the system. If automation is turned
 * off, all keys will be `false`.
 * @deprecated Get the setting directly instead.
 */
export declare function getAutomationOptions(): AutomationOptions;
interface AutomationOptionsSchema extends DataSchema {
    /**
     * Master switch for automation
     * @defaultValue `true`
     */
    /**
     * Toggle for whether or not you want the system to auto-calculate hits,
     * damage, and other attack related checks.
     * @defaultValue `true`
     */
    attacks: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * When a mech rolls a structure/overheat macro, should it automatically
     * decrease structure/stress?
     * @defaultValue `true`
     */
    structure: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * When a mech rolls an overcharge, should it automatically apply heat?
     * @defaultValue `true`
     */
    overcharge_heat: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * When a mech rolls an attack with heat (self) and/or overkill, should it
     * automatically apply heat?
     * @defaultValue `true`
     */
    attack_self_heat: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * Handle limited/loading items automatically, or leave that up to the user
     * @defaultValue `true`
     */
    limited_loading: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * Automatically recharge NPC systems at the start of their turn
     * @defaultValue `true`
     */
    npc_recharge: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * Remove measured templates created by attacks when the turn changes
     * @defaultValue `false`
     */
    remove_templates: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * Automatically manage token sizes based on the actor
     * @defaultValue `true`
     */
    token_size: fields.BooleanField<{
        initial: true;
    }>;
}
/**
 * Object for the various automation settings in the system
 */
export declare class AutomationOptions extends foundry.abstract.DataModel<AutomationOptionsSchema> {
    static defineSchema(): {
        attacks: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attacks";
            readonly hint: "lancer.automation.attacks-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attacks";
            readonly hint: "lancer.automation.attacks-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attacks";
            readonly hint: "lancer.automation.attacks-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attacks";
            readonly hint: "lancer.automation.attacks-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        structure: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.structure";
            readonly hint: "lancer.automation.structure-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.structure";
            readonly hint: "lancer.automation.structure-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.structure";
            readonly hint: "lancer.automation.structure-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.structure";
            readonly hint: "lancer.automation.structure-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        overcharge_heat: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.overcharge_heat";
            readonly hint: "lancer.automation.overcharge_heat-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.overcharge_heat";
            readonly hint: "lancer.automation.overcharge_heat-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.overcharge_heat";
            readonly hint: "lancer.automation.overcharge_heat-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.overcharge_heat";
            readonly hint: "lancer.automation.overcharge_heat-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        attack_self_heat: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attack_self_heat";
            readonly hint: "lancer.automation.attack_self_heat-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attack_self_heat";
            readonly hint: "lancer.automation.attack_self_heat-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attack_self_heat";
            readonly hint: "lancer.automation.attack_self_heat-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.attack_self_heat";
            readonly hint: "lancer.automation.attack_self_heat-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        limited_loading: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.limited_loading";
            readonly hint: "lancer.automation.limited_loading-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.limited_loading";
            readonly hint: "lancer.automation.limited_loading-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.limited_loading";
            readonly hint: "lancer.automation.limited_loading-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.limited_loading";
            readonly hint: "lancer.automation.limited_loading-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        npc_recharge: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.npc_recharge";
            readonly hint: "lancer.automation.npc_recharge-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.npc_recharge";
            readonly hint: "lancer.automation.npc_recharge-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.npc_recharge";
            readonly hint: "lancer.automation.npc_recharge-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.npc_recharge";
            readonly hint: "lancer.automation.npc_recharge-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        remove_templates: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.automation.remove_templates";
            readonly hint: "lancer.automation.remove_templates-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.automation.remove_templates";
            readonly hint: "lancer.automation.remove_templates-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.automation.remove_templates";
            readonly hint: "lancer.automation.remove_templates-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.automation.remove_templates";
            readonly hint: "lancer.automation.remove_templates-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        token_size: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.token_size";
            readonly hint: "lancer.automation.token_size-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.token_size";
            readonly hint: "lancer.automation.token_size-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.token_size";
            readonly hint: "lancer.automation.token_size-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.automation.token_size";
            readonly hint: "lancer.automation.token_size-desc";
        }, fields.BooleanField.DefaultOptions>>>;
    };
}
/**
 * Object for the various automation settings in the system
 */
interface ActionTrackerOptionsSchema extends DataSchema {
    /**
     * Whether the hotbar should be displayed.
     * @defaultValue `true`
     */
    showHotbar: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * Whether the players (non-GMs) can modify actions.
     * @defaultValue `true`
     */
    allowPlayers: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * Whether to print turn start/end chat messages.
     * @defaultValue `true`
     */
    printMessages: fields.BooleanField<{
        initial: true;
    }>;
}
export declare class ActionTrackerOptions extends foundry.abstract.DataModel<ActionTrackerOptionsSchema> {
    static defineSchema(): ActionTrackerOptionsSchema;
}
interface StatusIconConfigOptionsSchema extends DataSchema {
    /**
     * Enable the default icon set for conditions & status
     * @defaultValue `true`
     */
    defaultConditionsStatus: fields.BooleanField<{
        initial: true;
    }>;
    /**
     * Enable Cancermantis' icon set for conditions & status
     * @defaultValue `false`
     */
    cancerConditionsStatus: fields.BooleanField<{
        initial: false;
    }>;
    /**
     * Enable Cancermantis' icon set for NPC templates
     * @defaultValue `false`
     */
    cancerNPCTemplates: fields.BooleanField<{
        initial: false;
    }>;
    /**
     * Enable Hayley's icon set for conditions & status.
     * @defaultValue `false`
     */
    hayleyConditionsStatus: fields.BooleanField<{
        initial: false;
    }>;
    /**
     * Enable Hayley's icon set for PC system effects.
     * @defaultValue `false`
     */
    hayleyPC: fields.BooleanField<{
        initial: false;
    }>;
    /**
     * Enable Hayley's icon set for NPC system effects.
     * @defaultValue `false`
     */
    hayleyNPC: fields.BooleanField<{
        initial: false;
    }>;
    /**
     * Enable Hayley's icon set for utility indicators.
     * @defaultValue `false`
     */
    hayleyUtility: fields.BooleanField<{
        initial: false;
    }>;
    /**
     * Enable Tommy's icon set for conditions & status.
     * @defaultValue `false`
     */
    tommyConditionsStatus: fields.BooleanField<{
        initial: false;
    }>;
}
/**
 * Object for the various automation settings in the system
 */
export declare class StatusIconConfigOptions extends foundry.abstract.DataModel<StatusIconConfigOptionsSchema> {
    static defineSchema(): {
        defaultConditionsStatus: fields.BooleanField<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.statusIconsConfig.defaultConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.defaultConditionsStatus-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.statusIconsConfig.defaultConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.defaultConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.statusIconsConfig.defaultConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.defaultConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: true;
            readonly label: "lancer.statusIconsConfig.defaultConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.defaultConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        cancerConditionsStatus: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.cancerConditionsStatus-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.cancerConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.cancerConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.cancerConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        cancerNPCTemplates: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerNPCTemplates";
            readonly hint: "lancer.statusIconsConfig.cancerNPCTemplates-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerNPCTemplates";
            readonly hint: "lancer.statusIconsConfig.cancerNPCTemplates-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerNPCTemplates";
            readonly hint: "lancer.statusIconsConfig.cancerNPCTemplates-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.cancerNPCTemplates";
            readonly hint: "lancer.statusIconsConfig.cancerNPCTemplates-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        hayleyConditionsStatus: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.hayleyConditionsStatus-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.hayleyConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.hayleyConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.hayleyConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        hayleyPC: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyPC";
            readonly hint: "lancer.statusIconsConfig.hayleyPC-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyPC";
            readonly hint: "lancer.statusIconsConfig.hayleyPC-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyPC";
            readonly hint: "lancer.statusIconsConfig.hayleyPC-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyPC";
            readonly hint: "lancer.statusIconsConfig.hayleyPC-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        hayleyNPC: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyNPC";
            readonly hint: "lancer.statusIconsConfig.hayleyNPC-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyNPC";
            readonly hint: "lancer.statusIconsConfig.hayleyNPC-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyNPC";
            readonly hint: "lancer.statusIconsConfig.hayleyNPC-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyNPC";
            readonly hint: "lancer.statusIconsConfig.hayleyNPC-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        hayleyUtility: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyUtility";
            readonly hint: "lancer.statusIconsConfig.hayleyUtility-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyUtility";
            readonly hint: "lancer.statusIconsConfig.hayleyUtility-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyUtility";
            readonly hint: "lancer.statusIconsConfig.hayleyUtility-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.hayleyUtility";
            readonly hint: "lancer.statusIconsConfig.hayleyUtility-desc";
        }, fields.BooleanField.DefaultOptions>>>;
        tommyConditionsStatus: fields.BooleanField<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.tommyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.tommyConditionsStatus-desc";
        }, fields.BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.tommyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.tommyConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.tommyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.tommyConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>, fields.BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            readonly required: true;
            readonly initial: false;
            readonly label: "lancer.statusIconsConfig.tommyConditionsStatus";
            readonly hint: "lancer.statusIconsConfig.tommyConditionsStatus-desc";
        }, fields.BooleanField.DefaultOptions>>>;
    };
}
interface CombatTrackerAppearanceSchema extends DataSchema {
    /**
     * Css class to specify the icon
     * @default `cci cci-activate`
     */
    icon: fields.StringField<{
        required: true;
        initial: "cci cci-activate";
    }>;
    /**
     * Css class to specify deactivation icon
     * @default `cci cci-deactivate`
     */
    deactivate: fields.StringField<{
        required: true;
        initial: "cci cci-deactivate";
    }>;
    /**
     * Size of the icon in rem
     * @default `2`
     */
    icon_size: fields.NumberField<{
        initial: 2;
    }>;
    /**
     * Color for players in the tracker
     * @default `#44abe0`
     */
    player_color: fields.ColorField<{
        initial: "#44abe0";
    }>;
    /**
     * Color for friendly npcs
     * @default `#44abe0`
     */
    friendly_color: fields.ColorField<{
        initial: "#44abe0";
    }>;
    /**
     * Color for neutral npcs
     * @default `#146464`
     */
    neutral_color: fields.ColorField<{
        initial: "#146464";
    }>;
    /**
     * Color for enemy npcs
     * @default `#d98f30`
     */
    enemy_color: fields.ColorField<{
        initial: "#d98f30";
    }>;
    /**
     * Color for units that have finished their turn
     * @default `#444444`
     */
    done_color: fields.ColorField<{
        initial: "#444444";
    }>;
}
export declare class CombatTrackerAppearance extends foundry.abstract.DataModel<CombatTrackerAppearanceSchema> {
    static defineSchema(): {
        icon: fields.StringField<{
            readonly required: true;
            readonly initial: "cci cci-activate";
            readonly label: "LANCERINITIATIVE.Icon";
        }, null, never, never>;
        deactivate: fields.StringField<{
            readonly required: true;
            readonly initial: "cci cci-deactivate";
            readonly label: "LANCERINITIATIVE.DeactivateIcon";
        }, null, never, never>;
        icon_size: fields.NumberField<{
            readonly required: true;
            readonly initial: 2;
            readonly integer: false;
            readonly label: "LANCERINITIATIVE.IconSize";
        }, number, number, number>;
        player_color: fields.ColorField<{
            required: true;
            initial: string;
            label: string;
        }, string, Color, string>;
        friendly_color: fields.ColorField<{
            required: true;
            initial: string;
            label: string;
        }, string, Color, string>;
        neutral_color: fields.ColorField<{
            required: true;
            initial: string;
            label: string;
        }, string, Color, string>;
        enemy_color: fields.ColorField<{
            required: true;
            initial: string;
            label: string;
        }, string, Color, string>;
        done_color: fields.ColorField<{
            required: true;
            initial: string;
            label: string;
        }, string, Color, string>;
    };
}
declare global {
    interface DocumentClassConfig {
        Combat: typeof LancerCombat;
        Combatant: typeof LancerCombatant;
    }
}
export {};
