/**
 * Minimal Lancer actor system type declarations.
 */
/**
 * A Step is a function which is used inside a Flow for a discrete action.
 * Steps are exepcted to modify the provided state object as appropriate for the
 * work they are doing, and often include prompting and processing user input.
 * @returns false if the flow should be aborted after this step.
 */
export type Step<T, U> = (state: FlowState<T>, options?: U) => Promise<boolean>;
/**
 * Encapsulates the current state of a Flow. `data` is a generic object with the data
 * relevant to the specific Flow type.
 */
export interface FlowState<T> {
  name: string;
  actor: LancerActor;
  item: LancerItem | null;
  currentStep: string;
  data?: T;
}
/**
 * A Flow is a game process composed of one or more Steps. Flows can be triggered
 * by either automation (e.g. structure/stress rolls) or by user interaction
 * (e.g. a weapon attack).
 *
 * Once a flow is triggered, it goes through its Steps in order, gathering
 * data and user input as needed, and generally ends with outputting a chat card.
 *
 * Some Flows' chat cards will contain buttons for rerolling (perform the same
 * Flow again, with data pre-loaded from the state of the Flow which generated
 * the chat card), or buttons which can trigger other flows (e.g. damage
 * application).
 */
export declare class Flow<StateData> {
  static steps: Array<string>;
  state: FlowState<StateData>;
  constructor(uuid: UUIDRef | LancerItem | LancerActor, data?: StateData);
  /**
   * Retrieve a step function from the global registry in game.lancer.flowSteps.
   * @param stepKey The key of the step to retrieve
   * @returns The step with the given key, or null if no such step exists.
   */
  static getStep(stepKey: string): Step<any, any> | Flow<any> | null;
  /**
   * Retrieve a step function from the global registry in game.lancer.flowSteps.
   * Convenience access to the static method.
   * @param stepKey The key of the step to retrieve
   * @returns The step with the given key, or null if no such step exists.
   */
  getStep(stepKey: string): Step<any, any> | Flow<any> | null;
  /**
   * Insert a step into the step array, to be executed before an existing step
   * @param key Existing step key to insert newKey before
   * @param newKey New step key
   */
  static insertStepBefore(key: string, newKey: string): void;
  /**
   * Insert a step into the step array, to be executed after an existing step
   * @param key Existing step key to insert newKey after
   * @param newKey New step key
   */
  static insertStepAfter(key: string, newKey: string): void;
  /**
   * Remove the given step from the steps to execute
   * @param key Existing step key to delete
   */
  static removeStep(key: string): void;
  /**
   * Start the flow. Each step is awaited in the order they were inserted to the map.
   * @param data Initial data for the specific flow to populate its state.data.
   */
  begin(data?: StateData): Promise<boolean>;
  /**
   * Generate a JSON string representing this Flow instance.
   * This is a generic implementation, some Flows will reimplement as needed.
   * @returns JSON string representing this Flow instance.
   */
  serialize(): string;
  /**
   * Consume a serialized Flow state JSON to create a hydrated Flow instance
   * This is a generic implementation, some Flows will reimplement as needed.
   * @param json Serialized JSON string of the flow.
   * @returns A new Flow constructed from the JSON data.
   */
  static deserialize(json: string): Flow<any>;
}



/**
 * Extend the Actor class for Lancer Actors.
 */
