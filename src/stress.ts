import {
  LancerFlowState,
  FlowState,
  Step,
  Flow,
  LancerActor,
} from "foundryvtt-lancer/lancer-system.js";
import { _runHaseCheck, isValidTarget, localize, pushEmbedButton } from "./extensions.js";
import { MODULE_ID } from "./const.js";

type State = FlowState<LancerFlowState.OverheatRollData>;


function guard(state: State): [false, false, false] | [LancerActor, State["data"], Roll] {
  if (!state.data) throw new TypeError(`Structure roll flow data missing!`);
  const actor = state.actor;
  if (!isValidTarget(actor)) {
    return [false, false, false];
  }
  const result = state.data.result;
  if (!result) throw new TypeError(`Structure check hasn't been rolled yet!`);
  return [actor, state.data, result.roll]
}



function stressTableDescriptions(roll: number): { title: string; description: string } | null {
  switch (roll) {
    // Used for multiple ones
    case 0:
      return {
        title: localize("StressDescriptions.criticalFail.title"),
        description: localize("StressDescriptions.criticalFail.description"),
      };
    case 1:
    case 2:
      return {
        title: localize("StressDescriptions.meltdown.title"),
        description: localize("StressDescriptions.meltdown.description"),
      };
    case 3:
    case 4:
      return {
        title: localize("StressDescriptions.powerFail.title"),
        description: localize("StressDescriptions.powerFail.description"),
      };
    case 5:
    case 6:
      return {
        title: localize("StressDescriptions.emergencyShunt.title"),
        description: localize("StressDescriptions.emergencyShunt.description"),
      };
  }
  return null;
}

const getRollCount = (roll: Roll, num_to_count: number) => {
  return roll
    ? (roll.terms as foundry.dice.terms.Die[])[0].results.filter((v) => v.result === num_to_count)
        .length
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
  let [actor, data, roll] = guard(state);
  if (!actor || !data || !roll) return true;

  const structure = state.data.remStress;
  const difficulty = 4 - structure;

  let one_count = getRollCount(roll, 1);

  if (one_count > 1) {
    pushEmbedButton(state, {
      label: `ENGINEERING with ${difficulty} Difficulty`,
      actorUuid: actor.uuid
    })
    await _runHaseCheck(actor, "eng", difficulty, async function(actor, outcome: Record<string, any>) {
      const title = state.data.title;
      if(outcome.passed) {
        return { title, description: "No Meltdown" };
      }
      return { title, description: "Meltodnw time."};
    })
  }
  return true;
}

Hooks.once(
  "lancer.registerFlows",
  (flowSteps: Map<string, Step<any, any> | Flow<any>>, flows: Map<string, typeof Flow<any>>) => {
    /**
     * We can leave the stress rolls themselves alone and just reword the card.
     */
    flowSteps.set(`${MODULE_ID}:rewordStressCard`, rewordStressCard);
    flowSteps.set(`${MODULE_ID}:rewordStressMultipleOnes`, rewordStressMultipleOnes);
    flowSteps.set("overheatInsertEngCheckButton", replaceEngineeringCheckButton);

    const stressFlow = flows.get("OverheatFlow");
    if (stressFlow) {
      /**
       * Adjust the structure flow by changing how the card is assembled.
       */
      stressFlow.insertStepAfter("rollOverheatTable", `${MODULE_ID}:rewordStressCard`);
      stressFlow.insertStepAfter(
        "checkOverheatMultipleOnes",
        `${MODULE_ID}:rewordStressMultipleOnes`,
      );
    } else {
      console.error("Lancer | Could not find OverheatFlow");
    }
  },
);

const voidState = async (_state: State) => true;
/**
 * LA steps are replaced after.
 */
Hooks.once("ready", async () => {
  // @ts-ignore
  const flowSteps = game.lancer.flowSteps;
  // @ts-ignore
  const stressFlow = game.lancer.flows.get("OverheatFlow");
  console.table(stressFlow.steps.map(s => {
    return [s, flowSteps.get(s)];
  }));
  flowSteps.set("baseApplyStressEffects", voidState);
})
