import type {LancerActor, LancerMECH, LancerNPC, LancerPILOT} from "foundryvtt-lancer/actor/lancer-actor";
import type {LancerActiveEffect} from "foundryvtt-lancer/effects/lancer-active-effect";
import {
  LancerItem,
  LancerMECH_WEAPON,
  LancerWEAPON_MOD
} from "foundryvtt-lancer/item/lancer-item";
import type {ActionData} from "foundryvtt-lancer/models/bits/action";
import {debug} from "./log.js";
import {LancerToken} from "foundryvtt-lancer/token";
import {LancerCombatant} from "foundryvtt-lancer/combat/lancer-combat";
import {imgs} from "./images.js";
import {
  ActionItem,
  ActivationLabels,
  ActivationType,
  byActionType,
  getActorActionItems,
  getItem, isUsableItem, pilotForMech, RemapAction, tagsCostAndDescription,
} from "./ActivationType.js";
import {SimpleActionMacros} from "./SimpleActions.js";

// Edit search css?
// Ad somethign to fix it?

// my-system-adapter.js
const STAT_PATHS = {
  HULL: "system.hull",
  AGI: "system.agi",
  SYS: "system.sys",
  ENG: "system.eng",
  GRIT: "system.grit"
};


//The only type of actor we have is Lancer Actor, but you gotta make TS believe.
function isLancerActor(x: any): x is LancerActor {
  return true;
}

const isInvade = (a: Pick<ActionData, "activation">) => a.activation === "Invade"

// Lancer icons at: https://github.com/massif-press/compcon/blob/master/src/assets/glyphs/glyphs.css