export declare class LancerActor { //extends Actor {
  system: LancerActorSystem;
  uuid: UUIDRef
  static DEFAULT_ICON: string;
  _configure(options: unknown): void;
  /**
   * Want to preserve our arrays, so we use full_update_data to hydrate our update data
   * @override
   */
  update(data: any, options?: any): Promise<this>;
  /** @override
   * This is mostly copy-pasted from Actor.modifyTokenAttribute to allow negative hps, which are useful for structure checks
   */
  modifyTokenAttribute(attribute: string, value: any, isDelta?: boolean, isBar?: boolean): Promise<this>;
  is_pilot(): boolean;
  is_mech(): boolean;
  is_npc(): boolean;
  is_deployable(): boolean;
  hasHeatcap(): this is {
    system: LancerActorSystem;
  };
  items: Array<any>;
  static fromUuid(x: string | LancerActor, messagePrefix?: string): Promise<LancerActor>;
  static fromUuidSync(x: string | LancerActor, messagePrefix?: string): LancerActor;
  statChangeScrollingText(data: unknown): Promise<void>;
  beginFullRepairFlow(title?: string): Promise<boolean>;
  beginStabilizeFlow(title?: string): Promise<boolean>;
  beginOverchargeFlow(): Promise<boolean>;
  beginRechargeFlow(): Promise<boolean>;
  beginStatFlow(path: string, title?: string): Promise<boolean>;
  beginBurnFlow(title?: string): Promise<boolean>;
  beginBasicAttackFlow(title?: string): Promise<boolean>;
  beginDamageFlow(title?: string): Promise<boolean>;
  beginBasicTechAttackFlow(title?: string): Promise<boolean>;
  beginStructureFlow(): Promise<boolean>;
  beginOverheatFlow(): Promise<boolean>;
  tallyBondXP(): Promise<void>;
}

interface LancerActorSystem {
    // ─── Common properties ───────────────────────────────────────────────────
    activations: number;
    agi: number;
    armor: number;
    bonuses: { flat: object; weapon_bonuses: any[] };
    burn: number;
    custom_counters: any[];
    edef: number;
    eng: number;
    evasion: number;
    grit?: number;
    hp: { min: number; max: number; value: number };
    hull: number;
    inherited_effects: any;
    lid: string;
    overshield: { min: number; max: number; value: number };
    resistances: { burn: boolean; energy: boolean; explosive: boolean; heat: boolean; kinetic: boolean; variable: boolean };
    save: number;
    sensor_range: number;
    size: number;
    speed: number;
    statuses: {
        dangerzone: boolean;
        downandout: boolean;
        engaged: boolean;
        exposed: boolean;
        hidden: boolean;
        immobilized: boolean;
        impaired: boolean;
        invisible: boolean;
        jammed: boolean;
        lockon: boolean;
        prone: boolean;
        shredded: boolean;
        shutdown: boolean;
        slowed: boolean;
        stunned: boolean;
    };
    sys: number;
    tech_attack: number;
    action_tracker: { protocol: boolean; move: number; full: boolean; quick: boolean; reaction: boolean | number };

    // ─── NPC / Mech / Deployable / Pilot specific (optional) ───────────────
    tier?: number;
    level?: number;
    heat?: { min: number; max: number; value: number };
    stress?: { min: number; max: number; value: number };
    structure?: { min: number; max: number; value: number };
    repairs?: { min: number; max: number; value: number };
    core_active?: boolean;
    core_energy?: number;
    overcharge?: number;
    overcharge_sequence?: string;
    meltdown_timer?: number | null;
    loadout?: LancerLoadout;
    pilot?: any;
    notes?: string;
    stress_repair_cost?: number;
    structure_repair_cost?: number;
    destroyed?: boolean;
    disabled?: boolean;
    class?: any;
    templates?: any[];
    actions?: LancerAction[];
    activation?: string;
    deactivation?: string | null;
    recall?: string | null;
    redeploy?: string | null;
    avail_mounted?: boolean;
    avail_unmounted?: boolean;
    cost?: number;
    counters?: any[];
    deployer?: any | null;
    detail?: string;
    hp_bonus?: number;
    instances?: number;
    owner?: any;
    stats?: any;
    synergies?: any[];
    tags?: any[];
    type?: string;
    active_mech?: any;
    background?: string;
    bond?: any | null;
    bond_state?: any;
    callsign?: string;
    cloud_id?: string;
    history?: string;
    last_cloud_update?: string;
    mounted?: boolean;
    player_name?: string;
    status?: string;
    text_appearance?: string;

    [key: string]: any;
}

interface LancerLoadout {
    ai_cap: { max: number; min: number; value: number };
    frame: { id: string; status: string; value: any };
    limited_bonus: number;
    sp: { max: number; min: number; value: number };
    systems: any[];
    weapon_mounts: LancerWeaponMount[];
}

interface LancerWeaponMount {
    bracing: boolean;
    slots: LancerMountSlot[];
    type: string;
}

