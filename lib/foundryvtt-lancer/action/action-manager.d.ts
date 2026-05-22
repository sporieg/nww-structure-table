import type { ActionTrackingData } from "./index";
import type { LancerActor } from "../actor/lancer-actor";
declare global {
    interface FlagConfig {
        User: {
            lancer: {
                "action-manager"?: {
                    pos?: {
                        top: number;
                        left: number;
                    };
                };
            };
        };
    }
}
export declare class LancerActionManager extends Application {
    static DEF_LEFT: number;
    static DEF_TOP: number;
    static enabled: boolean;
    target: LancerActor | null;
    constructor(...args: any);
    init(): Promise<void>;
    /** @override */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        baseApplication: string;
        width: number;
        height: number;
        top: number;
        left: number;
        scale: number;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        classes: string[];
        title: string;
        template: string;
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDropConfiguration, "permissions" | "callbacks">[];
        filters: Omit<SearchFilterConfiguration, "callback">[];
    }, {
        template: string;
        width: number;
        height: number;
        left: number;
        top: number;
        scale: number;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        title: string;
    }>;
    /** @override */
    getData(_options?: {}): {
        position: Application.Position;
        name: any;
        actions: ActionTrackingData;
        clickable: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
            initial: true;
        }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
    };
    /**
     * Get proxy for ease of migration when we change over to MM data backing.
     * @returns actions map.
     */
    private getActions;
    reset(): Promise<void>;
    update(_force?: boolean): Promise<void>;
    updateConfig(): Promise<void>;
    private updateControlledToken;
    /**
     * Resets actions to their default state.
     */
    private resetActions;
    /** @override */
    activateListeners(html: JQuery): void;
    private loadUserPos;
    private loadTooltips;
    private dragElement;
    private canMod;
}
