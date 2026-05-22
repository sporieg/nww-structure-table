import type {FlowState, LancerFlowState} from "foundryvtt-lancer/flows";
import {isValidTarget, localize} from "./extensions.js";
import {LancerActor} from "foundryvtt-lancer/actor/lancer-actor";

type State = FlowState<LancerFlowState.PrimaryStructureRollData>

const getRollCount = (roll: Roll, num_to_count: number) => {
  return roll
    ? (roll.terms as foundry.dice.terms.Die[])[0].results.filter((v) => v.result === num_to_count).length
    : 0;
};
const structTableTitles = [
  "lancer.tables.structure.title.crushing",
  "lancer.tables.structure.title.direct",
  "lancer.tables.structure.title.trauma",
  "lancer.tables.structure.title.trauma",
  "lancer.tables.structure.title.trauma",
  "lancer.tables.structure.title.glancing",
  "lancer.tables.structure.title.glancing",
];

// Table of structure table descriptions
function structTableDescriptions(roll: number, remStruct: number): string {
  switch (roll) {
    // Used for multiple ones
    case 0:
      return "lancer.tables.structure.description.crushing";
    case 1:
      switch (remStruct) {
        case 2:
          return "lancer.tables.structure.description.direct.2";
        case 1:
        case 0:
          return "lancer.tables.structure.description.direct.1";
        default:
          return "lancer.tables.structure.description.direct.3plus";
      }
    case 2:
    case 3:
    case 4:
      return "lancer.tables.structure.description.trauma";
    case 5:
    case 6:
      return "lancer.tables.structure.description.glancing";
  }
  return "";
}

/**
 * We need to wrap the original roll structure so that it can be prevented from updating the structure.
 * A symetcial override is not needed for overheat, as that always destroys at the end of a round anyway.
 * @param originalRoll
 */
export const rollStructureTable = (originalRoll: (s: State) => Promise<boolean>)=> async (state: State) => {
  if (!state.data) throw new TypeError(`Structure roll flow data missing!`);
  const actor = state.actor;
  if (!actor.is_mech() && !actor.is_npc()) {
    ui.notifications!.warn("Only npcs and mechs can roll structure.");
    return false;
  }

  if ((state.data?.reroll_data?.structure ?? actor.system.structure.value) >= actor.system.structure.max) {
    ui.notifications!.info("The mech is at full Structure, no structure check to roll.");
    return false;
  }

  let remStruct = state.data?.reroll_data?.structure ?? actor.system.structure.value;
  let damage = actor.system.structure.max - remStruct;
  let formula = `${damage}d6kl1`;
  let roll: Roll = await new Roll(formula).evaluate();

  let result = roll.total;
  if (result === undefined) return false;



  state.data = {
    type: "structure",
    title: structTableTitles[result],
    desc:  structTableDescriptions(result, remStruct),
    remStruct: remStruct,
    val: actor.system.structure.value,
    max: actor.system.structure.max,
    roll_str: roll.formula,
    result: {
      roll: roll,
      tt: await roll.getTooltip(),
      total: (roll.total ?? 0).toString(),
    },
  };
};

export async function rewordStructureCard(state: State) {
  if (!state.data) throw new TypeError(`Structure roll flow data missing!`);
  const actor = state.actor;
  // We are not changing the roll flow.
  console.log("My structure card.")
  if (!isValidTarget(actor)) {
    return true;
  }

  const structRoll = parseInt(state.data.result.total);

  switch (structRoll) {
    // Used for multiple ones
    case 0:
      state.data.title = localize("StructureDescriptions.crushingHit.title")
      state.data.desc = localize("StructureDescriptions.crushingHit.description");
      break;
    case 1:
    case 2:
      state.data.title = localize("StructureDescriptions.directHit.title")
      state.data.desc = localize("StructureDescriptions.directHit.description");
      break;
    case 3:
    case 4:
      state.data.title = localize("StructureDescriptions.systemTrauma.title")
      state.data.desc = localize("StructureDescriptions.systemTrauma.description");
      break;
    case 5:
    case 6:
      state.data.title = localize("StructureDescriptions.glancingBlow.title")
      state.data.desc = localize("StructureDescriptions.glancingBlow.description");
      break;
  }
  console.log("My structure card.", state.data)
  return true;
}

export async function structCheckMultipleOnes(state: State) {
  if (!state.data) throw new TypeError(`Structure roll flow data missing!`);
  const actor = state.actor;
  // We are not changing the roll flow.
  if (!isValidTarget(actor)) {
    return true;
  }

  const roll = state.data.result?.roll;
  if (!roll) throw new TypeError(`Structure check hasn't been rolled yet!`);

  // Crushing hits
  let one_count = getRollCount(roll, 1);
  if (one_count > 1) {
    state.data.title = localize("StructureDescriptions.crushingHit.title")
    state.data.desc = localize("StructureDescriptions.crushingHit.description");
  }

  return true;
}

export async function insertHullCheckButton(state: State) {
  if (!state.data) throw new TypeError(`Structure roll flow data missing!`);
  const actor = state.actor;
  // We are not changing the roll flow.
  if (!isValidTarget(actor)) {
    return true;
  }

  const result = state.data.result;
  if (!result) throw new TypeError(`Structure check hasn't been rolled yet!`);

  const roll = result.roll;
  const structure = state.data.remStruct;
  const difficulty = 4 - structure;

  let one_count = getRollCount(roll, 1);

  if (one_count > 1) {
    state.data.embedButtons = state.data.embedButtons || [];
    state.data.embedButtons.push(`<a
          class="flow-button lancer-button"
          data-flow-type="check"
          data-check-type="hull"
          data-actor-id="${actor.uuid}"
        >
          <i class="fas fa-dice-d20 i--sm"></i> HULL with ${difficulty} Difficulty
        </a>`);
  }
  return true;
}

export async function removeSystemTraumaButton(state: State) {
  if (!state.data) throw new TypeError(`Structure roll flow data missing!`);
  const actor = state.actor;
  // No secondaries with NWW
  if (!isValidTarget(actor)) return true;
  state.data.embedButtons = state.data.embedButtons?.filter(x => !x.includes(`data-flow-type="secondaryStructure"`)) || [];
  return true;
}
