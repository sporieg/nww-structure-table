import { LCPIndex } from "../apps/lcp-manager/lcp-manager";
import { AnyPackedNpcFeatureData, IContentPack, IContentPackManifest, PackedBondData, PackedCoreBonusData, PackedFrameData, PackedMechSystemData, PackedMechWeaponData, PackedNpcClassData, PackedNpcTemplateData, PackedPilotEquipmentData, PackedSkillData, PackedTagTemplateData, PackedStatusData, PackedTalentData, PackedWeaponModData, PackedReserveData, PackedActionData, PackedSitrepData, PackedEnvironmentData } from "./unpacking/packed-types";
export declare const CORE_BREW_ID = "core";
/**
 * Type for Lancer data provided by npm packages. This includes the original lancer-data as
 * well as all of the content packs since - Long Rim, Wallflower, KTB, etc.
 */
export type NpmLancerData = {
    info?: {
        name: string;
        author: string;
        version: string;
        description: string;
        website: string;
        active: true;
    };
    lcp_manifest?: IContentPackManifest;
    glossary?: {
        name: string;
        description: string;
    }[];
    actions?: PackedActionData[];
    bonds?: PackedBondData[];
    core_bonuses?: PackedCoreBonusData[];
    environments?: PackedEnvironmentData[];
    frames?: PackedFrameData[];
    mods?: PackedWeaponModData[];
    npc_classes?: PackedNpcClassData[];
    npc_features?: AnyPackedNpcFeatureData[];
    npc_templates?: PackedNpcTemplateData[];
    pilot_gear?: PackedPilotEquipmentData[];
    reserves?: PackedReserveData[];
    sitreps?: PackedSitrepData[];
    skills?: PackedSkillData[];
    statuses?: PackedStatusData[];
    systems?: PackedMechSystemData[];
    tags?: PackedTagTemplateData[];
    talents?: PackedTalentData[];
    weapons?: PackedMechWeaponData[];
};
/**
 * Data regarding an LCP, suitable for use in the LCP Manager app.
 */
export type LCPData = {
    id: string;
    title: string;
    author: string;
    url?: string;
    currentVersion: string;
    availableVersion: string;
    cp?: IContentPack;
};
/**
 * Summary of an LCP's contents, for use in the LCP Manager app.
 */
export type ContentSummary = IContentPackManifest & {
    aggregate?: boolean;
    item_prefix: string;
    bonds: number;
    skills: number;
    talents: number;
    reserves: number;
    gear: number;
    frames: number;
    systems: number;
    weapons: number;
    mods: number;
    npc_classes: number;
    npc_templates: number;
    npc_features: number;
};
export declare function generateLcpSummary(cp: any): ContentSummary;
export declare function generateMultiLcpSummary(manifest: IContentPackManifest, cps: IContentPack[]): ContentSummary;
export declare function generateItemID(type: string, name: string, manifest?: IContentPackManifest): string;
export declare function parseContentPack(binString: ArrayBuffer | string): Promise<IContentPack>;
/**
 * The core book data is packaged slightly differently from the other content packs, so this
 * function converts it to a consistent structure.
 * @returns The base content pack for the Lancer Core Book, i.e. lancer-data.
 */
export declare function getBaseContentPack(): Promise<LCPData>;
/**
 * Get all of the official data for Lancer, including the core book and all content packs.
 * The objects in the final array are in the correct format for the LCP Manager app to consume.
 * @param lcpIndex An optional LCP index. This is used to determine the installed version of each LCP.
 * @returns An array of LCPData objects, one for each content pack.
 */
export declare function getOfficialData(lcpIndex?: LCPIndex): Promise<LCPData[]>;
/**
 * Merge the official data with the LCP index data, so that installed 3rd party LCPs are included in the result.
 * @param officialData Array of official content packs
 * @param lcpIndex Index of the currently installed content packs
 * @returns An array of LCPData objects, one for each content pack, with the official data merged with the index data
 */
export declare function mergeOfficialDataAndLcpIndex(officialData: LCPData[], lcpIndex: LCPIndex): LCPData[];
