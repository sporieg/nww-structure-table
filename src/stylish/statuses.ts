

const defaults = [
  {id: "mia"},
  {id: "downandout"},
  {id: "cascading"},
  //{id: "core_power_active"}, when I find a setting to make this awesome
  {id: "reactor_meltdown"},
  {id: "overshield"},
  {id: "burn"},
  {id: "blind"},
  {id: "grappled"},
  {id: "shutdown"},
  {id: "prone"},
  {id: "intangible"},
  {id: "invisible"},
  {id: "exposed"},
  {id: "dangerzone"},
  {id: "stunned"},
  {id: "slow"},
  {id: "shredded"},
  {id: "lockon"},
  {id: "jammed"},
  {id: "impaired"},
  {id: "immobilized"}
]

// @ts-ignore
Hooks.once("stylish-action-hud.apiReady", (api: StylishActionHudAPI) => {
  const statuss = () => CONFIG.statusEffects
    .flatMap((status) => {
      if (!status.id) return [];
      const importantStatus = defaults.find(s => s.id === status.id)
      if (!importantStatus) return [];
      // First grab out defaults from the status config,
      // Then mix in some sensible layout default for the status ovelay.
      // Last, the configs from above is mixed it letting more specific configs set over the geneneal.
      let label = game.i18n.localize(status.name);
      return [({
        label: label,
        filters: {
          grayscale: 50,
          brightness: 90,
          contrast: 90,
          blur: 0,
          saturate: 50,
          sepia: 20,
        },
        overlayPath: status.img,
        overlayScale: 0.5,
        overlayX: 30,
        overlayY: -10, // 우측
        overlayOpacity: 0.8,
        overlayBlend: "normal",
        animation: "pulse",
        tintColor: "#555555",
        tintAlpha: 0.3,
        tintAnimation: "",
        ...importantStatus
      })];
    });

  // The system id for foundryvtt-lancer, must match the game id.
  // This registration is called when you hit the rest in the UI.
  api.registerDefaultStatusEffects("lancer", ctx => {
    return statuss()
  });
})
