import {LancerActor, LancerMECH} from "../../foundryvtt-lancer/actor/lancer-actor";
import {LancerActiveEffect} from "../../foundryvtt-lancer/effects/lancer-active-effect";
// @ts-ignore
import {BaseSystemAdapter, configProps} from "../../stylish-action-hud/scripts/systems/base.js "
import {LancerItem, LancerMECH_SYSTEM, LancerWEAPON_MOD} from "foundryvtt-lancer/item/lancer-item";
import {ActionData} from "foundryvtt-lancer/models/bits/action";
import {Tag} from "foundryvtt-lancer/models/bits/tag";
import {SourceData} from "foundryvtt-lancer/source-template";
import {SystemData} from "foundryvtt-lancer/system-template";
// @ts-ignore
export const DEFAULT_ACTION_NAME = "New action"
export const NO_ACTION_NAME = "Action"
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
export enum ActivationType {
  Core = "Core Power",
  // Core Foundry, retain all for funzies.
  None = "None",
  Passive = "Passive",
  Quick = "Quick",
  QuickTech = "Quick Tech",
  Invade = "Invade",
  Full = "Full",
  FullTech = "Full Tech",
  Other = "Other",
  Reaction = "Reaction",
  Protocol = "Protocol",
  Free = "Free",
}

function isLancerActor(x: any): x is LancerActor {
  return true;
}

const isInvade = (a: ActionData) => a.activation === "Invade"

// Lancer icons at: https://github.com/massif-press/compcon/blob/master/src/assets/glyphs/glyphs.css
const invadeMacroFlow = "macro-o3nZI3EidYMVc9UX";

