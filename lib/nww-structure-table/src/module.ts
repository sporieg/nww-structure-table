import {rewordStressCard, replaceEngineeringCheckButton, rewordStressMultipleOnes} from "./stress.js";
import {rewordStructureCard, structCheckMultipleOnes, insertHullCheckButton, removeSystemTraumaButton} from "./structure.js";
import {Flow, Step} from "../../foundryvtt-lancer/flows";
import {MODULE_ID} from "./const.js";

// @ts-ignore
Hooks.once("lancer.registerFlows", (flowSteps: Map<string, Step<any, any> | Flow<any>>, flows: Map<string, typeof Flow<any>>) => {
  const structureFlow = flows.get("StructureFlow");
  if(structureFlow) {
    /**
     * Adjust the structure flow by changing how the card is assembled.
     * The leaves the rolls alone.
     */
    flowSteps.set(`${MODULE_ID}:rewordStructureCard`, rewordStructureCard);
    structureFlow.insertStepAfter("rollStructureTable", `${MODULE_ID}:rewordStructureCard`);

    // NWW Does not have a secondary structure flow.
    flowSteps.set(`${MODULE_ID}:removeSystemTraumaButton`, removeSystemTraumaButton);
    structureFlow.insertStepAfter("structureInsertSecondaryRollButton", `${MODULE_ID}:removeSystemTraumaButton`);

    // However, if you hit snake eyes, you need to roll.
    flowSteps.set(`${MODULE_ID}:checkStructureMultipleOnes`, structCheckMultipleOnes);
    structureFlow.insertStepAfter("checkStructureMultipleOnes", `${MODULE_ID}:checkStructureMultipleOnes`);

    flowSteps.set("structureInsertHullCheckButton", insertHullCheckButton);
  } else {
    console.error("Lancer | Could not find StructureFlow");
  }
  const stressFlow = flows.get("OverheatFlow");
  if(stressFlow) {
    //Stress flow steps
    flowSteps.set(`${MODULE_ID}:rewordStressCard`, rewordStressCard)
    stressFlow.insertStepAfter("rollOverheatTable", `${MODULE_ID}:rewordStressCard`);

    flowSteps.set(`${MODULE_ID}:rewordStressMultipleOnes`, rewordStressMultipleOnes);
    stressFlow.insertStepAfter("checkOverheatMultipleOnes", `${MODULE_ID}:rewordStressMultipleOnes`);


    flowSteps.set("overheatInsertEngCheckButton", replaceEngineeringCheckButton);
  }
});
