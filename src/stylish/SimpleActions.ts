import {ActivationType} from "./ActivationType.js";

/*Object.fromEntries(game.macros._source.filter(m => m.name.startsWith("L.A"))
  .map(m => [m.name.replace("L.A - ", "").replace(" ", "_"), {
    id: "macro-" + m._id,
    name: m.name.replace("L.A - ", "").replace(" ", "_"),
    img: m.img,
  }])
)*/
const simpleActionsByMacro = {
  "Reactor_Explosion": {
    "id": "macro-42AtSqvHlbdrBumG",
    "name": "Reactor_Explosion",
    "img": "modules/lancer-automations/icons/mushroom-cloud.svg"
  },
  "Interact": {
    "id": "macro-5eUNhWdKGguZo6KX",
    "name": "Interact",
    "img": "modules/lancer-automations/icons/click.svg"
  },
  "Throw_Weapon": {
    "id": "macro-6WdpcfoLGYv6TBgz",
    "name": "Throw_Weapon",
    "img": "modules/lancer-automations/icons/throw.svg"
  },
  "Lock_On": {
    "id": "macro-oryUerpTOBkzCnFv",
    "name": "Lock_On",
    "img": "systems/lancer/assets/icons/white/condition_lockon.svg"
  },
  "Invade": {
    "id": "macro-EDZT73HLBPiuuPSj",
    "name": "Invade",
    "img": "systems/lancer/assets/icons/white/tech_quick.svg"
  },
  "Knockback": {
    "id": "macro-FIvBse85JC29PuD2",
    "name": "Knockback",
    "img": "modules/lancer-automations/icons/push.svg"
  },
  "End_Active Item": {
    "id": "macro-GXFvnEStTZPUeIw7",
    "name": "End_Active Item",
    "img": "modules/lancer-automations/icons/pause-button.svg"
  },
  "Shut_Down": {
    "id": "macro-I712dklTcadB3WJS",
    "name": "Shut_Down",
    "img": "systems/lancer/assets/icons/white/status_shutdown.svg"
  },
  "Deploy_Item": {
    "id": "macro-IkOLk9FObJMDgjVz",
    "name": "Deploy_Item",
    "img": "systems/lancer/assets/icons/white/deployable.svg"
  },
  "Ram": {
    "id": "macro-Jzjjxi8hOZMTQk7e",
    "name": "Ram",
    "img": "modules/lancer-automations/icons/ram.svg"
  },
  "Choice_Menu": {
    "id": "macro-VO5nTNciwFctDznc",
    "name": "Choice_Menu",
    "img": "modules/lancer-automations/icons/vote.svg"
  },
  "Eject": {
    "id": "macro-LIuBoGRinNIYwM7v",
    "name": "Eject",
    "img": "modules/lancer-automations/icons/parachute.svg"
  },
  "Skirmish": {
    "id": "macro-LJGEwce2QZfqBAiE",
    "name": "Skirmish",
    "img": "modules/lancer-automations/icons/skirmish.svg"
  },
  "Overwatch": {
    "id": "macro-NWHdUGG4AV1JgetJ",
    "name": "Overwatch",
    "img": "systems/lancer/assets/icons/white/reaction.svg"
  },
  "Disengage": {
    "id": "macro-PnvAp6uz9wGWh0vp",
    "name": "Disengage",
    "img": "modules/lancer-automations/icons/disengage.svg"
  },
  "Reload_One Weapon": {
    "id": "macro-Rw7qhTO7Uet06lsr",
    "name": "Reload_One Weapon",
    "img": "modules/lancer-automations/icons/reload.svg"
  },
  "Search": {
    "id": "macro-TAV2Q3LXY9kgpGSC",
    "name": "Search",
    "img": "modules/lancer-automations/icons/search.svg"
  },
  "Handle": {
    "id": "macro-U3rlQUisrQ1hTwBo",
    "name": "Handle",
    "img": "modules/lancer-automations/icons/hand-truck.svg"
  },
  "Aid": {
    "id": "macro-URhRNebzYJuWJKp8",
    "name": "Aid",
    "img": "modules/lancer-automations/icons/medical-pack.svg"
  },
  "Bolster": {
    "id": "macro-V6YtQmnKs1iJWcln",
    "name": "Bolster",
    "img": "icons/svg/upgrade.svg"
  },
  "Downtime": {
    "id": "macro-Z4nCOCNzg5e01CmZ",
    "name": "Downtime",
    "img": "systems/lancer/assets/icons/white/downtime.svg"
  },
  "Barrage": {
    "id": "macro-ZuOrSrPrg767I1eR",
    "name": "Barrage",
    "img": "modules/lancer-automations/icons/barrage.svg"
  },
  "Dismount": {
    "id": "macro-a7SgQOzT3hc9WESl",
    "name": "Dismount",
    "img": "modules/lancer-automations/icons/dismount.svg"
  },
  "Squeeze": {
    "id": "macro-cFwOkjJW45AeEWxv",
    "name": "Squeeze",
    "img": "modules/lancer-automations/icons/contract.svg"
  },
  "Reinforcement": {
    "id": "macro-dbOhbkignU6Ldmqo",
    "name": "Reinforcement",
    "img": "modules/lancer-automations/icons/rally-the-troops.svg"
  },
  "Pickup_Weapon": {
    "id": "macro-fEyqaIxJ2zrQBvED",
    "name": "Pickup_Weapon",
    "img": "modules/lancer-automations/icons/pickup.svg"
  },
  "Brace": {
    "id": "macro-fphucClJxHblW9ww",
    "name": "Brace",
    "img": "modules/lancer-automations/icons/brace.svg"
  },
  "Scan": {
    "id": "macro-g7ydDbpR5frMbd4x",
    "name": "Scan",
    "img": "modules/lancer-automations/icons/radar-sweep.svg"
  },
  "Reactor_Meltdown": {
    "id": "macro-gbwpEEiRMKAO99DT",
    "name": "Reactor_Meltdown",
    "img": "modules/lancer-automations/icons/time-bomb.svg"
  },
  "Boot_Up": {
    "id": "macro-jSHdRqemfzFQE5HG",
    "name": "Boot_Up",
    "img": "modules/lancer-automations/icons/boot.svg"
  },
  "Fragment_Signal": {
    "id": "macro-pzXWRjBIZ0zUETKr",
    "name": "Fragment_Signal",
    "img": "systems/lancer/assets/icons/white/tech_quick.svg"
  },
  "Hide": {
    "id": "macro-qZ1ChJevGewqjM2l",
    "name": "Hide",
    "img": "systems/lancer/assets/icons/white/status_hidden.svg"
  },
  "Grapple_Choice": {
    "id": "macro-vHeXwtAP3DwOA144",
    "name": "Grapple_Choice",
    "img": "modules/lancer-automations/icons/grappling.svg"
  }
}