let macroInvade: SubMenuItem = {
  id: invadeMacroFlow,
  name: "Invasion Flow",
  img: "cci cci-full-tech",
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
  let cost = []
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

export function logInvalidItem(item: unknown, actor = null, context = "") {
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
  system: {
    id: "utility",
    systemId: "utility-systems",
    label: "System?",
    icon: "cci cci-mech-system",
    type: "system"
  },
  sheet: {id: "sheet", label: "Sheet", icon: "fa-solid fa-id-card", type: "sheet"},
} satisfies Record<string, ActionMenuCategory>

function modSubItem(m: LancerWEAPON_MOD, actor: LancerMECH) {
  let {cost, description} = tagsCostAndDescription(m.system, m.system.tags)

  return <SubMenuItem>{
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
 * Categories
 *
 * * Weapon Actions
 * * Invade Actions
 * * Deployables
 * * Other Systems
 */

// Deprecated since Version 12
export class LancerSystemAdapter extends BaseSystemAdapter {
  private systemId: string;

  constructor() {
    super();
    this.systemId = "lancer-system";
  }

  getStats(actor: LancerActor, configAttributes: any) {
    if (!configAttributes?.length) return [];

    return configAttributes.map((attr) => {
      const raw: any = foundry.utils.getProperty(actor, attr.path);
      let value = 0;
      let max = 0;

      if (typeof raw === "object" && raw !== null) {
        value = raw.value ?? 0;
        max = raw.max ?? 0;
      } else if (typeof raw === "number") {
        value = raw;
      }


      return {
        path: attr.path,
        label: attr.label,
        value,
        max,
        percent: max > 0 ? Math.clamp((value / max) * 100, 0, 100) : 0,
        subtype: "resource",
        ...configProps(attr)
      };
    });
  }

  getConditions(actor: LancerActor) {
    // @ts-ignore
    return (actor.temporaryEffects || [])
      .filter((e) => e.img)
      .map((e) => ({
        id: e.id || e.name,
        src: e.img,
        name: e.name || "Unknown",
        // value: e.value ?? null,
      }));
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

  getActionCategories(actor: LancerActor): ActionMenuCategory[] {
    // @ts-ignore this is if you set the config globally, why though?  You don't have actove method access then, just macro.
    const config = game.settings.get("stylish-action-hud", "configuration");
    let options: ActionMenuCategory[];

    if (actor.is_deployable()) return [];
    if (actor.is_mech()) {
      return [
        //Groups.attacks,
        Groups.weapon,
        Groups.invade,
        Groups.tech,
        Groups.utility,
        Groups.system,
        Groups.sheet
      ];
    }
    return <ActionMenuCategory[]>[
      {id: "combat", systemId: "combat", label: "Combat", icon: "cci cci-mech-weapon", type: "submenu"},
      {id: "magic", systemId: "magic", label: "Magic", icon: "cci fa-hat-wizard", type: "submenu"},
      {id: "items", systemId: "items", label: "Items", icon: "cci fa-backpack", type: "submenu"},
      {id: "sheet", label: "Sheet", icon: "fa-solid fa-id-card", type: "sheet"},
    ];
  }

  async getSubMenuData(actor: LancerActor, categoryId: string): Promise<SubMenuData> {
    switch (categoryId) {
      case "weapons":
        if (actor.is_mech()) {
          return this._buildWeapons(actor);
        }
      case "invade":
        if (actor.is_mech()) {
          return this._buildInvades(actor);
        }
      case "techs":
        return this._buildTechActivations(actor);
      /*      case "attacks":
              return this._mechAttacks(actor);*/
      default:
        return {title: "label", items: []};
    }
    this.getActionCategories(actor);
  }

  _getSystemSubMenuData(): SubMenuData {
    return { title: "menuData.label", items: [] };
  }
  _buildWeapons(actor: LancerMECH): SubMenuData {
    const loadout = actor.system.loadout;
    const mounts = loadout.weapon_mounts;
    if (!Array.isArray(mounts)) {
      logInvalidItem(mounts, actor, "buildWeapons");
      return {
        title: "Weapons",
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
        if (slots.some(s => !s.weapon.value || !s.weapon.id)) {
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
              const value = s.weapon.value;
              const system = value.system;
              const p = system.active_profile;
              const d = p.damage.map(d => `${d.val} ${d.type}`).join("+");
              const ranges = p.range.map(r => r.formatted).join(" ");
              // TODO: Weapons can have actions on them, how to represent that?
              let {cost, description: td} = tagsCostAndDescription(value, p.all_tags)
              let wItem: SubMenuItem = {
                id: s.weapon.id,
                name: s.weapon.value.name + `[${d}]`,
                description: `${system.size} ${p.type}\n${d} \n${ranges}\n${td}`,
                cost: cost,
              };
              if (value.isLimited()) {
                wItem.uses = value.system.uses;
              }
              if (!s.mod) return [wItem];
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
      title: "Attacks",
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
        pInvades = pilot.items.contents
          .filter(item => item.type === "talent" && Array.isArray(item.system.actions))
          .flatMap(item => item.system.actions.filter(isInvade).map(action => ({
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
    const keyItems: Record<ActivationType, SubMenuItem[]> = {
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
    };
    // I could just use the enum if it weren't for needing to filter it out.
    const tabLabels: Record<ActivationType, string> = {
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
    }
    type RT = [ActivationType, SubMenuItem];
    fullLoad
      .filter(i => !(i.is_mech_weapon() || i.is_weapon_mod()))
      .flatMap<RT>(i => { // We need to flatten every type of valid system into action + menu
        // I cannot wait for this edge case STEVEN
        const {cost, description} = tagsCostAndDescription(i, i.getTags() ?? []);
        if (i.is_mech_system() && i.system.actions.length > 0 && !i.system.destroyed) {
          let actions = i.system.actions.filter(a => !isInvade(a));
          return actions.map((a, idx) => {
            const id = itemActionId(i.id, idx);
            //Return a set of entries with the activation type
            return <RT>[a.activation, {
              id,
              img: i.img,
              name: [DEFAULT_ACTION_NAME, NO_ACTION_NAME].includes(a.name) ? i.name : a.name,
              cost: cost,
              description: [a.detail, description].join(" "),
            }]
          })
        }
        // The abilities you can use from your frame, like Calendula shit.
        if (i.is_frame()) {
          const passives = i.system.core_system.passive_actions.map((p, idx) => <RT>[
            p.activation,
            {
              id: itemActionId(i.id, idx, 'system.core_system.passive_actions'),
              img: i.img,
              name: p.name,
              description: p.detail,
            }
          ]);
          // God help me what the fuck is in this list?
          const active = i.system.core_system.active_actions.map((p, idx) => <RT>[
            p.activation,
            {
              id: itemActionId(i.id, idx, 'system.core_system.active_actions'),
              img: i.img,
              name: p.name,
              description: p.detail,
            }
          ]);
          const traits = i.system.traits.flatMap((p, idx) =>
            p.actions.map((a, adx) => <RT>[
              a.activation,
              {
                id: itemActionPath(i.id, `system.traits.${idx}.actions.${adx}`),
                name: p.name,
                description: a.detail,
              }
            ])
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
        keyItems[key].unshift({
          id: `${key}-header`,
          name: key,
          idHeader: true,
        });
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


  async useItem(actor: LancerActor, itemId: string) {
    if (itemId.startsWith("macro-")) {
      const macro = game.macros.get(itemId.replace("macro-", ""));
      return macro?.execute({actor});
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

    const item = actor.items.get(itemId)
    if (!item) {
      switch (itemId) {
        case "basic-attack":
          return actor.beginBasicAttackFlow("Basic Attack");
        case "basic-tech-attack":
          return actor.beginBasicTechAttackFlow("Basic Tech");
      }
      ui.notifications.warn(`Item not found: ${itemId}`);
      return;
    }

    if (typeof item.use === "function") return item.use();
    if (typeof item.roll === "function") return item.roll();

    if (item.is_weapon()) return item.beginWeaponAttackFlow();
    if (item.is_weapon_mod()) return item.beginActivationFlow()
    return item.sheet.render(true);

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

  getTrackableAttributes(actor: LancerActor) {
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

    if (actor?.system) {
      scan(actor.system, "system");
    }

    return paths;
  }

  rollStat(actor: LancerActor, path: string, event: any) {
    console.error("Rolling Stat", {path, event});
    if (this.isStatRollable(path)) {
      return actor.beginStatFlow(path);
    }
    return null;
  }

  isStatRollable(path: string) {
    const rollable = /^system\.(hull|agi|sys|eng|grit)$/.test(path);
    //console.log("Rollable?", { path, rollable});
    return rollable;
  }

  getDefaultStatusEffects() {
    return [
      // We have a lot of lancer to add lmao, just do it in app.
      {
        id: "dead",
        label: "Dead",
        filters: {grayscale: 100, brightness: 50},
        tintColor: "#000000",
        tintAlpha: 0.5,
      },
    ];
  }
}
