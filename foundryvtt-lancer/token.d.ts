import type { Point } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/types.mjs";
declare global {
    interface DocumentClassConfig {
        Token: typeof LancerTokenDocument;
    }
    interface PlaceableObjectClassConfig {
        Token: typeof LancerToken;
    }
    interface FlagConfig {
        Token: {
            lancer: {
                manual_token_size?: boolean | undefined;
            };
        };
    }
}
/**
 * Extend the base TokenDocument class to implement system-specific HP bar logic.
 * @extends {TokenDocument}
 */
export declare class LancerTokenDocument extends TokenDocument {
    _preCreate(...[data, options, user]: Parameters<TokenDocument["_preCreate"]>): Promise<boolean | void>;
    _onRelatedUpdate(update: any, options: any): void;
    /**
     * Calculate the range between this and other, accounting for occupied spaces
     * and size
     * @param other   Target to check against
     * @returns The range in grid units.
     */
    computeRange(other: LancerTokenDocument): number;
}
/**
 * Extend the base Token class to implement additional system-specific logic.
 * @extends {Token}
 */
export declare class LancerToken extends Token {
    constructor(document: LancerTokenDocument);
    /** @override */
    getShape(): import("pixi.js").Rectangle | import("pixi.js").Circle | import("pixi.js").Polygon;
    /**
     * Cached occupied spaces
     */
    protected _spaces: {
        at: Point;
        spaces: Point[];
    };
    /**
     * Returns a Set of Points corresponding to the grid space center points that
     * the token occupies.
     */
    getOccupiedSpaces(): Point[];
}
export declare function extendTokenConfig(...[app, html, _data]: Parameters<Hooks.RenderApplication<TokenConfig>>): void;
