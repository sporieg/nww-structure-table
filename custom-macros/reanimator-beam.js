let params =
  [{
    filterType: "shadow",
    filterId: "myShadow",
    rotation: 35,
    blur: 2,
    quality: 5,
    distance: 20,
    alpha: 0.7,
    padding: 10,
    shadowOnly: false,
    color: 0x000000,
    zOrder: 6000,
    animated:
      {
        blur:
          {
            active: true,
            loopDuration: 500,
            animType: "syncCosOscillation",
            val1: 2,
            val2: 4
          },
        rotation:
          {
            active: true,
            loopDuration: 100,
            animType: "syncSinOscillation",
            val1: 33,
            val2: 37
          }
      }
  }, {
    filterType: "distortion",
    filterId: "myDistortion",
    maskPath: "modules/tokenmagic/fx/assets/distortion-1.png",
    maskSpriteScaleX: 5,
    maskSpriteScaleY: 5,
    padding: 20,
    animated:
      {
        maskSpriteX: { active: true, speed: 0.05, animType: "move" },
        maskSpriteY: { active: true, speed: 0.07, animType: "move" }
      }
  }];

const impaired = CONFIG.statusEffects.filter((status) => status.id === 'impaired')[0];

if (game.user.targets.size === 0) {
  ui.notifications.warn("You have no tokens targeted.");
  return;
}

const targets = Array.from(game.user.targets);
console.log("Actor", actor)

if (!token) {
  ui.notifications.warn("You have no tokens selected.");
  return;
}

if (targets.some(t => t.id === token.id)) {
  ui.notifications.warn("You are targetting yourself.");
  return;
}



await Promise.all(targets
  .map(async target => {
    await new Sequence()
      .effect()
      .file("jb2a.eldritch_blast")
      .atLocation(token)
      .stretchTo(target)
      .play()
    const imgString = target.actor.img;
    let data = [{
      _id: target.id,
      "texture.src": imgString,
    }];
    await canvas.scene.updateEmbeddedDocuments("Token", data);
    target.actor.update({ "system.hp": 1, "system.heat": 0, "system.burn": 0 });
    await target.actor.toggleStatusEffect(impaired.id, { active: true });
  }));
await TokenMagic.addFiltersOnTargeted(params);