interface LancerMountSlot {
    weapon: { id: string; status: string; value: any } | null;
    mod: { id: string; status: string; value: any } | null;
    size: string;
}

/**
 * Lancer action object — mirrors the ACTION() factory in the Lancer system.
 * Used in system.actions[] arrays on mech_system, mech_weapon, npc_feature, etc.
 */
interface LancerAction {
    name:               string;   // required
    activation:         string;   // required — "Quick" | "Full" | "Protocol" | "Reaction" | "Free" | "Quick Tech" | "Full Tech" | "Invade" | ...
    detail?:            string;   // HTML effect text
    lid?:               string;
    cost?:              number;
    heat_cost?:         number;
    frequency?:         string | null;
    init?:              string;
    trigger?:           string;
    terse?:             string;
    tech_attack?:       boolean;
    damage?:            { val: string; type: string }[];
    range?:             { val: string; type: string }[];
    mech?:              boolean;
    pilot?:             boolean;
    synergy_locations?: string[];
}

/**
 * Minimal Lancer item system type declarations.
 */
interface LancerItemSystem {
    // ─── Universal ───────────────────────────────────────────────────────────
    lid: string;
    equipped?: boolean;
    destroyed?: boolean;

    // ─── Text / display ──────────────────────────────────────────────────────
    description?: string;
    effect?: string;
    flavor?: string;
    tactics?: string;
    detail?: string;

    // ─── Tags / synergies / actions ──────────────────────────────────────────
    tags?: any[];
    synergies?: any[];
    actions?: LancerAction[];
    counters?: any[];
    bonuses?: any[];

    // ─── NPC class (npc_class) ───────────────────────────────────────────────
    role?: string;
    base_features?: Set<string> | string[];
    optional_features?: Set<string> | string[];
    base_stats?: any[];

    // ─── NPC feature / weapon / system (npc_feature) ─────────────────────────
    type?: string;
    activation?: string;
    recharge?: number | null;
    charged?: boolean;
    uses?: { min: number; max: number; value: number };
    accuracy?: number;
    attack_bonus?: number;
    range?: any[];
    damage?: any[];
    on_hit?: string;
    on_crit?: string;

    // ─── Pilot / mech gear ───────────────────────────────────────────────────
    license?: string;
    license_level?: number;
    cost?: number;
    limited?: number;
    pilot?: boolean;

    [key: string]: any;
}


/**
 * fvtt-types configuration.
 *
 * These interfaces MUST be merged through `declare module "fvtt-types/configuration"`.
 * A bare global `interface Foo` does not merge with fvtt-types, it replaces it, which
 * silently strips every core member from the type.
 */

export {};

declare module "fvtt-types/configuration"
{
  // ─── game.modules.get('lancer-automations').api ───────────────────────────
  interface ModuleConfig
  {
    "lancer-automations": {
      //api: LancerAutomationsAPI;
    };
  }

  interface RequiredModules
  {
    "lancer-automations": true;
  }

  // Optional integrations reached through game.modules.get(...).api.
  interface ModuleConfig
  {
    "temporary-custom-statuses": { api: any };
    "templatemacro": { api: any };
  }

  // Hooks this module emits, plus the Lancer system and third-party hooks it listens to.
  namespace Hooks
  {
    interface HookConfig
    {
      [key: `lancer-automations.${string}`]: (...args: any[]) => any;
      [key: `lancer.preFlow.${string}`]: (...args: any[]) => any;
      [key: `lancer.postFlow.${string}`]: (...args: any[]) => any;
      "lancer.registerFlows": (...args: any[]) => any;
      "lancer.statusesReady": (...args: any[]) => any;
      "terrain-height-tools.updateTerrain": (...args: any[]) => any;
      forceUpdateTokenActionHud: (...args: any[]) => any;
      modifyPlannedMovement: (...args: any[]) => any;
      recordToken: (...args: any[]) => any;
      createSequencerEffect: (...args: any[]) => any;
      preCreateSequencerEffect: (...args: any[]) => any;
      endedSequencerEffect: (...args: any[]) => any;
    }
  }

