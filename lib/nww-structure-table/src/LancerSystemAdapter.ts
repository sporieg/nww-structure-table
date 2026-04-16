import type {LancerActor, LancerMECH, LancerNPC, LancerPILOT} from "foundryvtt-lancer/actor/lancer-actor";
import type {LancerActiveEffect} from "foundryvtt-lancer/effects/lancer-active-effect";
import type {LancerItem, LancerTALENT, LancerWEAPON_MOD} from "foundryvtt-lancer/item/lancer-item";
import type {ActionData} from "foundryvtt-lancer/models/bits/action";
import type {Tag} from "foundryvtt-lancer/models/bits/tag";
import {debug} from "./log.js";
import {LancerToken} from "foundryvtt-lancer/token";
import {LancerCombatant} from "foundryvtt-lancer/combat/lancer-combat";

export const DEFAULT_ACTION_NAME = "New action"
export const NO_ACTION_NAME = "Action"

const QuickIcon = `<i class="mdi mdi-hexagon-slice-3" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`
const FullIcon = `<i class="mdi mdi-hexagon-slice-6" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`
// Edit search css?
// Ad somethign to fix it?
export const ENTRY_TYPE = {
  CORE_BONUS: 'core_bonus',
  DEPLOYABLE: 'deployable',
  FRAME: 'frame',
  MECH: 'mech',
  LICENSE: 'license',
  NPC: 'npc',
  NPC_CLASS: 'npc_class',
  NPC_TEMPLATE: 'npc_template',
  NPC_FEATURE: 'npc_feature',
  WEAPON_MOD: 'weapon_mod',
  MECH_SYSTEM: 'mech_system',
  MECH_WEAPON: 'mech_weapon',
  ORGANIZATION: 'organization',
  PILOT_ARMOR: 'pilot_armor',
  PILOT_GEAR: 'pilot_gear',
  PILOT_WEAPON: 'pilot_weapon',
  PILOT: 'pilot',
  RESERVE: 'reserve',
  SKILL: 'skill',
  STATUS: 'status',
  TALENT: 'talent',
  BOND: 'bond',
}

// my-system-adapter.js
const STAT_PATHS = {
  HULL: "system.hull",
  AGI: "system.agi",
  SYS: "system.sys",
  ENG: "system.eng",
  GRIT: "system.grit"
};

// Copied from foundryvtt-lancer/enums, actual values get borked in foundry loading.
export const ActivationType = {
  Core: "Core Power",
  // Core Foundry, retain all for funzies.
  None: "None",
  Passive: "Passive",
  Quick: "Quick",
  QuickTech: "Quick Tech",
  Invade: "Invade",
  Full: "Full",
  FullTech: "Full Tech",
  Other: "Other",
  Reaction: "Reaction",
  Protocol: "Protocol",
  Free: "Free",
}

function isLancerActor(x: any): x is LancerActor {
  return true;
}

const isInvade = (a: ActionData) => a.activation === "Invade"

// Lancer icons at: https://github.com/massif-press/compcon/blob/master/src/assets/glyphs/glyphs.css
const invadeMacroFlow = "Macro.o3nZI3EidYMVc9UX";

let macroInvade: SubMenuItem = {
  id: invadeMacroFlow,
  name: "Invasion Flow",
  img: "systems/lancer/assets/icons/activation_full.svg",
  cost: "Quick/Full",
  description: "Trigger the invasion flow chart"
}

/**
 * I could put the help on system, but I think there are enough potential edge cases
 * among system.weapon/system/other taggable things just put it here.
 * @param value not enough time on this earth for all the system types.
 * @param tags
 */
function tagsCostAndDescription(value: any, tags: Tag[]) {
  let cost: string[] = []
  let descriptions = tags.map(t => {
    // I dunno what happens with is_limited tag and not is_limited, save me jon lancer.
    if (t.is_limited && value.isLimited()) {
      t.name.replace("{VAL}", `${value.system.uses.max}`);
      cost.push(`${value.system.uses.value}/${value.system.uses.max}`);
    }
    if (t.is_selfheat) {
      cost.push(`${t.val} Heat`);
    }
    return t.name.replace("{VAL}", t.val);
  });
  return {
    cost: cost.join(", "),
    description: descriptions.join(" ")
  }
}

