import {
  Flow,
  FlowState,
  LancerActor,
  LancerFlowState,
  Step,
} from "foundryvtt-lancer/lancer-system.js";
import { isValidTarget, localize, pushEmbedButton, _runHaseCheck, countOnes } from "./extensions.js";
import { MODULE_ID } from "./const.js";

type State = FlowState<LancerFlowState.PrimaryStructureRollData>;


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
 * We must replace the oringal roll because the original immediately destroyes on snake eyes.
 */
export const rollStructureTable = async (state: State) => {
  if (!state.data) throw new TypeError(`Structure roll flow data missing!`);
  const actor = state.actor;
  if (!actor.is_mech() && !actor.is_npc()) {
    ui.notifications!.warn("Only npcs and mechs can roll structure.");
    return false;
  }
  let remStruct = state.data?.reroll_data?.structure ?? actor.system.structure.value;

  if (remStruct >= actor.system.structure.max) {
    ui.notifications!.info("The mech is at full Structure, no structure check to roll.");
    return false;
  }

  let damage = actor.system.structure.max - remStruct;
  let formula = `${damage}d6kl1`;
  // No need for rebake hacky fix.  :)
  if (
    actor.is_npc() &&
    actor.items.some((item) =>
      [
        "npcf_legendary_ultra",
        "npcf_legendary_veteran",
        "npc-rebake_npcf_legendary_ultra",
      ].includes(item.system.lid),
    )
  ) {
    formula = `{${formula}, ${formula}}kh`;
  }
  let roll: Roll = await new Roll(formula).evaluate();

  let result = roll.total;
  if (result === undefined) return false;

  state.data = {
    type: "structure",
    title: structTableTitles[result],
    desc: structTableDescriptions(result, remStruct),
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
  let [actor, data, _roll] = guard(state);
  if (!actor || !data) return true;

  const structRoll = parseInt(data.result.total);

  switch (structRoll) {
    // Used for multiple ones
    case 0:
      state.data.title = localize("StructureDescriptions.crushingHit.title");
      state.data.desc = localize("StructureDescriptions.crushingHit.description");
      break;
    case 1:
    case 2:
      state.data.title = localize("StructureDescriptions.directHit.title");
      state.data.desc = localize("StructureDescriptions.directHit.description");
      break;
    case 3:
    case 4:
      state.data.title = localize("StructureDescriptions.systemTrauma.title");
      state.data.desc = localize("StructureDescriptions.systemTrauma.description");
      break;
    case 5:
    case 6:
      state.data.title = localize("StructureDescriptions.glancingBlow.title");
      state.data.desc = localize("StructureDescriptions.glancingBlow.description");
      break;
  }
  return true;
}

export async function structCheckMultipleOnes(state: State) {
  let [actor, data, roll] = guard(state);
  if (!actor || !data || !roll) return true;
  // Crushing hits
  let one_count = countOnes(roll);
  if (one_count > 1) {
    state.data.title = localize("StructureDescriptions.crushingHit.title");
    state.data.desc = localize("StructureDescriptions.crushingHit.description");
  }

  return true;
}

export async function insertHullCheckButton(state: State) {
  let [actor, _data, roll] = guard(state);
  if (!actor || !roll) return true;
  const structure = state.data.remStruct;
  const difficulty = 4 - structure;
  let one_count = countOnes(roll);

  if (one_count > 1) {
    pushEmbedButton(state, {
      label: `Hull Check. ${difficulty} difficulty`,
      actorUuid: actor.uuid
    })
    await _runHaseCheck(actor, "hull", difficulty, async function(actor, outcome: Record<string, any>) {
      const title = state.data.title;
      if(outcome.passed) {
        return { title, description: "Not Destroyed" };
      }
      await actor.update({
        "system.structure.value": 0,
        "system.hp.value": actor.system.hp.value - actor.system.hp.max
      });
      return { title, description: game.i18n?.localize('LA.altStruct.result.hullFailedDestroyed') };
    })
  }
  return true;
}

// No secondaries with NWW
export async function removeSystemTraumaButton(state: State) {
  let [actor, _data, roll] = guard(state);
  if (!actor || !roll) return true;
  state.data.embedButtons =
    state.data.embedButtons?.filter((x) => !x.includes(`data-flow-type="secondaryStructure"`)) ||
    [];
  return true;
}

const voidState = async (_state: State) => true;

/**
 * [
 *   "ilysen-lancer-npc-rebake-structure:hackyLegendaryFixStructure",
 *   "lancer-automations:onPreStructure",
 *   "npcOneStructStep",
 *   "preStructureRollChecks",
 *   "rollStructureTable",
 *   "nww-lancer-alt-structure:rewordStructureCard",
 *   "lancer-automations:onStructure",
 *   "ilysen-lancer-npc-rebake-structure:rewordStructureCard",
 *   "ilysen-lancer-npc-rebake-structure:npcZeroStructureCheck",
 *   "lancer-automations:onRoll:structureRoll",
 *   "noStructureRemaining",
 *   "checkStructureMultipleOnes",
 *   "nww-lancer-alt-structure:checkStructureMultipleOnes",
 *   "ilysen-lancer-npc-rebake-structure:rewordStructureMultipleOnes",
 *   "structureInsertDismembermentButton",
 *   "structureInsertHullCheckButton",
 *   "ilysen-lancer-npc-rebake-structure:insertHullCheckButton",
 *   "structureInsertSecondaryRollButton",
 *   "nww-lancer-alt-structure:removeSystemTraumaButton",
 *   "ilysen-lancer-npc-rebake-structure:removeSystemTraumaButton",
 *   "structureInsertCascadeRollButton",
 *   "baseApplyStructureEffects",
 *   "printStructureCard"
 * ]
 */

/**
 * Replace: baseApplyStructureEffects
 */

Hooks.once(
  "lancer.registerFlows",
  (flowSteps: Map<string, Step<any, any> | Flow<any>>, flows: Map<string, typeof Flow<any>>) => {
    /**
     * We have to replace the roll with a nearly identical one, to prevent the structure from being updated.
     * After that, reword the card normally.
     */
    flowSteps.set("rollStructureTable", rollStructureTable);
    flowSteps.set(`${MODULE_ID}:rewordStructureCard`, rewordStructureCard);
    flowSteps.set(`${MODULE_ID}:removeSystemTraumaButton`, removeSystemTraumaButton);
    //flowSteps.set(`${MODULE_ID}:checkStructureMultipleOnes`, structCheckMultipleOnes);
    flowSteps.set("structureInsertHullCheckButton", insertHullCheckButton);
    // console.log("StructureFlow:", game.lancer.Flow.get("StructureFlow"));
    const structureFlow = flows.get("StructureFlow");
    console.table(structureFlow.steps.map(s => {
      return [s, flowSteps.get(s)];
    }));
    if (structureFlow) {
      /**
       * Adjust the structure flow by changing how the card is assembled.
       * The leaves the rolls alone.
       */
      structureFlow.insertStepAfter("rollStructureTable", `${MODULE_ID}:rewordStructureCard`);
      structureFlow.insertStepAfter("structureInsertSecondaryRollButton", `${MODULE_ID}:removeSystemTraumaButton`,
      );
      flowSteps.set("checkStructureMultipleOnes", structCheckMultipleOnes);
    } else {
      console.error("Lancer | Could not find StructureFlow");
    }
  },
);

/**
 * LA steps are replaced after.
 */
Hooks.once("ready", async () => {
  // @ts-ignore
  const flowSteps = game.lancer.flowSteps;
  // @ts-ignore
  const structureFlow = game.lancer.flows.get("StructureFlow");
  console.table(structureFlow.steps.map(s => {
    return [s, flowSteps.get(s)];
  }));
  flowSteps.set("baseApplyStructureEffects", voidState);
  flowSteps.set("structureInsertHullCheckButton", insertHullCheckButton);
})
