import type {LancerFlowState, FlowState} from "../../foundryvtt-lancer/flows";
import {isValidTarget, localize} from "./extensions.js";

type State = FlowState<LancerFlowState.OverheatRollData>

function stressTableDescriptions(roll: number): { title: string, description: string } | null {
  switch (roll) {
    // Used for multiple ones
    case 0:
      return {
        title: localize("StressDescriptions.criticalFail.title"),
        description: localize("StressDescriptions.criticalFail.description")
      };
    case 1:
    case 2:
      return {
        title: localize("StressDescriptions.meltdown.title"),
        description: localize("StressDescriptions.meltdown.description")
      };
    case 3:
    case 4:
      return {
        title: localize("StressDescriptions.powerFail.title"),
        description: localize("StressDescriptions.powerFail.description")
      };
    case 5:
    case 6:
      return {
        title: localize("StressDescriptions.emergencyShunt.title"),
        description: localize("StressDescriptions.emergencyShunt.description")
      };
  }
  return null;
}

const getRollCount = (roll: Roll, num_to_count: number) => {
  return roll
    ? (roll.terms as foundry.dice.terms.Die[])[0].results.filter((v) => v.result === num_to_count).length
    : 0;
};

export async function rewordStressCard(state: State) {
  if (!state.data) throw new TypeError(`Stress roll flow data missing!`);
  const actor = state.actor;
  if (!isValidTarget(actor)) {
    return true;
  }

  const stressRoll = parseInt(state.data.result?.total) || state.data.val;
  const result = stressTableDescriptions(stressRoll);
  if (result) {
    state.data.title = result.title;
    state.data.desc = result.description;
  }

  return true;
}

export async function rewordStressMultipleOnes(state: State) {
  if (!state.data) throw new TypeError(`Stress roll flow data missing!`);

  let actor = state.actor;
  if (!isValidTarget(actor)) {
    return true;
  }

  const roll = state.data.result?.roll;
  if (!roll) throw new TypeError(`Stress check hasn't been rolled yet!`);

  // Crushing hits
  let one_count = getRollCount(roll, 1);
  if (one_count > 1) {
    const result = stressTableDescriptions(0);
    if (result) {
      state.data.title = result.title;
      state.data.desc = result.description;
    }
  }

  return true;
}

export async function replaceEngineeringCheckButton(state: State) {
  if (!state.data) throw new TypeError(`Stress roll flow data missing!`);

  let actor = state.actor;
  if (!isValidTarget(actor)) {
    return true;
  }

  const result = state.data.result;
  if (!result) throw new TypeError(`Stress check hasn't been rolled yet!`);

  const roll = result.roll;
  const structure = state.data.remStress;
  const difficulty = 4 - structure;


  let one_count = getRollCount(roll, 1);

  if (one_count > 1) {
    state.data.embedButtons = state.data.embedButtons || [];
    state.data.embedButtons.push(`<a
            class="flow-button lancer-button"
            data-flow-type="check"
            data-check-type="engineering"
            data-actor-id="${actor.uuid}"
          >
            <i class="fas fa-dice-d20 i--sm"></i> ENGINEERING with ${difficulty} Difficulty
          </a>`);
  }
  return true;
}
