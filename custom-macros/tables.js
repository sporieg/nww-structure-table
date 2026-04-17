const table =[
  {
    min: 1,
    max: 4,
    result: `You discover further information on The Sideritis, aiding your investigations. Advance
SIDERITIS The Weapon by 1.
RESEARCH SIDERITIS R ESEARCH cannot advance The Weapon past 5`},
  {
    min: 5,
    max: 8,
    result: `Spend at the start of a mission to gain three Tarot Dice (3d6). Whenever you do not critically succeed an attack, save, or skill check, you may choose to spend a Tarot Die by rolling it and adding the result to your previous roll.
If you spend more than one Tarot Die per scene, the GM gains a Tarot Die of their own.`
  },
  {
    min: 9,
    max: 12,
    result: `
    This reserve may be spent as protocol. During your turn, a single limited system with
no charges may be used as if a charge remained. If this is done, flip a coin:
• On heads: you take 3 AP Energy damage, and the reserve is not considered
spent.
• On tails: no damage occurs, and this reserve is spent.`
  },
  {
    min: 13,
    max: 16,
    result: `Spend this reserve when a weapon mount is destroyed during combat. You may take
6 AP Kinetic Damage to immediately restore a single Main or smaller weapon to
functionality.`
  },
  {
    min: 17,
    max: 20,
    result: `High-quality match tapes from an old Pankrati veteran, arena insider or avid fan.
Spend before the mission to learn the composition of one team participating in
The Gauntlet (The Solar Flares, The Underworld Duo, Puppetmaster), including
optional systems.`
  }
]



const tableName = "Loot Table";
const data = [
  { min: 1, max: 5, result: "Minor Potion" },
  { min: 6, max: 15, result: "Gold Coins" },
  { min: 16, max: 20, result: "Rusty Sword" }
];
const results = data.map(entry => ({
  type: CONST.TABLE_RESULT_TYPES.TEXT,
  text: entry.result,
  weight: entry.max - entry.min + 1,
  range: [entry.min, entry.max]
}));

const t = await RollTable.create({
  name: tableName,
  formula: "1d20",
  results: results
});
