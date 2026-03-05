import { ActionData } from "../models/bits/action";
import { TargetedEditForm } from "./targeted-form-editor";
/**
 * A helper Dialog subclass for editing an action
 * @extends {Dialog}
 */
export declare class ActionEditDialog extends TargetedEditForm<ActionData> {
    /** @override */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
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
    }, {
        template: string;
        title: string;
        classes: string[];
        submitOnClose: boolean;
    }>;
    getData(): any;
    /** @override */
    fixupForm(form_data: Record<string, string | number | boolean>): Record<string, string | number | boolean>;
}
