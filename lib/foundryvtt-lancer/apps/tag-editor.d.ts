import { TagData } from "../models/bits/tag";
import { TargetedEditForm } from "./targeted-form-editor";
/**
 * A helper FormApplication subclass for editing a tag
 * @extends {FormApplication}
 */
export declare class TagEditForm extends TargetedEditForm<TagData> {
    /** @override */
    static get defaultOptions(): {
        template: string;
        classes: string[];
        title: string;
        submitOnClose: boolean;
        width: number;
        height: "auto";
        submitOnChange: boolean;
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
    getData(): any;
}