  // ─── Document flags ───────────────────────────────────────────────────────
  interface FlagConfig
  {
    Actor: {
      "lancer-automations": {
        constant_bonuses?: any[];
        global_bonuses?: any[];
        ephemeral_bonuses?: any[];
        smokeTemplates?: string[];
        [key: string]: any;
      };
      "token-factions"?: {
        team?: any;
        [key: string]: any;
      };
      [key: string]: any;
    };
    ActiveEffect: {
      // "lancer-automations": LancerEffectFlags;
      [key: string]: any;
    };
    TokenDocument: {
      "lancer-automations": {
        fallStartElevation?: number;
        //moveHistory?: MoveHistoryData;
        movementCap?: number;
        [key: string]: any;
      };
      "token-factions"?: {
        team?: any;
        [key: string]: any;
      };
      [key: string]: any;
    };
    Item: {
      "lancer-automations": {
        [key: string]: any;
      };
      [key: string]: any;
    };
    Combat: {
      "lancer-automations": {
        delayedAppearances?: any[];
        [key: string]: any;
      };
      [key: string]: any;
    };
  }

  // ─── Lancer system data models ────────────────────────────────────────────
  // Subtypes come from systems/lancer/system.json documentTypes.
  interface DataConfig
  {
    Actor: {
      npc: LancerActorSystem;
      pilot: LancerActorSystem;
      mech: LancerActorSystem;
      deployable: LancerActorSystem;
    };
    Item: {
      core_bonus: LancerItemSystem;
      frame: LancerItemSystem;
      license: LancerItemSystem;
      npc_class: LancerItemSystem;
      npc_template: LancerItemSystem;
      npc_feature: LancerItemSystem;
      weapon_mod: LancerItemSystem;
      mech_system: LancerItemSystem;
      mech_weapon: LancerItemSystem;
      organization: LancerItemSystem;
      pilot_armor: LancerItemSystem;
      pilot_gear: LancerItemSystem;
      pilot_weapon: LancerItemSystem;
      reserve: LancerItemSystem;
      status: LancerItemSystem;
      talent: LancerItemSystem;
      skill: LancerItemSystem;
      bond: LancerItemSystem;
    };
  }

  interface SourceConfig
  {
    Actor: DataConfig["Actor"];
    Item: DataConfig["Item"];
  }

  // Lancer owns every subtype in play, so the "base" and module-subtype branches only
  // widen `.system` into an unusable union here.
  interface SystemConfig
  {
    Actor: {
      base: "ignore";
      moduleSubtype: "ignore";
    };
    Item: {
      base: "ignore";
      moduleSubtype: "ignore";
    };
  }

  // Value types are not declared per key yet, so reads stay as loose as they are today.
  interface SettingConfig
  {
    [key: `lancer-automations.${string}`]: any;
    [key: `lancer.${string}`]: any;
    [key: `csm-lancer-qol.${string}`]: any;
    [key: `token-factions.${string}`]: any;
    [key: `temporary-custom-statuses.${string}`]: any;
    [key: `player-groups.${string}`]: any;
    [key: `force-client-settings.${string}`]: any;
    [key: `templatemacro.${string}`]: any;
    [key: `isometric-perspective.${string}`]: any;
    [key: `terrain-height-tools.${string}`]: any;
  }

  // Everything in this module runs at or after ready, so the pre-ready game unions
  // are noise here.
  interface AssumeHookRan
  {
    ready: never;
  }

  namespace foundry
  {
    interface Game
    {
      // lancer?: LancerSystemAPI;
    }
  }

  // Members the Lancer system adds to the document and placeable classes.
  namespace foundry.documents
  {
    interface Actor
    {
      is_mech(): boolean;
      is_npc(): boolean;
      is_pilot(): boolean;
      is_deployable(): boolean;
    }

    interface Item
    {
      is_npc_class(): boolean;
      is_npc_feature(): boolean;
      is_npc_template(): boolean;
    }
  }

  namespace foundry.canvas.placeables
  {
    interface Token
    {
      //  effects: PIXI.Container & { bg?: any;[key: string]: any };
      _movement: { points: number[];[key: string]: any } | null;
      // Wall Height adds this getter
      losHeight?: number;
    }
  }
}


