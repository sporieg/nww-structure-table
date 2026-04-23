// Copied from foundryvtt-lancer/enums, actual values get borked in foundry loading.
import {LancerActor, type LancerMECH, type LancerPILOT} from "foundryvtt-lancer/actor/lancer-actor";
import {ActionData} from "foundryvtt-lancer/models/bits/action";
import {LancerItem} from "foundryvtt-lancer/item/lancer-item";
import {imgs} from "./images.js";
import type {Tag} from "foundryvtt-lancer/models/bits/tag";

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

export const ENTRY_TYPE_IMG_MAP = {
  CORE_BONUS: imgs.lancer.corepower,
  DEPLOYABLE: imgs.lancer.deployable,
  FRAME: imgs.lancer.frame,
  MECH: imgs.lancer.mech,
  LICENSE: imgs.lancer.license,
  NPC: imgs.lancer.npc_class,
  NPC_CLASS: imgs.lancer.npc_class,
  NPC_TEMPLATE: imgs.lancer.npc_template,
  NPC_FEATURE: imgs.lancer.npc_feature,
  WEAPON_MOD: imgs.lancer.mech_weapon,
  MECH_SYSTEM: imgs.lancer.mech_system,
  MECH_WEAPON: imgs.lancer.mech_weapon,
  ORGANIZATION: imgs.la.angel,
  PILOT_ARMOR: imgs.lancer.pilot,
  PILOT_GEAR: imgs.lancer.pilot,
  PILOT_WEAPON: imgs.lancer.pilot,
  PILOT: imgs.lancer.pilot,
  RESERVE: imgs.lancer.reserve_tac,
  SKILL: imgs.lancer.skill,
  STATUS: imgs.la.medical,
  TALENT: imgs.lancer.talent,
  BOND: imgs.lancer.bond,
}

// Keys are the ActivationType Enum, can't use it directly because enum is not erasable syntax;
export const RemapAction = {
  "Quick Tech": `Quick`,
  "Full Tech": `Full`,
}

export const ActivationLabels = {
  Core: "Core Power",
  Protocol: "Protocol",
  None: "None",
  Passive: "Passive",
  Quick: `Quick`,
  Invade: "Invade",
  Full: `Full`,
  Other: "Other",
  Reaction: "Reaction",
  Free: "Free",
}


export const ActivationType = {
  Core: "Core Power",
  None: "None",
  Passive: "Passive",
  Quick: `<i class="mdi mdi-hexagon-slice-3" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`,
  QuickTech: `<i class="mdi mdi-hexagon-slice-3" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`,
  Invade: "Invade",
  Full: `<i class="mdi mdi-hexagon-slice-6" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`,
  FullTech: `<i class="mdi mdi-hexagon-slice-6" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`,
  Other: "Other",
  Reaction: `<i class="cci cci-reaction" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`,
  Protocol: `<i class="cci cci-protocol" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`,
  Free: `<i class="cci cci-free-action" style="font-size:1.15em;margin-right:5px;vertical-align:middle;flex-shrink:0;"></i>`,
}
export const ACTIVATION_TAG_MAP = {
  'Quick': 'tg_quick_action',
  'Full': 'tg_full_action',
  'Quick Tech': 'tg_quick_tech',
  'Full Tech': 'tg_full_tech',
  'Protocol': 'tg_protocol',
  'Reaction': 'tg_reaction',
  'Free': 'tg_free_action',
  'Deactivate': 'tg_deactivate',
  'Invade': 'tg_invade',
};


export const ID_DELIMITER = '>';

/*
You might use this for a core item, that has a defualt path instead of other items where you must have the indexed path
 */
export function itemActionPath(itemId: string, path: string = "system.actions") {
  return [itemId, path].join(ID_DELIMITER);
}

export function itemActionId(itemId: string, idx: number, path: string = "system.actions") {
  return itemActionPath(itemId, `${path}.${idx}`);
}

export function getItem(actor: LancerActor, actionId: string): [LancerItem, string] {
  const activationParts = actionId.split(ID_DELIMITER)
  const itemId = activationParts[0]
  const dataPath = activationParts[1]
  // @ts-ignore
  return [actor.items.get(itemId), dataPath]
}


export type ActionItem = {
  item: LancerItem,
  action: Pick<ActionData, "activation">,
  // A path to reach back to your action on the item.
  subMenuItem: SubMenuItem
};

//Throw in a flatmap
export function byActionType(...activationType: (keyof typeof ACTIVATION_TAG_MAP)[]) {
  return (a: ActionItem): SubMenuItem[] => {
    // @ts-ignore
    if (activationType.includes(a.action.activation))
      return [a.subMenuItem];
    return [];
  }
}

/**
 *
 */
function la(): LancerAutomationsAPI {
  // @ts-ignore
  return game.modules.get('lancer-automations').api as LancerAutomationsAPI;
}
export function isUsableItem(item: any) {
  //TODO: Destroyed, Out of Charges, Recharging NPC features.
  switch (item.type) {
    case ENTRY_TYPE.NPC_FEATURE:
      return !(item.isRecharge() && !item.system.charged)
    case ENTRY_TYPE.MECH_SYSTEM:
    case ENTRY_TYPE.MECH_WEAPON:
    case ENTRY_TYPE.WEAPON_MOD:
      return !item.system.destroyed
    case ENTRY_TYPE.PILOT_WEAPON:
      return !((item.isLoading() && !item.system.loaded)
        || (item.isLimited() && !item.system.uses.value))
    //Bonds talents.skills etc are always usables
    default:
      return true
  }
  return true
}

