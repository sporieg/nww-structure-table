import {LancerActor} from "foundryvtt-lancer/actor/lancer-actor";
import en from "../language/en.json";

type LocalizeKeys = keyof typeof en["LANCER-ALT-STRUCTURE"] extends infer S
  ? S extends keyof typeof en["LANCER-ALT-STRUCTURE"]
    ? `${S & string}.${keyof typeof en["LANCER-ALT-STRUCTURE"][S] & string}.${"title" | "description"}`
    : never
  : never;

// Only run on Player characters, NPC's get other mod rules.
export function isValidTarget(actor: LancerActor) {
  if (actor.is_npc()) {
    console.log("Target is not an PC - using vanilla rules")
  }
  return actor.is_mech()
}

export function localize(key: LocalizeKeys) {
  return game.i18n.localize(`LANCER-ALT-STRUCTURE.${key}`);
}
