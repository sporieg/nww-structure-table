import { LancerActor, FlowState } from "foundryvtt-lancer/lancer-system.js";
import en from "../language/en.json";

type LocalizeKeys = keyof (typeof en)["LANCER-ALT-STRUCTURE"] extends infer S
  ? S extends keyof (typeof en)["LANCER-ALT-STRUCTURE"]
    ? `${S & string}.${keyof (typeof en)["LANCER-ALT-STRUCTURE"][S] & string}.${"title" | "description"}`
    : never
  : never;

// Only run on Player characters, NPC's get other mod rules.
export function isValidTarget(actor: LancerActor) {
  if (actor.is_npc()) {
    console.log("Target is not an PC - using vanilla rules");
  }
  return actor.is_mech();
}

export function localize(key: LocalizeKeys) {
  return game.i18n.localize(`LANCER-ALT-STRUCTURE.${key}`);
}

export function altStructButton({ flowType, actorUuid, icon, label, attrs = {} })
{
  const extra = Object.entries(attrs)
    .map(([name, value]) => `data-${name}="${value}"`)
    .join(' ');
  return `<a class="alt-struct-flow-button lancer-button" data-flow-type="${flowType}" ${extra} data-actor-id="${actorUuid}">`
    + `<i class="${icon} i--sm"></i> ${label}</a>`;
}


export function pushEmbedButton(state: FlowState<any>, opts)
{
  state.data.embedButtons = state.data.embedButtons || [];
  state.data.embedButtons.push(altStructButton(opts));
}

export async function _runHaseCheck(actor: LancerActor, checkType: "hull"|"eng" = "hull", difficulty: number, handler: (actor: LancerActor, result: Record<string, any>) => Promise<any>)
{
  // @ts-expect-error
  const result = await game.modules.get("lancer-automations").api.executeStatRoll(actor, checkType, "Check or Ope", 10, {difficulty});
  if (!result.completed)
    return;

  const outcome = await handler(actor, result);
  // @ts-expect-error
  const printGenericCard = /** @type {any} */ (game)?.lancer?.flowSteps?.get("printGenericCard");
  if (outcome && printGenericCard)
    await printGenericCard({ actor, data: { ...outcome, tags: [] } });
}

export function countOnes(roll: Roll) {
  let dice: Roll = roll;
  const pool = dice.terms[0];
  if (pool instanceof foundry.dice.terms.PoolTerm) {
    if (pool.rolls.length > 1) {
      const kept = pool.results.findIndex(
        result => !result.discarded
      );
      dice = pool.rolls[kept] || dice;
    }
  }
  return dice.terms[0] instanceof foundry.dice.terms.Die
    ? dice.terms[0].results.filter(result => result.result === 1).length
    : 0;
}

