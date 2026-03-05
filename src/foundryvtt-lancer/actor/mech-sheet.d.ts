import { LancerActorSheet } from "./lancer-actor-sheet";
import type { LancerMECH } from "./lancer-actor";
import { ResolvedDropData } from "../helpers/dragdrop";
import { EntryType } from "../enums";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerMechSheet extends LancerActorSheet<EntryType.MECH> {
    /**
     * Extend and override the default options used by the NPC Sheet
     */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        token?: import("../token").LancerTokenDocument;
        viewPermission: 0 | 1 | 2 | 3 | -1;
        secrets: HTMLSecretConfiguration<Actor>[];
        closeOnSubmit: boolean;
        submitOnChange: boolean;
        submitOnClose: boolean;
        editable: boolean;
        sheetConfig: boolean;
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
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
        dragDrop: Omit<DragDropConfiguration, "permissions" | "callbacks">[];
        filters: Omit<SearchFilterConfiguration, "callback">[];
    }, {
        classes: string[];
        template: string;
        width: number;
        height: number;
        tabs: {
            navSelector: string;
            contentSelector: string;
            initial: string;
        }[];
    }>;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery<HTMLElement>): void;
    canRootDrop(item: ResolvedDropData): boolean;
    onRootDrop(base_drop: ResolvedDropData, event: JQuery.DropEvent, _dest: JQuery<HTMLElement>): Promise<void>;
    /**
     * Handles actions in the overcharge panel
     */
    _activateOverchargeControls(html: JQuery<HTMLElement>): void;
    /**
     * Sets the overcharge level for this actor
     * @param _event An event, used by a proper overcharge section in the sheet, to get the overcharge field
     * @param level Level to set overcharge to
     */
    _setOverchargeLevel(_event: JQuery.ClickEvent, level: number): Promise<LancerMECH>;
    /**
     * Handles more niche controls in the loadout in the overcharge panel
     */
    _activateLoadoutControls(html: any): void;
    _activateMountContextMenus(html: any): void;
    _event_handler(mode: "reset-wep" | "reset-all-weapon-mounts" | "reset-sys" | "overcharge" | "overcharge-rollback", evt: JQuery.ClickEvent): Promise<void>;
    getData(): Promise<object>;
}
