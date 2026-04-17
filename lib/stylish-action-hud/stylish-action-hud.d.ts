interface StylishActionHudAPI {
  registerSystemAdapter(
    systemId: string,
    adapter: SystemAdapterClass | SystemAdapterInstance,
    options?: AdapterRegistrationOptions
  ): AdapterEntry;

  createSystemAdapter(
    systemId: string,
    options?: { fallbackSystemId?: string; context?: object }
  ): SystemAdapterInstance;

  getRegisteredAdapters(systemId: string): AdapterEntry[];
  listSystemAdapters(): [string, AdapterEntry[]][];

  registerDefaultAttributes(
    systemId: string,
    data: AttributeConfig[] | ((context: object) => AttributeConfig[]),
    options?: DefaultRegistrationOptions
  ): DefaultEntry;

  registerDefaultLayout(
    systemId: string,
    data: LayoutConfig[] | ((context: object) => LayoutConfig[]),
    options?: DefaultRegistrationOptions
  ): DefaultEntry;

  registerDefaultStatusEffects(
    systemId: string,
    data: StatusEffectConfig[] | ((context: object) => StatusEffectConfig[]),
    options?: DefaultRegistrationOptions
  ): DefaultEntry;

  registerTrackableAttributes(
    systemId: string,
    data: TrackableAttribute[] | ((context: object) => TrackableAttribute[]),
    options?: DefaultRegistrationOptions
  ): DefaultEntry;

  registerActionMenuCategory(
    category: ActionMenuCategory,
    options?: CategoryRegistrationOptions
  ): CategoryEntry;

  registerActionMenuSubMenu(
    categoryId: string,
    provider: SubMenuProvider,
    options?: SubMenuRegistrationOptions
  ): SubMenuEntry;

  onModifyActionMenuCategories(
    callback: (categories: ActionMenuCategory[], actor: Actor) => void
  ): number;

  onModifyActionMenuData(
    callback: (data: SubMenuData, actor: Actor, categoryId: string) => void
  ): number;

  updateConfiguration(
    updates: Partial<Configuration>,
    options?: { replace?: boolean }
  ): Promise<Configuration>;

  updateClientPositions(
    updates: Record<string, Position>,
    options?: { replace?: boolean }
  ): Promise<Record<string, Position>>;

  // Preset API
  exportPreset(options?: ExportPresetOptions): Promise<Preset>;
  importPreset(presetData: Preset, options?: ImportPresetOptions): Promise<ImportResult>;
  downloadPreset(preset: Preset, filename?: string): void;
  importPresetFromFile(options?: ImportPresetOptions): Promise<ImportResult>;

  // Getter methods
  getDefaultAttributes(systemId: string, adapter: any, options?: object): AttributeConfig[];
  getDefaultLayout(systemId: string, adapter: any, options?: object): LayoutConfig[];
  getDefaultStatusEffects(systemId: string, adapter: any, options?: object): StatusEffectConfig[];
  getTrackableAttributes(systemId: string, adapter: any, options?: object): TrackableAttribute[];

  // List methods
  listDefaultAttributes(systemId?: string): DefaultEntry[] | [string, DefaultEntry[]][];
  listDefaultLayouts(systemId?: string): DefaultEntry[] | [string, DefaultEntry[]][];
  listDefaultStatusEffects(systemId?: string): DefaultEntry[] | [string, DefaultEntry[]][];
  listTrackableAttributes(systemId?: string): DefaultEntry[] | [string, DefaultEntry[]][];

  // Action Menu getters
  getRegisteredActionMenuCategories(): CategoryEntry[];
  getRegisteredActionMenuSubMenus(): SubMenuEntry[];
}

interface AdapterRegistrationOptions {
  priority?: number;
  source?: string;
  isCompatible?: (context: object) => boolean;
}

interface DefaultRegistrationOptions {
  priority?: number;
  mode?: "replace" | "append" | "prepend";
  source?: string;
  isCompatible?: (context: object) => boolean;
}

interface CategoryRegistrationOptions {
  priority?: number;
  source?: string;
  override?: boolean;
  isCompatible?: (context: { actor: Actor }) => boolean;
}

interface ActionMenuCategory {
  id: string;
  label: string;
  icon?: string;
  img?: string;
  useSidebar?: boolean;
  type: "submenu" | "sheet" | "system";
  cssClass?: string;
  systemId?: string;
  buttonImg?: string;
  buttonScale?: number;
  buttonX?: number;
  buttonY?: number;
}

interface SubMenuData {
  title: string;
  theme?: string;
  hasTabs?: boolean;
  hasSubTabs?: boolean;
  items: Record<string, SubMenuItem[]> | SubMenuItem[];
  tabLabels?: Record<string, string>;
  subTabLabels?: Record<string, Record<string, string>>;
}

interface SubMenuItem {
  id: string;
  name: string;
  img?: string;
  cost?: string;
  description?: string;
  isHeader?: boolean;
  isFavorite?: boolean;
  isPersonal?: boolean;
  uses?: { value: number; max: number };
}

interface ExportPresetOptions {
  includeTheme?: boolean;
  includeGlobalAttributes?: boolean;
  includeCustomMenu?: boolean;
  includeActorPresets?: boolean;
}

interface ImportPresetOptions {
  merge?: boolean;
  skipSystemCheck?: boolean;
}

interface Preset {
  meta: {
    name: string;
    description: string;
    systemId: string;
    systemTitle: string;
    moduleVersion: string;
    exportDate: string;
    foundryVersion: string;
  };
  data: {
    theme?: string;
    globalAttributes?: AttributeConfig[];
    customMenu?: object[];
    actorPresets?: Record<string, object>;
  };
  macros: Record<string, MacroData>;
}

interface MacroData {
  uuid: string;
  name: string;
  img: string;
  type: string;
  isCompendium: boolean;
  command?: string;
}

interface ImportResult {
  success: boolean;
  error?: string;
  macrosCreated?: string[];
  macrosSkipped?: string[];
  warnings?: string[];
  actorPresetsImported?: number;
}