let macroInvade: SubMenuItem = {
  id: "macro-o3nZI3EidYMVc9UX",
  name: "Invasion Flow",
  img: imgs.lancer.tech_quick,
  cost: ActivationType.QuickTech + ActivationType.FullTech,
  description: "Trigger the invasion flow chart"
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
  compconFlow: {
    id: "compcon",
    systemId: "compcon",
    label: "Turn Flow",
    icon: "cci cci-activate",
    type: "submenu"
  },
  attacks: {
    id: "attacks",
    systemId: "attacks",
    label: "Attacks",
    icon: "cci cci-role-striker",
    type: "submenu",
  },
  attack: {
    id: "weapons",
    systemId: "weapons",
    label: "Attacks",
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
    label: "Other Actions",
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
  recallDeployable: {
    id: "recall-deployable",
    systemId: "recall-deployable",
    label: "Recall",
    // Needs a better icon I thinks.
    icon: "cci cci-activate",
    type: "system"
  },
  status: {
    id: "apply-statuses",
    label: "Status And Conditions",
    systemId: "statuses-and-conditions",
    icon: "cci ",
    type: "submenu"
  },
  sheet: {id: "sheet", label: "Sheet", icon: "fa-solid fa-id-card", type: "sheet"},
} satisfies Record<string, ActionMenuCategory>
// In order to favorite, all non-item ids will need to start with macro-
type ActionMap = Record<string, SubMenuItem>;

// Basic routing, by using the id and starts with you can id thing that map to the same aciton, e.g. basic-attack/basic-attack-ram
const actions = {
  scan: {
    //Macro id for scan/scan journal
    id: "macro-yPxTd02BZDkVXDwi",
    name: "Scan",
    cost: ActivationType.QuickTech,
    img: imgs.la.radar,
    description: "When you SCAN, you use your mech’s powerful sensors to perform a deep scan on an enemy.<br>" +
      "• Your target’s weapons, systems, and full statistics (HP, SPEED, EVASION, ARMOR, MECH SKILLS, and so on)."
  },
  stabilize: {
    id: "macro-k4o9aWoJTVb2sd8a",
    name: `Stabilize`,
    cost: ActivationType.Full,
    img: imgs.lancer.marker,
    description: `When you STABILIZE, you enact emergency protocols to purge your mech’s systems of excess heat, repair your chassis where you can, or eliminate hostile code.`
  },
  overcharge: {
    id: "overcharge",
    name: "Overcharge",
    cost: ActivationType.Free,
    img: "systems/lancer/assets/icons/macro-icons/overcharge.svg",
    description: `Once per turn, you can OVERCHARGE your mech, allowing you to make any quick action as a free action – even actions you have already taken this turn.`
  },
  deploy_item: SimpleActionMacros.Deploy_Item,
  overwatch: SimpleActionMacros.Overwatch,
  brace: SimpleActionMacros.Brace,
  bolster: SimpleActionMacros.Bolster,
  disengage: SimpleActionMacros.Disengage,
  hide: SimpleActionMacros.Hide,
  search: SimpleActionMacros.Search,
  dismount: SimpleActionMacros.Dismount,
  eject: SimpleActionMacros.Eject,
  boot_up: SimpleActionMacros.Boot_Up,
  lock_on: SimpleActionMacros.Lock_On,
  boost: {
    id: "boost",
    name: "Boost",
    img: imgs.la.speedometer,
    cost: ActivationType.Quick,
    description: "Increases your movement cap by your SPEED"
  },
  skirmish: SimpleActionMacros.Skirmish,
  barrage: SimpleActionMacros.Barrage,
  improvised_attack: {
    id: "basic-attack-improvised",
    name: 'Improvised Attack',
    img: imgs.lancer.mech_weapon,
    cost: ActivationType.Full,
    description: 'Make a melee or ranged attack using a non-weapon object or piece of terrain. On a hit, deal 1d6 AP kinetic damage.'
  },
  basic_attack: {
    id: "basic-attack",
    name: `Basic Attack`,
    cost: ActivationType.Quick,
    img: imgs.la.underhand,
    description: "Just roll to hit, useful for grapple and the likes."
  },
  basic_ram: {
    id: "basic-attack-ram",
    name: `Ram Attack`,
    cost: ActivationType.Quick,
    img: imgs.la.ram,
    description: "Melee attack to ram your enemy"
  },
  basic_grapple: {
    id: "basic-attack-ram",
    name: `Grapple Attack`,
    img: imgs.la.grappling,
    cost: ActivationType.Quick,
    description: "Melee attack to grapple your enemy"
  }
} satisfies ActionMap;

function overcharge(actor: LancerMECH): SubMenuItem {
  const cost = actor.system.overcharge.valueOf();
  let costs = actor.system.overcharge_sequence.split(",");
  const seq = costs[Math.min(cost, costs.length)];
  return {
    ...actions.overcharge,
    cost: `${actions.overcharge.cost} + ${seq} Heat`
  }
}


/*
 * The basic scaffolding before any systems are read from the actor.
 * This method is allowed to use the actor for simple reads, e.g. overcharge cost.
 */
const CompconFLow = (actor: LancerActor) => ({
  title: "Active Mode",
  hasTabs: true,
  tabLabels: {
    protocol: "Protocol",
    quick: `${ActivationType.Quick}Quick`,
    full: `${ActivationType.Full}Full`,
    free: "Free",
    reactions: "Reactions"
  },
  items: {
    protocol: [] as SubMenuItem[],
    quick: [
      actions.skirmish,
      macroInvade,
      actions.deploy_item,
      actions.lock_on,
      actions.hide,
      actions.search,
      actions.scan,
      actions.bolster,
      actions.boost,
      actions.eject,
      actions.basic_attack,
      actions.basic_ram,
      actions.basic_grapple
    ],
    full: [
      actions.barrage,
      actions.disengage,
      actions.stabilize,
      actions.dismount,
      actions.improvised_attack,
      actions.boot_up
    ],
    free: [
      ...[actor.is_mech() && overcharge(actor)]
    ] as SubMenuItem[],
    reactions: [
      actions.overwatch,
      actions.brace
    ]
  }
} as const satisfies SubMenuData)


function modSubItem(m: LancerWEAPON_MOD, actor: LancerMECH) {
  let {cost, description} = tagsCostAndDescription(m)

  return {
    id: m.id,
    name: "^[Mod]" + m.name,
    description: [m.system.effect, description].join(" "),
    cost: cost,
  }
}

function activateSystem(actor: LancerActor, actionId: string) {
  const [item, dataPath] = getItem(actor, actionId)
  if(!item) {
    ui.notifications?.warn(`Item not found: ${actionId}`);
    return;
  }
  return item.beginActivationFlow(dataPath)
}

function activateCoreSystem(actor: LancerActor, actionId: string) {
  const [item, dataPath] = getItem(actor, actionId)
  return item.beginCoreActiveFlow(dataPath)
}

type _SubMenuData = Omit<SubMenuData, "title">

function fixupSmItems(sm: SubMenuData): SubMenuData {
  // Sub Men Items that are macros have a hidden property, globalFlavor.  Set that here from the description
  // to bring back a useful tooltip;
  let items = sm.items;
  // Its all side effects, might be cleaner to just visit the items instead, oh well.
  if(!Array.isArray(items)) {
    items = Object.values(items).flatMap(x => x);
  }
  items.forEach(i => {
    i.globalFlavor = i.description;
  });
  return sm;
}

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

    get la(): LancerAutomationsAPI {
      // @ts-ignore
      return game.modules.get('lancer-automations').api as LancerAutomationsAPI;
    }

    getStats(actor: LancerActor, configAttributes: any) {
      return this.base.getStats(actor, configAttributes).map(a => {
        if (/^system\.(hull|agi|sys|eng)$/.test(a.path)) {
          a.max = 6;
        }
        return a;
      });
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
      if (itemId.startsWith("macro-")) {
        const macro = game.macros?.get(itemId
          // If you copy a UUID from foundry its Macro.
          // Stylish does this to macros for some reason.
          .replace("macro-", "")
        );
        // @ts-ignore
        return macro?.execute({actor});
      }
      switch (itemId) {
        case actions.stabilize.id:
          return actor.beginStabilizeFlow();
        case actions.overcharge.id:
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
        if (itemId.startsWith("basic-attack")) {
          return actor.beginBasicAttackFlow("Basic Attack");
        }
        if (itemId.startsWith("basic-tech")) {
          return actor.beginBasicTechAttackFlow("Basic Tech");
        }
        if (itemId.startsWith("skirmish")) {
          return await this.la.executeSkirmish(actor);
        }
        if (itemId.startsWith("barrage")) {
          return await this.la.executeBarrage(actor);
        }
        if (itemId.startsWith("deploy")) {
          return await this.la.openDeployableMenu(actor);
        }
        ui.notifications?.warn(`Item not found: ${itemId}`);
        return;
      }

      /*if (typeof item.use === "function") return item.use();
      if (typeof item.roll === "function") return item.roll();*/

      if (item.is_weapon()) return item.beginWeaponAttackFlow();
      if (item.is_weapon_mod()) return item.beginActivationFlow();
      if (item.is_mech_system()) return item.beginSystemFlow();
      if (item.is_skill()) return item.beginSkillFlow();
      // TODO: Need a power index
      if(item.is_bond()) return item.beginBondPowerFlow(0)
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
        case Groups.recallDeployable.id:
          const tokenA = actor.token;
          // This kills the crab
          return tokenA.delete()
      }
    }

    getCoreLancerActions(actor: LancerActor): ActionMenuCategory[] {
      if (actor.is_deployable()) {
        if (actor.system.recall) {
          return [
            Groups.recallDeployable
          ];
        }
        return [];
      }
      if (actor.is_mech()) {
        return [
          Groups.compconFlow,
          Groups.attack,
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
      // @ts-ignore this is if you set the config globally, why though?  You don't have actor method access then, just macro.
      let customized = this.base.getActionCategories(actor);
      const basicActions = this.getCoreLancerActions(actor)
        .map((a, idx) => {
          if (a.type == "submenu") {
            a.id = `${a.id}-${idx}`
          }
          return a;
        });
      if (actor.inCombat && (actor.is_mech() || actor.is_npc())) {
        // Is it our turn?
        // @ts-ignore this is if you set the config globally, why though?  You don't have actor method access then, just macro.
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
          let subMenuData = await this._getSystemSubMenuData(actor, menuData.systemId, menuData);
          return fixupSmItems(subMenuData);

        }
      }
      // 여전히 데이터가 없으면 빈 리스트 반환
      return {title: "", items: []};
    }


    async _getSystemSubMenuData(actor: LancerActor, systemId: string, menuData: ActionMenuCategory): Promise<SubMenuData> {
      switch (systemId) {
        case Groups.attack.systemId:
          if (actor.is_mech()) {
            return {...this._buildWeapons(actor), title: menuData.label};
          }
          return {title: "mech fail", items: []};
        case Groups.invade.systemId:
          if (actor.is_mech()) {
            return {...await this._buildInvades(actor), title: menuData.label};
          }
          return {title: "mech fail", items: []};
        case Groups.tech.systemId:
          return {...await this._buildTechActivations(actor), title: menuData.label};
        case Groups.utility.systemId:
          return {...this._buildUtility(actor), title: menuData.label};
        case Groups.npcAttacks.systemId:
          if (actor.is_npc()) {
            return {...this._buildNpcAttacks(actor), title: menuData.label};
          }
          return {title: "npc fail", items: []};
        case Groups.compconFlow.systemId:
          if (actor.is_mech()) {
            return this._buildCompconFlow(actor);
          }
          return {title: "mech fail", items: []};
        default:
          return {title: "label", items: []};
      }
    }

    async _buildCompconFlow(actor: LancerMECH) {
      const base = CompconFLow(actor);
      const {protocol, quick, full, free, reactions} = base.items
      let mechActionItems = await getActorActionItems(actor);
      let pilotActionTimes = await getActorActionItems(pilotForMech(actor));
      let mechHeader = {
        id: "none",
        name: "Mech Systems",
        isHeader: true
      };
      let pHeader = {
        id: "none",
        name: "Pilot Systems",
        isHeader: true
      };

      function push(to: SubMenuItem[], filter: (a: ActionItem) => SubMenuItem[]) {
        const mActions = mechActionItems.flatMap(filter);
        const pActions = pilotActionTimes.flatMap(filter);
        if (mActions.length > 0) {
          to.push(mechHeader, ...mActions)
        }
        if (pActions.length > 0) {
          to.push(pHeader, ...pActions)
        }
      }

      push(protocol, byActionType("Protocol"));
      push(quick, byActionType("Quick", "Quick Tech"));
      push(full, byActionType("Full", "Full Tech"));
      push(free, byActionType("Free"));
      push(reactions, byActionType("Reaction"));
      return base;
    }

    _buildUtility(actor: LancerActor): _SubMenuData {
      return {
        items: [
          actions.stabilize,
          ...[actor.is_mech() && overcharge(actor)],
          actions.deploy_item,
          actions.skirmish,
          actions.barrage,
          macroInvade
        ]
      }
    }

    _buildNpcAttacks(actor: LancerNPC): _SubMenuData {
      return {
        items: {}
      }
    }

    _weaponItem(weapon: LancerMECH_WEAPON, actor: LancerActor) {
      const system = weapon.system;
      const destroyed = system.destroyed;
      const p = system.active_profile;
      const d = p.damage.map(d => `${d.val} ${d.type}`).join("+");
      const ranges = p.range.map(r => r.formatted).join(" ");
      let {cost, description: td} = tagsCostAndDescription(weapon)
      return {
        id: weapon.id,
        name: destroyed ? `<s class="horus--subtle" style="opacity:0.7;color:#e50000;">${weapon.name}</s>` : weapon.name,
        description: `${system.size} ${p.type}<br/>${d}<br/>${ranges}<br/>${td}`,
        cost,
        isExhausted: !isUsableItem(weapon),
        uses: weapon.isLimited() && weapon.system.uses
      }
    }

    _buildWeapons(actor: LancerMECH): _SubMenuData {
      const loadout = actor.system.loadout;
      const mounts = loadout.weapon_mounts;
      this.la.getWeapons(actor)
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
        }).flatMap<SubMenuItem>((m, mountIdx) => {
          //TODO Sheavy
          return [
            {
              isHeader: true,
              name: m.type,
              cost: ActivationType.Quick
            },
            ...m.slots
              .flatMap(s => {
                if (!s.weapon) return [];
                const value = s.weapon.value;
                if (!value) return []
                let wItem: SubMenuItem = this._weaponItem(value, actor);
                if (!s.mod || !s.mod.value) return [wItem];
                return [wItem, modSubItem(s.mod.value, actor)];
              })] as SubMenuItem[];
        });


      let tabLabels = {};
      tabLabels["basic"] = "Basic";
      tabLabels["attack"] = "Attack";
      tabLabels["mounts"] = "Mounts";
      let items = {
        attack: [actions.skirmish, actions.barrage],
        mounts: weaponItems,
        basic: [actions.basic_attack, actions.basic_ram, actions.basic_grapple]
      };
      return {
        theme: "red",
        hasTabs: true,
        tabLabels: tabLabels,
        items: items
      }
    }


    async _buildInvades(actor: LancerMECH): Promise<SubMenuData> {
      const systemInvades = (await getActorActionItems(actor)).filter(a => isInvade(a.action)).map(a => a.subMenuItem);

      /*const isChomo = actor.system.loadout.frame.value.name === "Chomolungma";
      const chomoInvades = isChomo ?
        (actor.system.loadout.frame.value.system.core_system.passive_actions || [])
          .filter(isInvade)
          .map(action => ({
            id: actor.id,
            name: `${action.name} [Chomolungma Frame]`,
            description: action.detail || "No details available."
          }))
        : [];*/
      let pInvades = (await getActorActionItems(pilotForMech(actor))).filter(a => isInvade(a.action)).map(a => a.subMenuItem);
      let options = [...systemInvades, ...pInvades, {
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

    async _buildTechActivations(actor: LancerActor): Promise<SubMenuData> {
      // Orderd according to the UI and order is maintained throughout the method.
      const keyItems: Record<keyof typeof ActivationLabels, SubMenuItem[]> = Object.fromEntries(Object.keys(ActivationLabels)
        .map(k => [k, []])) as Record<keyof typeof ActivationLabels, SubMenuItem[]>;
      // I could just use the enum if it weren't for needing to filter it out.
      const tabLabels: Record<keyof typeof ActivationLabels, string> = {
        ...ActivationLabels
      } as Record<keyof typeof ActivationLabels, string>;
      const actions = (await getActorActionItems(actor));
      if (actor.is_mech()) {
        let pactions = await getActorActionItems(pilotForMech(actor));
        actions.push(...pactions)
      }
      actions
        .filter(a => {
          return !(a.item.is_weapon() || a.item.is_weapon_mod() || isInvade(a.action))
        }).forEach(at => {
        const activ = at.action.activation;
        const mapped = RemapAction[activ];
        const k = keyItems[mapped ?? activ];
        if (!k) {
          console.error("Missing key for", at)
          return;
        }
        k.push(at.subMenuItem);
      });
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
        }
      }
      return {
        title: "Systems",
        tabLabels,
        items: keyItems,
        hasTabs: true,
      }
    }

    getDefaultAttributes() {
      return [
        {path: "system.hp", label: "HP", color: "#2ca020", style: "bar"},
        {path: "system.heat", label: "Heat", color: "#e61c34", style: "bar"},


        // style number = just the number, text number/max
        {path: "system.structure", label: "Structure", color: "#195e14", style: "bar"},
        {path: "system.stress", label: "Stress", color: "#80101c", style: "bar"},

        // Put your own saves in
        {path: "system.hull", label: "Hull", color: "#1a6f73", style: "dots", ownerOnly: true},
        {path: "system.agi", label: "Agility", color: "#1a6f73", style: "dots", ownerOnly: true},
        {path: "system.sys", label: "System", color: "#1a6f73", style: "dots", ownerOnly: true},
        {path: "system.eng", label: "Engineering", color: "#1a6f73", style: "dots", ownerOnly: true},
        {path: "system.grit", label: "Grit", color: "#e61c34", style: "dots", ownerOnly: true},
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

      if (actor.is_deployable()) {
        return [
          {
            "path": "system.hp.value",
            "label": "Hp"
          }]
      }

      if (actor.is_npc()) {
        return [
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
          }
        ]
      }

      if (actor.is_pilot()) {
        return [{
          "path": "system.bond_state.xp.value",
          "label": "Xp"
        }, {
          "path": "system.bond_state.stress.value",
          "label": "Stress"
        }, {
          "path": "system.bond_state.burdens.0.value",
          "label": "0"
        }, {
          "path": "system.hp.value",
          "label": "Hp"
        }]
      }

      if (actor.is_mech()) {
        paths.push(
          {
            "path": "system.repairs.value",
            "label": "Repairs"
          },
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
          }, // Do I even want pilot counters here?
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

