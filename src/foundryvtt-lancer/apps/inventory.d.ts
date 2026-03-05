import type { LancerActor } from "../actor/lancer-actor";
interface FilledCategory {
    label: string;
    items: any[];
}
export interface InventoryDialogData {
    content: string;
    buttons: Record<string, DialogButton>;
    categories: FilledCategory[];
}
/**
 * A helper Dialog subclass for editing an actors inventories
 * @extends {Dialog}
 */
export declare class InventoryDialog extends Dialog {
    readonly actor: LancerActor;
    constructor(actor: LancerActor, dialogData: DialogData, options?: Partial<DialogOptions>);
    /** @override */
    static get defaultOptions(): DialogOptions;
    getData(): Promise<object>;
    /** @inheritdoc */
    render(force: any, options?: {}): unknown;
    close(options?: FormApplication.CloseOptions): Promise<void>;
    populate_categories(actor: LancerActor): FilledCategory[];
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery<HTMLElement>): void;
    static show_inventory(actor: LancerActor): Promise<void>;
}
export {};
