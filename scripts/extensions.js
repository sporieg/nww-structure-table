// Only run on Player characters, NPC's get other mod rules.
export function isValidTarget(actor) {
    if (actor.is_npc()) {
        console.log("Target is not an PC - using vanilla rules");
    }
    return actor.is_mech();
}
export function localize(key) {
    return game.i18n.localize(`LANCER-ALT-STRUCTURE.${key}`);
}
