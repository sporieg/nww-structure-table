const itemToToss = 'jb2a.barrel.toss.metal.01.01.green'
const poof = 'jb2a.explosion.01.purple'
const smoke = 'jb2a.smoke.plumes.01.blue'

await Sequencer.Preloader.preloadForClients([
  itemToToss,
  poof,
  smoke
]);
if (canvas.tokens.controlled.length !== 1) {
  ui.notifications.warn("You must first select one and only one token.");
  return;
}
const token = canvas.tokens.controlled[0];
const doc = token.document;
if(!doc.name.includes("Puppetmaster")){
  ui.notifications.warn(`Puppetmaster only you bafoon.`);
  return;
}

let dancingMad =
  [{
    filterType: "transform",
    filterId: "myTransform",
    padding: 200,
    animated:
      {
        rotation:
          {
            clockWise: true,
            loopDuration: 700,
            animType: "syncRotation"
          },
        translationX:
          {
            animType: "sinOscillation",
            val1: -0.25,
            val2: +0.25
          },
        translationY:
          {
            animType: "sinOscillation",
            val1: -0.125,
            val2: +0.125,
            loopDuration: 1500
          },
        scaleX:
          {
            animType: "sinOscillation",
            val1: 0.5,
            val2: 2.6,
            loopDuration: 1200
          },
        scaleY:
          {
            animType: "sinOscillation",
            val1: 0.5,
            val2: 2.6,
            loopDuration: 1200
          }
      }
  }];

await new Sequence()
  .crosshair("Target")
  .effect(itemToToss)
  .atLocation(token)
  .playbackRate(1.5)
  .waitUntilFinished()
  .effect(poof)
  .atLocation(token)
  .waitUntilFinished()
  .effect(smoke)
  //.scaleIn(200, 100)
  //.scaleToObject()
  .size(1000)
  .atLocation(token)
  .wait(700)
  .animation()
  .on(token)
  .moveTowards("Target")
  .hide()
  .waitUntilFinished()
  /*.thenDo(async () => {
    await TokenMagic.deleteFilters(token);
  })*/
  .play()
