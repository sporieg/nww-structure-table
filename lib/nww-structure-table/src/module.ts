import {rewordStressCard, replaceEngineeringCheckButton, rewordStressMultipleOnes} from "./stress.js";
import {rewordStructureCard, structCheckMultipleOnes, insertHullCheckButton, removeSystemTraumaButton} from "./structure.js";
import {Flow, Step} from "../../foundryvtt-lancer/flows";
import {MODULE_ID} from "./const.js";
import { LancerSystemAdapter } from "./LancerSystemAdapter.js"
import {debug} from "./log.js";

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


// @ts-ignore
//const api = game.modules.get("stylish-action-hud").api;

Hooks.once("stylish-action-hud.apiReady", (api: any) => {
  // Register your custom adapter
  debug("Registering Lancer System Adapter");
  api.registerSystemAdapter("lancer", LancerSystemAdapter);

  /*api.registerDefault("lancer")
  api.registerDefaultAttributes("lancer", [
    { path: "system.hp", label: "HP", color: "#2ca020", style: "bar" },
    { path: "system.heat", label: "Heat", color: "#e61c34", style: "bar" },
    // style number = just the number
    { path: "system.structure", label: "Structure", color: "#2ca020", style: "text" },
    { path: "system.stress", label: "Stress", color: "#e61c34", style: "text" },
  ]);

  api.registerDefaultLayout("lancer", [
    { systemId: "combat", label: "Combat", icon: "fa-solid fa-swords" },
    { systemId: "magic", label: "Magic", icon: "fa-solid fa-hat-wizard" },
    { systemId: "items", label: "Items", icon: "fa-solid fa-backpack" },
  ]);*/
});