// Map everything to a light image, they are dark by default.
// Once again, enum in Lancer, but enums cannot be used with eraseable syntax
const enum EntryTypeImage {
   "core_bonus",
   "deployable",
   "frame",
   "mech", // Mech actors
   "license",
   "npc",
   "npc_class",
   "npc_template",
   "npc_feature",
   "weapon_mod",
   "mech_system",
   "mech_weapon",
   "organization",
   "pilot_armor",
   "pilot_gear",
   "pilot_weapon",
   "pilot",
   "reserve",
   "skill",
   "status",
   "talent",
   "bond",
}

/**
 * I could put the help on system, but I think there are enough potential edge cases
 * among system.weapon/system/other taggable things just put it here.s
 * @param value not enough time on this earth for all the system types.
 * @param tags
 */
export function tagsCostAndDescription(value: LancerItem) {
  const tags = value.getTags();
  if(!tags) return ({cost: "", description: ""})
  let {cost, description} = tags.reduce(({cost, description}, t) => {
    // I dunno what happens with is_limited tag and not is_limited, save me jon lancer.
    if (t.is_limited && value.isLimited()) {
      let max = value.system.uses.max;
      t.name.replace("{VAL}", `${max}`);
      cost.push(`${value.system.uses.value}/${max}`);
      description.push(t.name.replace("{VAL}", max.toString()));
    } else if (t.is_selfheat) {
      cost.push(`${t.val} Heat`);
    } else {
      description.push(t.name.replace("{VAL}", t.val))
    }
    return {cost, description};
  }, {cost: [] as string[], description: [] as string[]});
  return {
    cost: cost.join(", "),
    description: description.join(" ")
  }

}

/**
 * Slice up the loadout into something flatter and easier to work with for a menu.
 *
 * Returns an array of Item/Action/subMenuItem data so that is can be sliced and dices as needed by the menu.
 *
 * Feel free to modify the subMenuItem as well, its just a suggestion with defaults filled in based on item/action
 *
 * e.g.  getActionActionItem(actor).filter(byActionType("Protocol"))
 */
export async function getActorActionItems(actor?: LancerActor) {
  // NPCS have other tags, we will need to reverse this out maybe?
  // const tagLid = ACTIVATION_TAG_MAP[activationType];
  // We need an item/action/index ste
  //???
  //TODO: Deployable e.g.  A mine in addition to grenade.
  if(!actor) return [];
  let loadOut = actor.loadoutHelper.listLoadout();
  const actions = la().getActorActions(actor)
  return (await Promise.all(loadOut
    .map(async (item): Promise<ActionItem[]> => {
      const itemId = item.id;
      const options: ActionItem[] = [];
      // Frames are intrinsically special and contain whole trees of actions.
      if (item.is_frame()) {
        // Small issue, sometimes your core active is just the active, other times its both the core system and an active system.
        const core_system = item.system.core_system;
        const coreAction: ActionItem = {
          item,
          action: {
            activation: core_system.activation,
          },
          subMenuItem: {
            id: itemActionPath(itemId, "system.core_system"),
            img: imgs.lancer.corepower,
            name: core_system.active_name,
            description: [core_system.description, core_system.active_effect].join("<br/>"),
          }
        }
        const passives = core_system.passive_actions.map<ActionItem>((action, idx) => ({
          item,
          action,
          subMenuItem: {
            id: itemActionId(itemId, idx, 'system.core_system.passive_actions'),
            img: item.img,
            name: action.name,
            description: action.detail,
          }
        }))
        const actives = core_system.active_actions.map<ActionItem>((action, idx) => ({
          item,
          action,
          subMenuItem: {
            id: itemActionId(itemId, idx, 'system.core_system.active_actions'),
            img: imgs.lancer.mech,
            name: action.name,
            description: action.detail,
          }
        }))
        const traits = item.system.traits.flatMap((p, idx) => p.actions.map((action, adx) => ({
          item,
          action,
          subMenuItem: {
            id: itemActionPath(itemId, `system.traits.${idx}.actions.${adx}`),
            img: imgs.lancer.mech,
            name: p.name,
            description: action.detail,
          }
        })));
        options.push(
          coreAction,
          ...passives,
          ...actives,
          ...traits
        )
      }
      // Frames and items with deploybables can apply.

      //const tags = await la().getItemTags_WithBonus(item, actor);
      const {cost, description} = tagsCostAndDescription(item)
      const acts = la().getItemActions(item);
      const usable = isUsableItem(item);
      //Try and match to a light theme image if one matches well.
      let img = ENTRY_TYPE_IMG_MAP[item.type] ?? item.img;
      const name = usable ? item.name :  `<s class="horus--subtle" style="opacity:0.7;color:#e50000;">${item.name}</s>`

      if (("deployables" in item.system && item.system.deployables.length > 0) || (item.is_frame())) {
        //item.system.deployables[0]
        img = imgs.lancer.deployable;
        const d = la().getItemDeployables(item, actor).map(d => ({
          item,
          action: {
            activation: 'Quick'
          },
          subMenuItem: {
            id: "",
            name: name
          }
        }))
        // Just hit the deployable button please.  To find mines I gotta go into the compendiums.
      }
      if ("actions" in item.system && item.system.actions.length > 0) {
        options.push(...(item.system.actions as ActionData[]).map((action, idx) => {
          let fmtName = `${action.name} [${item.name}]`;
          if(action.name === "Action") {
            fmtName = item.name;
          }
          const name = (item.system as any).destroyed ? `<s class="horus--subtle" style="opacity:0.7;color:#e50000;">${fmtName}</s>` : fmtName;
          return ({
            item,
            action,
            subMenuItem: {
              id: itemActionId(itemId, idx, "system.actions"),
              name,
              img,
              description: action.detail,
              cost,
              isExhausted: !usable,
              uses: item.isLimited() && item.system.uses,
            }
          });
        }))
      }
      return options;
    }))).flatMap(a => a);
}