export const simpleActivations = {
  brace: {
    title: "Brace",
    action: {
      name: "Brace",
      activation: "Reaction",
    },
    detail: "You count as having RESISTANCE to all damage, burn, and heat from the triggering attack, and until the end of your next turn, all other attacks against you are made at +1 difficulty. Due to the stress of bracing, you cannot take reactions until the end of your next turn and on that turn, you can only take one quick action – you cannot OVERCHARGE, move normally, take full actions, or take free actions."
  },
  boost: {
    title: "Boost",
    action: {
      name: "Disengage",
      activation: "Quick",
    },
    detail: "Increases your movement cap by your SPEED"
  },
  bolster: {
    title: "Bolster",
    action: {
      name: "Bolster",
      activation: "Quick",  // Type d'activation (Quick, Full, etc.)
    },
    detail: "Choose a character within SENSORS. They receive +2 Accuracy on the next skill check or save they make between now and the end of their next turn. Characters can only benefit from one BOLSTER at a time."
  },
  dismount: {
    title: "Dismount",
    action: {
      name: "Dismount",
      activation: "Full",
    },
    detail: "When you DISMOUNT, you climb off of a mech. You can DISMOUNT as a full action. When you DISMOUNT, you are placed in an adjacent space – if there are no free spaces, you cannot DISMOUNT. Additionally, you can also DISMOUNT willing allied mechs or vehicles you have MOUNTED."
  },
  disengage: {
    title: "Disengage",
    action: {
      name: "Disengage",
      activation: "Full",
    },
    detail: "Until the end of your current turn, you ignore engagement and your movement does not provoke reactions.",
  },
  eject: {
    title: "Eject",
    action: { name: "Eject", activation: "Quick" },
    detail: "EJECT as a quick action, flying 6 spaces in the direction of your choice; however, this is a single-use system for emergency use only – it leaves your mech IMPAIRED. Your mech remains IMPAIRED and you cannot EJECT again until your next FULL REPAIR."
  },
  lock_on: {
    title: "Lock On",
    action: {
      name: "Lock On",
      activation: "Quick",
    },
    detail: "Choose a character within SENSORS and line of sight. They gain the LOCK ON condition. Any character making an attack against a character with LOCK ON may choose to gain +1 Accuracy on that attack and then clear the LOCK ON condition after that attack resolves."
  },
  hide: {
    title: "Hide",
    action: {
      name: "Hide",
      activation: "Quick",
    },
    detail: "Obscure the position of your mech, becoming HIDDEN and unable to be identified, precisely located, or be targeted directly by attacks or hostile actions"
  },
  search: {
    title: "Search",
    action: {
      name: "Search",
      activation: "Quick",
    },
    detail: "To SEARCH in a mech, choose a character within your SENSORS that you suspect is HIDDEN and make a contested SYSTEMS check against their AGILITY. To SEARCH as a pilot on foot, make a contested skill check, adding bonuses from triggers as normal. This can be used to reveal characters within RANGE 5. Once a HIDDEN character has been found using SEARCH, they immediately lose HIDDEN and can be located again by any character."
  },
  boot_up: {
    title: "Boot Up",
    action: {
      name: "Boot Up",
      activation: "Full",
    },
    detail: "You can BOOT UP a mech that you are piloting as a full action, clearing SHUT DOWN and restoring your mech to a powered state."
  }
}

export function simpleToSubMenu(key: keyof typeof simpleActivations, rest: Omit<SubMenuItem, "id"|"name"|"description"|"cost">): Pick<SubMenuItem, "id"|"name"|"description"|"cost"> {
  const entry = simpleActivations[key];
  return {
    id: key,
    name: entry.title,
    cost: ActivationType[entry.action.activation],
    description: entry.detail,
    ...rest
  }
}
