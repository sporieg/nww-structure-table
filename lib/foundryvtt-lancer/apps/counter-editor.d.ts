import { CounterData } from "../models/bits/counter";
import { TargetedEditForm } from "./targeted-form-editor";
/**
 * A helper FormApplication subclass for editing a counter
 * @extends {FormApplication}
 */
export declare class CounterEditForm extends TargetedEditForm<CounterData> {
    /** @override */
    static get defaultOptions(): {
        template: string;
        classes: string[];
        title: string;
        width: number;
        height: "auto";
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
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDropConfiguration, "permissions" | "callbacks">[];
        filters: Omit<SearchFilterConfiguration, "callback">[];
    };
    /** @override */
    fixupForm(form_data: Record<string, string | number | boolean>): Record<string, string | number | boolean>;
}