export declare namespace LancerFlowState {
  interface BaseRollData {
    type: "base";
    title: string;
    roll_str: string;
    result?: RollResult;
    icon?: string;
  }
  export interface RollResult {
    roll: Roll;
    tt: string | HTMLElement | JQuery<HTMLElement>;
  }
  export interface StatRollData extends Omit<BaseRollData, "type"> {
    type: "stat";
    path: string;
    bonus: string | number;
    acc_diff?: AccDiffHudData;
    effect?: string;
  }
  export interface SaveRollData extends Omit<StatRollData, "type"> {
    type: "save";
  }
  export type AttackRolls = {
    roll: string;
    targeted: {
      target: LancerToken;
      roll: string;
      usedLockOn: boolean | null;
    }[];
  };
  export type AttackResult = {
    roll: Roll;
    tt: string | HTMLElement | JQuery<HTMLElement>;
  };
  export type DamageResult = {
    roll: Roll;
    tt: string | HTMLElement | JQuery<HTMLElement>;
    d_type: DamageType;
    bonus: boolean;
    target?: LancerToken;
  };
  export interface DamageResultSerialized extends Omit<DamageResult, "target"> {
    target?: string;
  }
  export type SelfHeatResult = {
    roll: Roll;
    tt: string | HTMLElement | JQuery<HTMLElement>;
  };
  export type HitResult = {
    target: LancerToken;
    total: string;
    usedLockOn: boolean;
    hit: boolean;
    crit: boolean;
  };
  export interface HitResultWithRoll extends HitResult {
    roll: Roll;
    tt: string | HTMLElement | JQuery<HTMLElement>;
  }
  export interface RolledDamage {
    type: DamageType;
    amount: number;
  }
  export interface DamageTargetResult {
    target: LancerToken;
    damage: RolledDamage[];
    hit: boolean;
    crit: boolean;
    ap: boolean;
    paracausal: boolean;
    half_damage: boolean;
  }
  export interface DamageTargetResultSerialized extends Omit<DamageTargetResult, "target"> {
    target: string;
  }
  export interface AttackRollData extends Omit<BaseRollData, "type"> {
    type: "attack";
    grit: number;
    flat_bonus: number;
    acc_diff?: AccDiffHudData;
    attack_type: AttackType;
    action: ActionData | null;
    effect?: string;
    on_attack?: string;
    on_hit?: string;
    on_crit?: string;
    tags?: Tag[];
    self_heat?: string;
    self_heat_result?: SelfHeatResult;
    scene_uuid?: string;
    origin_space?: [number, number];
    target_spaces?: [number, number][];
    is_smart: boolean;
    defense?: string;
    attack_rolls: AttackRolls;
    attack_results: AttackResult[];
    hit_results: HitResult[];
    reroll_data: string;
  }
  export interface WeaponRollData extends Omit<AttackRollData, "type"> {
    type: "weapon";
    damage?: DamageData[];
    bonus_damage?: DamageData[];
    loaded?: boolean;
    destroyed?: boolean;
  }
  export interface TechAttackRollData extends Omit<AttackRollData, "type"> {
    type: "tech";
    invade: boolean;
    damage?: DamageData[];
    bonus_damage?: DamageData[];
    destroyed?: boolean;
  }
  export interface DamageRollData extends Omit<Omit<BaseRollData, "type">, "roll_str"> {
    type: "damage";
    configurable: boolean;
    add_burn: boolean;
    damage_hud_data?: DamageHudData;
    invade?: boolean;
    tags: Tag[];
    ap: boolean;
    paracausal: boolean;
    half_damage: boolean;
    overkill: boolean;
    overkill_heat?: number;
    reliable: boolean;
    reliable_val?: number;
    damage: DamageData[];
    bonus_damage?: DamageData[];
    hit_results: HitResult[];
    has_normal_hit: boolean;
    has_crit_hit: boolean;
    reliable_results?: DamageResult[];
    damage_results: DamageResult[];
    crit_damage_results: DamageResult[];
    reliable_total?: number;
    damage_total: number;
    crit_total: number;
    targets: DamageTargetResult[];
  }
  export interface BurnCheckData extends DamageRollData {
    check_total?: number;
    amount: number;
  }
  export interface ActionUseData extends Omit<BaseRollData, "type"> {
    type: "action";
    acc: number;
    action_path: string;
    action: ActionData | null;
    self_heat?: string;
    self_heat_result?: SelfHeatResult;
    detail: string;
    tags: Tag[];
  }
  export interface SystemUseData {
    title: string;
    type: SystemType.System | SystemType.Mod | NpcFeatureType | null;
    effect: string;
    tags?: Tag[];
    self_heat?: string;
    self_heat_result?: SelfHeatResult;
  }
  export interface TalentUseData {
    title: string;
    lvl: number;
    rank: {
      name: string;
      description: string;
    };
  }
  export interface BondPowerUseData {
    title: string;
    powerIndex: number;
    description: string;
  }
  export interface GenericData {
    title: string;
    effect: string;
  }
  export interface ReactionRollData {
    title: string;
    trigger: string;
    effect: string;
    tags?: TagData[];
  }
  export interface TextRollData {
    title: string;
    description: string;
    tags?: TagData[];
  }
  export interface HTMLToChatData {
    html: string;
  }
  export interface ActionTrackData extends TextRollData {
    start: boolean;
  }
  export interface OverchargeRollData extends Omit<BaseRollData, "type"> {
    type: "overcharge";
    level: number;
  }
  export interface RechargeRollData extends Omit<BaseRollData, "type"> {
    type: "recharge";
    recharging_uuids: string[];
    charged: {
      name: string;
      target: number;
      charged: boolean;
    }[];
  }
  export interface PrimaryStructureRollData extends Omit<BaseRollData, "type"> {
    type: "structure";
    desc: string;
    val: number;
    max: number;
    result?: {
      roll: Roll;
      tt: string | HTMLElement | JQuery<HTMLElement>;
      total: string;
    };
    reroll_data?: {
      structure: number;
    };
    remStruct: number;
    embedButtons?: Array<string>;
  }
  export interface SecondaryStructureRollData extends Omit<BaseRollData, "type"> {
    type: "secondary_structure";
    desc: string;
    result?: {
      roll: Roll;
      tt: string | HTMLElement | JQuery<HTMLElement>;
      total: string;
    };
  }
  export interface OverheatRollData extends Omit<BaseRollData, "type"> {
    type: "overheat";
    desc: string;
    val: number;
    max: number;
    result?: {
      roll: Roll;
      tt: string | HTMLElement | JQuery<HTMLElement>;
      total: string;
    };
    reroll_data?: {
      stress: number;
    };
    remStress: number;
    embedButtons?: Array<string>;
  }
  export interface CascadeRollData extends Omit<BaseRollData, "type"> {
    type: "cascade";
    desc: string;
    ai_systems: string[];
    result?: {
      roll: Roll;
      tt: string | HTMLElement | JQuery<HTMLElement>;
      total: string;
    };
  }
  export interface StabilizeData {
    title: string;
    description: string;
    option1: StabOptions1;
    option2: StabOptions2;
  }
  export interface InvocationData {
    fn: string;
    args: Array<any>;
    iconPath?: string;
    title: string;
  }
  type RollData = BaseRollData | StatRollData | AttackRollData | WeaponRollData | TechAttackRollData | ActionUseData;
  export function isStatRoll(data: RollData): data is StatRollData;
  export function isAttackRoll(data: RollData): data is AttackRollData;
  export function isWeaponRoll(data: RollData): data is WeaponRollData;
  export function isTechRoll(data: RollData): data is TechAttackRollData;
  export function isActionRoll(data: RollData): data is ActionUseData;
  export enum BasicFlowType {
    FullRepair = "FullRepair",
    Stabilize = "Stabilize",
    Overheat = "Overheat",
    Structure = "Structure",
    Burn = "Burn",
    Overcharge = "Overcharge",
    BasicAttack = "BasicAttack",
    Damage = "Damage",
    TechAttack = "TechAttack"
  }

}
