import {rewordStressCard, replaceEngineeringCheckButton, rewordStressMultipleOnes} from "./stress.js";
import {
  rewordStructureCard, structCheckMultipleOnes, insertHullCheckButton, removeSystemTraumaButton,
  rollStructureTable
} from "./structure.js";
import {Flow, Step} from "foundryvtt-lancer/flows";
import {MODULE_ID} from "./const.js";

/**
 *
 */
// @ts-ignore
Hooks.once("lancer.registerFlows", (flowSteps: Map<string, Step<any, any> | Flow<any>>, flows: Map<string, typeof Flow<any>>) => {
  const original: any = flowSteps.get("rollStructureTable");
  flowSteps.set("rollStructureTable", rollStructureTable(original));
  flowSteps.set(`${MODULE_ID}:rewordStructureCard`, rewordStructureCard);
  flowSteps.set(`${MODULE_ID}:removeSystemTraumaButton`, removeSystemTraumaButton);
  flowSteps.set(`${MODULE_ID}:checkStructureMultipleOnes`, structCheckMultipleOnes);
  flowSteps.set(`${MODULE_ID}:rewordStressCard`, rewordStressCard);
  flowSteps.set(`${MODULE_ID}:rewordStressMultipleOnes`, rewordStressMultipleOnes);
  flowSteps.set("overheatInsertEngCheckButton", replaceEngineeringCheckButton);
  flowSteps.set("structureInsertHullCheckButton", insertHullCheckButton);

  const structureFlow = flows.get("StructureFlow");
  const stressFlow = flows.get("OverheatFlow");
  if(structureFlow && stressFlow) {
    /**
     * Adjust the structure flow by changing how the card is assembled.
     * The leaves the rolls alone.
     */
    structureFlow.insertStepAfter("rollStructureTable", `${MODULE_ID}:rewordStructureCard`);
    structureFlow.insertStepAfter("structureInsertSecondaryRollButton", `${MODULE_ID}:removeSystemTraumaButton`);
    structureFlow.insertStepAfter("checkStructureMultipleOnes", `${MODULE_ID}:checkStructureMultipleOnes`);
    stressFlow.insertStepAfter("rollOverheatTable", `${MODULE_ID}:rewordStressCard`);
    stressFlow.insertStepAfter("checkOverheatMultipleOnes", `${MODULE_ID}:rewordStressMultipleOnes`);
  } else {
    console.error("Lancer | Could not find StructureFlow|OverheatFlow");
  }
});

