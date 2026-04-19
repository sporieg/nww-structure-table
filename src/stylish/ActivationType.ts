// Copied from foundryvtt-lancer/enums, actual values get borked in foundry loading.
import {LancerActor, type LancerMECH, type LancerPILOT} from "foundryvtt-lancer/actor/lancer-actor";
import {ActionData} from "foundryvtt-lancer/models/bits/action";
import {LancerItem} from "foundryvtt-lancer/item/lancer-item";

export const ActivationLabels = {
  Core: "Core Power",
  None: "None",
  Passive: "Passive",
  Quick: `Quick`,
  QuickTech: `Quick`,
  Invade: "Invade",
  Full: `Full`,
  FullTech: `Full`,
  Other: "Other",
  Reaction: "Reaction",
  Protocol: "Protocol",
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
  Reaction: "Reaction",
  Protocol: "Protocol",
  Free: "Free",
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


function la(): LancerAutomationsAPI {
  // @ts-ignore
  return game.modules.get('lancer-automations').api as LancerAutomationsAPI;
}

/**
 * Slice up the loadout into something flatter and easier to work with for a menu.
 *
 * Returns an array of Item/Action/subMenuItem data so that is can be sliced and dices as needed by the menu.
 *
 * Feel free to modicy the subMenuItem as well, its just a suggestion with defaults filled in based on item/action
 *
 * e.g.  getActionActionItem(actor).filter(byActionType("Protocol"))
 */
export function getActorActionItems(actor: LancerActor) {
  // NPCS have other tags, we will need to reverse this out maybe?
  // const tagLid = ACTIVATION_TAG_MAP[activationType];
  // We need an item/action/index ste
  //???
  //TODO: Deployable e.g.  A mine in addition to grenade.
  return actor.loadoutHelper.listLoadout()
    .flatMap((item) => {
      const itemId = item.id;
      const options: ActionItem[] = [];
      if (item.is_frame()) {
        const core_system = item.system.core_system;
        const coreAction: ActionItem = {
          item,
          action: {
            activation: core_system.activation,
          },
          subMenuItem: {
            id: itemActionPath(itemId, "system.core_system"),
            img: actor.img,
            name: core_system.active_name,
            description: core_system.active_effect,
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
            img: item.img,
            name: action.name,
            description: action.detail,
          }
        }))
        const traits = item.system.traits.flatMap((p, idx) => p.actions.map((action, adx) => ({
          item,
          action,
          subMenuItem: {
            id: itemActionPath(itemId, `system.traits.${idx}.actions.${adx}`),
            img: item.img,
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
      if (("deployables" in item.system && item.system.deployables.length > 0) || (item.is_frame())) {
        //item.system.deployables[0]
        const d = la().getItemDeployables(item, actor).map(d => ({
          item,
          action: {
            activation: 'Quick'
          },
          subMenuItem: {
            id: "",
            name: "Mine?"
          }
        }))
        // Just hit the deployable button please.  To find mines I gotta go into the compendiums.
      }
      // if (i.is_mech_system() && i.system.actions.length > 0 && !i.system.destroyed) {
      if ("actions" in item.system && item.system.actions.length > 0) {
        options.push(...(item.system.actions as ActionData[]).map((action, idx) => ({
          item,
          action,
          subMenuItem: {
            id: itemActionId(itemId, idx, "system.actions"),
            name: `${action.name} [${item.name}]`,
            img: item.img,
            description: action.detail
          }
        })))
      }
      return options;
    })

}
