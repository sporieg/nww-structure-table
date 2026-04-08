// Spawn Lancer Deployable Macro (Native Foundry Version)

// Select one token and execute this macro to generate a selectable list of that actor's deployables. After selecting a deployable from the list, Left-click to place the token.  Right-click or press Escape to abort placement.

// CHANGELOG

// v2: Removed Warpgate requirements, restyled the selection window.

await Sequencer.Preloader.preloadForClients([
  "jb2a.markers_scifi.002.complete",
]);

// Step 1: Check selected tokens
if (canvas.tokens.controlled.length !== 1) {
  ui.notifications.warn("You must first select one and only one token.");
  return;
}

// Get the selected token
const token = canvas.tokens.controlled[0];

// Step 2: Fetch all owned deployables
let deployables = game.actors.contents.filter(actor =>
  actor.type === 'deployable' && actor.testUserPermission(game.user, "OWNER")
).filter(deployable => {
  // Step 3: Filter deployables for the selected actor (using the deployer's ID)
  const deployerId = deployable.system?.owner?.id?.replace(/^Actor\./, ''); // Clean ID
  return deployerId === token.actor.id;
});

console.log("Deployables for selected actor:", deployables);

// If no deployables are found, stop the script
if (deployables.length === 0) {
  ui.notifications.warn(`No deployables found for ${token.actor.name}.`);
  return;
}

async function placeToken(deployable) {
  const position =  await Sequencer.Crosshair
    .show({
        icon: {
          texture: deployable.img,
          borderVisible: false
        },
        gridHighlight: true,
        label: {
          text: "Place",
        }
      }, {
        async placed(crosshair) {
          console.log("Crosshair placed placed at:", crosshair);
        }
      }
    )
  console.log("Crosshair position at:", position);
  await deployDeployable(position, deployable)

}

async function deployDeployable(crosshairPos, deployable) {
  // Fetch the prototype token's settings from the deployable actor
  const prototypeToken = deployable.prototypeToken;
  const adjust = canvas.grid.size / 2;
  const tpos = canvas.grid.getSnappedPoint(crosshairPos, {
    mode: CONST.GRID_SNAPPING_MODES.CENTER
  });
  const {x, y} = tpos;
  const tokenData = {
    name: deployable.name,
    img: deployable.img,
    actorId: deployable.id,
    hidden: true,
    x: x - adjust,
    y: y - adjust,
    // Add additional properties from the prototype token
    ...prototypeToken // Spread operator to include all properties
  };

  const myToken = (await canvas.scene.createEmbeddedDocuments("Token", [tokenData]))[0];
  try {
    await new Sequence()
      .effect("jb2a.markers_scifi.002.complete")
      .atLocation(myToken)
      .belowTokens()
      .playbackRate(1.5)
      .scale(0.4, 0.4)
      .randomRotation()
      .wait(500)
      .thenDo(async () => {
        await myToken.update({hidden: false});
      })
      .play();
  } catch (e) {
    console.log(e)
  }
}


// Step 4: Prepare buttons for each deployable (using Dialog for UI)
const buttons = deployables.map((deployable, index) => {
  return {
    label: `
      <div style="display: flex; align-items: center; margin-bottom: 1px; width: 300px;">
        <div style="width: 50px; height: 50px; overflow: hidden; margin-right: 10px;">
          <img src="${deployable.img}" style="width: 100%; height: auto; transform: scale(2.2);">
        </div>
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 200px;">${deployable.name.replace(`${token.actor.name}'s`, '')}</span>
      </div>
    `,
    callback: async () => {
      try {
        await placeToken(deployable)
      } catch (e) {
        console.error("Token placement failed:", e)
      } finally {
        //cleanup
      }
    }
  };
});

// Step 9: Create and display the dialog
new Dialog({
  title: "Select Deployable to Place",
  content: "<p>Select a deployable:</p>",
  buttons: buttons.reduce((obj, btn, index) => {
    obj[`deploy${index}`] = btn;
    return obj;
  }, {}),
  default: "deploy0"
}).render(true);
