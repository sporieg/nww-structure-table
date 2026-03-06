declare global {
    interface TourStep {
        click?: boolean;
        sidebarTab?: string;
        inApp?: boolean;
    }
}
import { LancerActor } from "../actor/lancer-actor";
import { LCPManager } from "../apps/lcp-manager/lcp-manager";
import { LancerCombat } from "../combat/lancer-combat";
/**
 * LANCER Extensions to the foundry Tour class. Adds sidebarTab and click as
 * optional parameters on tour steps. The sidebarTab parameter will open the
 * sidebar to the specified tab before the step. The click parameter will
 * simulate a click on the element before proceeding to the next step if set to
 * true.
 */
export declare class LancerTour extends Tour {
    exit(): void;
    complete(): Promise<void>;
    /**
     * Clean up after the tour. Runs on exit or completion. This is never awaited.
     * @param _complete - True if exiting due to completion, false if exiting early
     */
    protected _tearDown(_complete: boolean): Promise<void>;
    protected _preStep(): Promise<void>;
    protected _postStep(): Promise<void>;
}
/**
 * Tour for showcasing the LCP Manager
 */
export declare class LancerLcpTour extends LancerTour {
    manager?: LCPManager;
    protected _preStep(): Promise<void>;
    protected _tearDown(complete: boolean): Promise<void>;
}
/**
 * Tour of Pilot imports
 */
export declare class LancerPilotTour extends LancerTour {
    actor?: LancerActor;
    protected _preStep(): Promise<void>;
    protected _tearDown(): Promise<void>;
}
/**
 * Tour of NPC creation
 */
export declare class LancerNPCTour extends LancerTour {
    npc?: LancerActor;
    protected _preStep(): Promise<void>;
    protected _postStep(): Promise<void>;
    protected _tearDown(): Promise<void>;
}
/**
 * Tour of attack and check dialog
 * Here be $^&#@*&$^*&#
 */
export declare class LancerSlidingHudTour extends LancerTour {
    npc?: LancerActor;
    protected _preStep(): Promise<void>;
    protected _tearDown(): Promise<void>;
}
/**
 * Tour of combat tracker changes
 */
export declare class LancerCombatTour extends LancerTour {
    combat?: LancerCombat;
    protected _preStep(): Promise<void>;
    protected _tearDown(): Promise<void>;
    protected _setupCombat(): Promise<any>;
}