export function logInvalidItem(item: unknown, actor?: LancerActor, context = "") {
  if (!item) {
    const actorName = actor?.name || "Unknown Actor";
    const actorUuid = actor?.uuid || "Unknown UUID";
    const ctx = context ? `[${context}] ` : "";
    console.warn(`${ctx}Invalid or null item encountered. Actor: ${actorName}, UUID: ${actorUuid}`, item);
  }
}

const Groups = {
  attacks: {
    id: "attacks",
    systemId: "attacks",
    label: "Attacks",
    icon: "cci cci-role-striker",
    type: "submenu",
  },
  weapon: {
    id: "weapons",
    systemId: "weapons",
    label: "Weapons",
    icon: "cci cci-weapon",
    type: "submenu"
  },
  npcAttacks: {
    id: "weapons",
    systemId: "npc-weapons",
    label: "Weapons",
    icon: "cci cci-weapon",
    type: "submenu"
  },
  invade: {
    id: "invade",
    systemId: "invade-systems",
    label: "Invade",
    icon: "cci cci-role-controller",
    type: "submenu"
  },
  tech: {
    id: "techs",
    systemId: "tech-systems",
    label: "Tech Actions",
    icon: "cci cci-role-support",
    type: "submenu"
  },
  utility: {
    id: "utility",
    systemId: "utility-systems",
    label: "Utility",
    icon: "cci cci-mech-system",
    type: "submenu"
  },
  activate: {
    id: "activate",
    systemId: "activate-player",
    label: "Start Turn",
    icon: "cci cci-activate",
    type: "system"
  },
  endTurn: {
    id: "end-turn",
    systemId: "end-turn",
    label: "End Turn",
    icon: "cci cci-deactivate",
    type: "system"
  },
  sheet: {id: "sheet", label: "Sheet", icon: "fa-solid fa-id-card", type: "sheet"},
} satisfies Record<string, ActionMenuCategory>

const UtilityActions = {
  stabilize: {
    id: "stabilize",
    name: "Stabilize",
    cost: ActivationType.Full,
    img: "systems/lancer/assets/icons/macro-icons/marker.svg",
    description: `When you STABILIZE, you enact emergency protocols to purge your mech’s systems of excess heat, repair your chassis where you can, or eliminate hostile code.`
  },
  overcharge: {
    id: "overcharge",
    name: "Overcharge",
    cost: ActivationType.Free,
    img: "systems/lancer/assets/icons/macro-icons/overcharge.svg",
    description: `Heat for Actions, why not?`
  },
  deploy_drone: {
    id: "Macro.ByD82cBFckjJIl3q",
    name: "Deploy Drone System",
    cost: ActivationType.Quick,
    img: "systems/lancer/assets/icons/white/deployable.svg",
    description: `Deploy a drone?`
  },
  /*mission_rest: {
    id: "Macro.MiJ9OGiYsgtHulQQ",
    name: "Mission Rest",
    img: "systems/lancer/assets/icons/white/repair.svg",
    description: `Short rest during a mission, spend repairs on structure/mounts.  Rebuild a mech [never happened]`
  }*/
} satisfies Record<string, SubMenuItem>

function modSubItem(m: LancerWEAPON_MOD, actor: LancerMECH) {
  let {cost, description} = tagsCostAndDescription(m.system, m.system.tags)

  return {
    id: m.id,
    name: "^[Mod]" + m.name,
    description: [m.system.description, description].join(" "),
    cost: cost,
  }
}

export const ID_DELIMITER = '>';

/*
You might use this for a core item, that has a defualt path instead of other items where you must have the idexed path
 */
function itemActionPath(itemId: string, path: string = "system.actions") {
  return [itemId, path].join(ID_DELIMITER);
}

