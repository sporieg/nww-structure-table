import { LancerActor } from "../actor/lancer-actor";
import { LancerItem } from "../item/lancer-item";
/**
 * A helper FormApplication subclass for editing a particular
 * @extends {FormApplication}
 */
export declare class TargetedEditForm<T> extends FormApplication {
    value: T;
    value_path: string;
    target: LancerItem | LancerActor;
    resolve: () => any;
    constructor(target: LancerItem | LancerActor, value_path: string, options: Partial<FormApplicationOptions>, resolve_func: () => any);
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery<HTMLElement>): void;
    static handle(html: JQuery, selector: string, root_doc: LancerItem | LancerActor): void;
    /** @override */
    static get defaultOptions(): {
        width: number;
        height: "auto";
        classes: string[];
        submitOnChange: boolean;
        submitOnClose: boolean;
        closeOnSubmit: boolean;
        editable: boolean;
        sheetConfig: boolean;
        baseApplication: string;
        top: number;
        left: number;
        scale: number;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        title: string;
        template: string;
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDropConfiguration, "permissions" | "callbacks">[];
        filters: Omit<SearchFilterConfiguration, "callback">[];
    };
    /** @override
     * Expose our data
     */
    getData(): any;
    fixupForm(form_data: Record<string, string | number | boolean>): Record<string, string | number | boolean>;
    /** @override */
    _updateObject(event: SubmitEvent, form_data: Record<string, string | number | boolean>): Promise<any>;
    /**
     * A helper constructor function which displays the bonus editor and returns a Promise once it's
     * workflow has been resolved.
     * @param doc Document to edit
     * @param path Where on the document the tag lies
     * @returns
     */
    static edit(doc: LancerItem | LancerActor, path: string): Promise<void>;
}