function itemActionId(itemId: string, idx: number, path: string = "system.actions") {
  return itemActionPath(itemId, `${path}.${idx}`);
}

function getItem(actor: LancerActor, actionId: string): [LancerItem, string] {
  const activationParts = actionId.split(ID_DELIMITER)
  const itemId = activationParts[0]
  const dataPath = activationParts[1]
  // @ts-ignore
  return [actor.items.get(itemId), dataPath]
}

function activateSystem(actor: LancerActor, actionId: string) {
  const [item, dataPath] = getItem(actor, actionId)
  return item.beginActivationFlow(dataPath)
}

function activateCoreSystem(actor: LancerActor, actionId: string) {
  const [item, dataPath] = getItem(actor, actionId)
  return item.beginCoreActiveFlow(dataPath)
}

/**
 * We will
 */
type _SubMenuData = Omit<SubMenuData, "title">


// @ts-ignore
/**
 * Categories
 *
 * * Weapon Actions
 * * Invade Actions
 * * Deployables
 * * Other Systems
 */
// @ts-ignore
Hooks.once("stylish-action-hud.apiReady", (api: StylishActionHudAPI) => {
  debug("Registering Lancer System Adapter");

  class LancerSystemAdapter {
    private systemId: string;
    private base: LancerSystemAdapter;

    constructor() {
      // Close enough lol
      // @ts-ignore
      let adapter = api.getRegisteredAdapters("generic")[0].adapter;
      // @ts-ignore
      this.base = (new adapter());
      this.systemId = "lancer-system";
    }

    getStats(actor: LancerActor, configAttributes: any) {
      return this.base.getStats(actor, configAttributes);
    }

    getConditions(actor: LancerActor) {
      // @ts-ignore
      return (actor.temporaryEffects || [])
        .filter((e) => e.img)
        .map((e) => {
          return ({
            id: e.id || e.name,
            src: e.img,
            name: e.name || "Unknown",
            // value: e.value ?? null,
          });
        });
    }

    updateAttribute(actor: LancerActor, path: string, input: string) {
      return this.base.updateAttribute(actor, path, input);
    }

    async removeCondition(actor: LancerActor, conditionId: string) {
      // @ts-ignore
      const effect = actor.effects.find(
        // @ts-ignore
        (e: LancerActiveEffect) => e.id === conditionId || e.name === conditionId
      );
      if (effect) {
        await effect.delete();
      }
    }

    rollStat(actor: LancerActor, path: string, event: any) {
      if (this.isStatRollable(path)) {
        return actor.beginStatFlow(path);
      }
      return null;
    }

    isStatRollable(path: string) {
      return /^system\.(hull|agi|sys|eng|grit)$/.test(path);
    }


    async useItem(actor: LancerActor, itemId: string) {
      if (itemId.startsWith("Macro.") || itemId.startsWith("macro-")) {
        const macro = game.macros?.get(itemId
          // If you copy a UUID from foundry
          .replace("Macro.", "")
          // Stylish does this to macros for some reason.
          .replace("macro-", "")
        );
        // @ts-ignore
        return macro?.execute({actor});
      }
      switch (itemId) {
        case UtilityActions.stabilize.id:
          return actor.beginStabilizeFlow();
        case UtilityActions.overcharge.id:
          return actor.beginOverchargeFlow();
      }
      // We built an encoded id for system activations.  Go specialized to general purpose system. flows.
      if (itemId.includes("system.core_system") //Your active core bonus.
        && !itemId.includes("system.core_system.active_actions")
        && !itemId.includes("system.core_system.passive_actions")  // Passives are used like normal systems.
      ) {
        return activateCoreSystem(actor, itemId);
      }
      if (itemId.includes("system")) {
        return activateSystem(actor, itemId);
      }

      const item = actor.items.get(itemId) as LancerItem;
      if (!item) {
        switch (itemId) {
          case "basic-attack":
            return actor.beginBasicAttackFlow("Basic Attack");
          case "basic-tech-attack":
            return actor.beginBasicTechAttackFlow("Basic Tech");
        }
        ui.notifications?.warn(`Item not found: ${itemId}`);
        return;
      }

      /*if (typeof item.use === "function") return item.use();
      if (typeof item.roll === "function") return item.roll();*/

      if (item.is_weapon()) return item.beginWeaponAttackFlow();
      if (item.is_weapon_mod()) return item.beginActivationFlow()
      return item.sheet.render(true);
    }

    async executeAction(actor: LancerActor, actionId: string) {
      // I am not checking for combat, assume combat is active when using this class.
      // There is probably a problem if you put your token on like, 5 times?
      // @ts-ignore
      const yourToken = canvas.tokens.controlled.filter((t: LancerToken) => {
        return t.actor.id === actor.id
      })[0];
      if (!yourToken)
        ui.notifications?.warn("You must have a token selected to use this action.");
      switch (actionId) {
        case Groups.activate.id:
          // @ts-ignore
          return await game.combat.activateCombatant(yourToken.combatant.id);
      }
    }

    getCoreLancerActions(actor: LancerActor): ActionMenuCategory[] {
      if (actor.is_deployable()) return [];
      if (actor.is_mech()) {
        return [
          //Groups.attacks,
          Groups.weapon,
          Groups.invade,
          Groups.tech,
          Groups.utility
        ];
      }
      if (actor.is_npc()) {
        return [
          //Groups.npcAttacks,
        ]
      }
      if (actor.is_pilot()) {
        return [];
      }
      return [
        {id: "sheet", label: "Sheet", icon: "fa-solid fa-id-card", type: "sheet"},
      ];
    }

    getActionCategories(actor: LancerActor): ActionMenuCategory[] {
      // @ts-ignore this is if you set the config globally, why though?  You don't have actove method access then, just macro.
      let customized = this.base.getActionCategories(actor);
      const basicActions = this.getCoreLancerActions(actor)
        .map((a, idx) => {
          if (a.type == "submenu") {
            a.id = `${a.id}-${idx}`
          }
          return a;
        });
      if (game.combat && (actor.is_mech() || actor.is_npc())) {
        // Is it our turn?
        // @ts-ignore this is if you set the config globally, why though?  You don't have actove method access then, just macro.
        const myTurn = game.combat.combatants.find(c => c.actor.id === actor.id) as LancerCombatant;
        if (myTurn && myTurn.activations.value > 0) {
          basicActions.push(Groups.activate);
        }
      }
      if (customized?.length > 0) {
        basicActions.push(...customized);
      }
      basicActions.push(Groups.sheet);
      return basicActions;
    }

    // Straight copied from base, I wish I could just inherit from it :/
    async getSubMenuData(actor: LancerActor, categoryId: string) {
      // [수정] ID 파싱 로직 개선 (menu-0, custom-0 모두 대응)
      const [id, idx] = categoryId.split("-");
      const index = parseInt(idx);

      // @ts-ignore
      const config = game.settings.get("stylish-action-hud", "configuration") as any;

      // 1. 우선 커스텀 설정(customMenu)에서 데이터를 찾아봅니다.
      // Menus are replaced in order normally, but I am going to treat them as additive.
      // Therefore you could get custom-0 and weapons-0;  custom- is you made it in the gui.
      // I therefore re-arranged these checks from base.js
      if (id === "custom") {
        let menuData = config.customMenu?.[index];
        if (menuData) {
          // ★ [Case B] 순수 커스텀 메뉴
          // @ts-ignore
          return this.base._getCustomSubMenuData(actor, menuData, index);
        }
      }
      // Maybe this is if you register-default menu?
      const defaultLayout = this.getActionCategories(actor);
      if (defaultLayout[index]) {
        let menuData = defaultLayout[index];
        // ★ [Case A] 시스템 고유 ID가 있는 경우 (예: "attack", "magic")
        if (menuData.systemId) {
          return await this._getSystemSubMenuData(actor, menuData.systemId, menuData);

        }
      }
      // 여전히 데이터가 없으면 빈 리스트 반환
      return {title: "", items: []};
    }

    async _getSystemSubMenuData(actor: LancerActor, systemId: string, menuData: ActionMenuCategory): Promise<SubMenuData> {
      switch (systemId) {
        case Groups.weapon.systemId:
          if (actor.is_mech()) {
            return {...this._buildWeapons(actor), title: menuData.label};
          }
          return {title: "mech fail", items: []};
        case Groups.invade.systemId:
          if (actor.is_mech()) {
            return {...this._buildInvades(actor), title: menuData.label};
          }
          return {title: "mech fail", items: []};
        case Groups.tech.systemId:
          return {...this._buildTechActivations(actor), title: menuData.label};
        case Groups.utility.systemId:
          return {...this._buildUtility(actor), title: menuData.label};
        case Groups.npcAttacks.systemId:
          if (actor.is_npc()) {
            return {...this._buildNpcAttacks(actor), title: menuData.label};
          }
          return {title: "npc fail", items: []};
        default:
          return {title: "label", items: []};
      }
    }

    _buildUtility(actor: LancerActor): _SubMenuData {
      return {
        items: Object.values<SubMenuItem>(UtilityActions)
      }
    }

    _buildNpcAttacks(actor: LancerNPC): _SubMenuData {
      return {
        items: {}
      }
    }

    _buildWeapons(actor: LancerMECH): _SubMenuData {
      const loadout = actor.system.loadout;
      const mounts = loadout.weapon_mounts;
      if (!Array.isArray(mounts)) {
        logInvalidItem(mounts, actor, "buildWeapons");
        return {
          items: []
        }
      }
      let weaponItems = mounts
        .filter((m, mountIdx) => {
          if (!Array.isArray(m.slots)) {
            logInvalidItem(m, actor, `mechLoadout.mounts[${mountIdx}]`)
            return false;
          }
          const slots = m.slots.filter(s => !!s?.weapon);
          if (slots.length === 0) return false;
          if (slots.some(s => s.weapon && (!s.weapon.value || !s.weapon.id))) {
            logInvalidItem(slots, actor, `mechLoadout.mounts[${mountIdx}].slots[].weapon`)
            return false;
          }
          return m.slots.length > 0 && !m.bracing;
        }).map((m, mountIdx) => {
          //TODO Sheavy
          return [
            m.type,
            m.slots
              .flatMap(s => {
                if (!s.weapon) return [];
                const value = s.weapon.value;
                if (!value) return []
                const system = value.system;
                const p = system.active_profile;
                const d = p.damage.map(d => `${d.val} ${d.type}`).join("+");
                const ranges = p.range.map(r => r.formatted).join(" ");
                // TODO: Weapons can have actions on them, how to represent that?
                let {cost, description: td} = tagsCostAndDescription(value, p.all_tags)
                let wItem: SubMenuItem = {
                  id: s.weapon.id,
                  name: value.name + `[${d}]`,
                  description: `${system.size} ${p.type}\n${d} \n${ranges}\n${td}`,
                  cost: cost,
                };
                if (value.isLimited()) {
                  wItem.uses = value.system.uses;
                }
                if (!s.mod || !s.mod.value) return [wItem];
                return [wItem, modSubItem(s.mod.value, actor)];
              })];
        });


      let tabLabels = Object.fromEntries(weaponItems.map(([label]) => [label, label]));
      tabLabels["basic"] = "Basic";
      let items = Object.fromEntries(weaponItems);
      items["basic"] = [{
        id: "basic-attack",
        name: "Basic Attack",
        description: "Just roll to hit, useful for grapple and the likes."
      }, {
        id: "basic-attack",
        name: "Ram Attack",
        description: "Melee attack to ram your enemy"
      }, {
        id: "basic-attack",
        name: "Grapple Attack",
        description: "Melee attack to grapple your enemy"
      }]
      return {
        theme: "red",
        hasTabs: true,
        tabLabels: tabLabels,
        items: items
      }
    }

    _isUsableItem(item: any) {
      //TODO: Destroyed, Out of Charges, Recharging NPC features.
      switch (item.type) {
        case ENTRY_TYPE.NPC_FEATURE:
          if (item.isRecharge() && !item.system.charged) return false
        case ENTRY_TYPE.MECH_SYSTEM:
        case ENTRY_TYPE.MECH_WEAPON:
        case ENTRY_TYPE.WEAPON_MOD:
          if (item.system.destroyed) return false
        case ENTRY_TYPE.PILOT_WEAPON:
          if (item.isLoading() && !item.system.loaded) return false
          if (item.isLimited() && !item.system.uses.value) return false
          break
        case ENTRY_TYPE.BOND:
        case ENTRY_TYPE.TALENT:
        case ENTRY_TYPE.SKILL:
          break
        default:
          return false
      }

      return true
    }

    _buildInvades(actor: LancerMECH): SubMenuData {
      const systemInvades = actor.system.loadout.systems
        .flatMap(s => s.value.system.actions.filter(isInvade).map((i, idx) => ({
          id: itemActionId(s.id, idx),
          name: `${i.name} [${s.value.name}]`,
          description: i.detail
        })));
      const isChomo = actor.system.loadout.frame.value.name === "Chomolungma";
      const chomoInvades = isChomo ?
        (actor.system.loadout.frame.value.system.core_system.passive_actions || [])
          .filter(isInvade)
          .map(action => ({
            id: actor.id,
            name: `${action.name} [Chomolungma Frame]`,
            description: action.detail || "No details available."
          }))
        : [];
      const pilotId = actor.system?.pilot?.id;
      let pInvades = [];
      if (pilotId) {
        const cleanedPilotId = pilotId.replace("Actor.", ""); // Remove "Actor." prefix if present
        const pilot = game.actors.get(cleanedPilotId);
        if (pilot) {
          pInvades = (pilot.items.contents as LancerItem[])
            .filter((item): item is LancerTALENT => item.is_talent() && Array.isArray(item.system.actions))
            .flatMap((item: LancerTALENT) => item.system.actions.filter(isInvade).map(action => ({
              id: item.id,
              name: `${action.name} [${item.name}]`,
              description: action.detail || "No details available."
            })))
        }
      }
      let options = [...systemInvades, ...chomoInvades, ...pInvades, {
        id: "fragment-signal",
        name: "Fragment Signal [Default]",
        description: "You feed false information, obscene messages, or phantom signals to your target's computing core. They become IMPAIRED and SLOWED until the end of their next turn."
      }];
      return {
        title: "Invade Options",
        hasTabs: true,
        tabLabels: {
          "flow": "Invade Flow",
          "full": "All Invade Options"
        },
        items: {
          flow: [macroInvade, {
            id: "basic-tech-attack",
            name: "Basic Tech",
            description: "You do a basic tech attack against edef."
          }],
          full: options.map(o => ({
            id: o.id,
            name: o.name,
            description: o.description,
          }))
        }
      }
    }

    _buildTechActivations(actor: LancerActor): SubMenuData {
      // Orderd according to the UI and order is maintained throughout the method.
      const fullLoad = actor.loadoutHelper.listLoadout();
      const keyItems: Record<keyof typeof ActivationType, SubMenuItem[]> = {
        [ActivationType.Core]: (() => {
          if (actor.is_mech()) {
            // Frame is part of the loadout.
            // const weakcheck = fullLoad[0];
            const frame = actor.system.loadout.frame.value;
            const core_system = frame.system.core_system;
            /*          // Amber phantoms protocol style may require special handing?
                      // Actually, I just want the super batter action anyway?  Why am I amapping actions?
                      const actions = [
                        ...core_system.active_actions,
                        ...core_system.passive_actions
                      ]
                      debugger;*/
            return [{
              id: itemActionPath(frame.id, "system.core_system"),
              img: actor.img,
              name: core_system.active_name,
              description: core_system.active_effect,
            }]
          }
          return []
        })(),
        [ActivationType.Protocol]: [],
        [ActivationType.Invade]: [],
        [ActivationType.Free]: [],
        [ActivationType.Quick]: [],
        [ActivationType.QuickTech]: [],
        [ActivationType.Full]: [],
        [ActivationType.FullTech]: [],
        [ActivationType.Reaction]: [],
        // These are action types, cut I have not seen them yet.
        [ActivationType.None]: [],
        [ActivationType.Other]: [],
        [ActivationType.Passive]: []
      } as  Record<keyof typeof ActivationType, SubMenuItem[]>;
      // I could just use the enum if it weren't for needing to filter it out.
      const tabLabels: Record<keyof typeof ActivationType, string> = {
        [ActivationType.Core]: ActivationType.Core,
        [ActivationType.Invade]: ActivationType.Invade,
        [ActivationType.Free]: ActivationType.Free,
        [ActivationType.Full]: ActivationType.Full,
        [ActivationType.FullTech]: ActivationType.FullTech,
        [ActivationType.None]: ActivationType.None,
        [ActivationType.Other]: ActivationType.Other,
        [ActivationType.Passive]: ActivationType.Passive,
        [ActivationType.Protocol]: ActivationType.Protocol,
        [ActivationType.Quick]: ActivationType.Quick,
        [ActivationType.QuickTech]: ActivationType.QuickTech,
        [ActivationType.Reaction]: ActivationType.Reaction
      } as Record<keyof typeof ActivationType, string>;
      type RT = [keyof typeof ActivationType, SubMenuItem];
      fullLoad
        .filter(i => !(i.is_mech_weapon() || i.is_weapon_mod()))
        .flatMap<RT>(i => { // We need to flatten every type of valid system into action + menu
          // I cannot wait for this edge case STEVEN
          const {cost, description} = tagsCostAndDescription(i, i.getTags() ?? []);
          if (i.is_mech_system() && i.system.actions.length > 0 && !i.system.destroyed) {
            let actions = i.system.actions.filter(a => !isInvade(a));
            return actions.map<RT>((a, idx) => {
              const id = itemActionId(i.id, idx);
              //Return a set of entries with the activation type
              return [a.activation, {
                id,
                img: i.img,
                name: [DEFAULT_ACTION_NAME, NO_ACTION_NAME].includes(a.name) ? i.name : a.name,
                cost: cost,
                description: [a.detail, description].join(" "),
              }] as RT
            })
          }
          // The abilities you can use from your frame, like Calendula shit.
          if (i.is_frame()) {
            const passives = i.system.core_system.passive_actions.map<RT>((p, idx) => [
              p.activation,
              {
                id: itemActionId(i.id, idx, 'system.core_system.passive_actions'),
                img: i.img,
                name: p.name,
                description: p.detail,
              }
            ] as RT);
            // God help me what the fuck is in this list?
            const active = i.system.core_system.active_actions.map<RT>((p, idx) => [
              p.activation,
              {
                id: itemActionId(i.id, idx, 'system.core_system.active_actions'),
                img: i.img,
                name: p.name,
                description: p.detail,
              }
            ] as RT);
            const traits = i.system.traits.flatMap((p, idx) =>
              p.actions.map<RT>((a, adx) => [
                a.activation,
                {
                  id: itemActionPath(i.id, `system.traits.${idx}.actions.${adx}`),
                  img: i.img,
                  name: p.name,
                  description: a.detail,
                }
              ] as RT)
            );
            return [
              ...passives,
              ...active,
              ...traits
            ]
          }
          return []
        })//Take list of actions and group them into our items record, this collects them by speed for the menu.
        .reduce((itms, [activationType, subMenuItem]) => {
          itms[activationType].push(subMenuItem)
          return itms;
        }, keyItems);
      // No nice collections way of doing this :(
      // Remove our empties and add in a headers splitter.
      for (const key of Object.keys(keyItems)) {
        const value = keyItems[key];
        if (
          value == null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          delete keyItems[key];
          delete tabLabels[key];
        } else {
          /*
              //For a long list, this pushes the header catagory on.
                Tabs are easier I think.
               keyItems[key].unshift({
                      id: `${key}-header`,
                      name: key,
                      idHeader: true,
                    });*/
        }
      }
      return {
        title: "Tech Activations",
        tabLabels,
        items: keyItems,
        hasTabs: true,
      }
    }

    _buildDeployable(sheet: LancerActor) {
      ///??? sheet.items.
      game.actors.contents
        .filter(d => {
          if (d.testUserPermission(game.user, "OWNER") && isLancerActor(d) && d.is_deployable()) {
            // Step 3: Filter deployables for the selected actor (using the deployer's ID)
            // @ts-ignore
            const deployerId = d.system?.owner?.id?.replace(/^Actor\./, ''); // Clean ID
            return deployerId === d.id;
          }
          return false;
        }).map(d => {

      })

    }

    getDefaultAttributes() {
      return [
        {path: "system.hp", label: "HP", color: "#2ca020", style: "bar"},
        {path: "system.heat", label: "Heat", color: "#e61c34", style: "bar"},


        // style number = just the number, text number/max
        {path: "system.structure", label: "Structure", color: "#195e14", style: "bar"},
        {path: "system.stress", label: "Stress", color: "#80101c", style: "bar"},

        // Put your own saves in
        {path: "system.hull", label: "Hull", color: "#1a6f73", style: "number", ownerOnly: true},
        {path: "system.agi", label: "Agility", color: "#1a6f73", style: "number", ownerOnly: true},
        {path: "system.sys", label: "System", color: "#1a6f73", style: "number", ownerOnly: true},
        {path: "system.eng", label: "Engineering", color: "#1a6f73", style: "number", ownerOnly: true},
        {path: "system.grit", label: "Grit", color: "#e61c34", style: "number", ownerOnly: true},
      ];
    }

    getTrackableAttributes(actor: LancerActor): { path: string, label: string }[] {
      const paths = [];

      const scan = (obj, prefix, depth = 0) => {
        if (depth > 4) return;

        for (const [key, value] of Object.entries(obj)) {
          if (typeof value === "object" && value !== null) {
            if ("value" in value && typeof value.value === "number") {
              paths.push({
                path: `${prefix}.${key}.value`,
                label: key.charAt(0).toUpperCase() + key.slice(1),
              });
            } else {
              scan(value, `${prefix}.${key}`, depth + 1);
            }
          }
        }
      };

      function pilotTalents(prefix, actor: LancerPILOT) {
        let items = [...actor.items] as LancerItem[];
        const acc = [];
        // Counters are a map how do we path it?
        items.forEach((t, key) => {
          if (t.is_talent()) {
            t.system.counters.forEach((c, cidx) => {
              acc.push({
                path: `${prefix}.items[${key}].system.counters[${cidx}]`,
                label: c.name
              })
            })
          }
        })
        return acc;
      }

      function mechStats(actor: LancerMECH) {

      }

      if (actor.is_pilot()) {
      }

      if (actor.is_mech()) {
        paths.push(
          {
            "path": "system.repairs.value",
            "label": "Repairs"
          },
          /*          {
                      "path": "system.loadout.sp.value",
                      "label": "Sp"
                    },
                    {
                      "path": "system.loadout.ai_cap.value",
                      "label": "Ai_cap"
                    },*/
          {
            "path": "system.hp.value",
            "label": "Hp"
          },
          {
            "path": "system.overshield.value",
            "label": "Overshield"
          },
          {
            "path": "system.heat.value",
            "label": "Heat"
          },
          {
            "path": "system.stress.value",
            "label": "Stress"
          },
          {
            "path": "system.structure.value",
            "label": "Structure"
          }, // I will need to customize how to set/get the counter values.
          ...pilotTalents("system.pilot.value", actor.system.pilot.value))
        return paths;
      }

      if (actor?.system) {
        scan(actor.system, "system");
        // Actor talents too.
      }
      return paths;
    }
  }

  api.registerSystemAdapter("lancer", LancerSystemAdapter);
})
export const init = () => {

}
