import { LancerDataModel, EmbeddedRefField, SyncUUIDRefField, FullBoundedNumberField } from "../shared";
import { FittingSize, MountType } from "../../enums";
declare const mech_schema: {
    stress: FullBoundedNumberField;
    structure: FullBoundedNumberField;
    heat: FullBoundedNumberField;
    action_tracker: any;
    lid: import("../shared").LIDField;
    burn: any;
    activations: any;
    custom_counters: any;
    hp: FullBoundedNumberField;
    overshield: FullBoundedNumberField;
    inherited_effects: any;
    overcharge: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
        readonly min: 0;
        readonly integer: true;
        readonly nullable: false;
        readonly initial: 0;
    }, number, number, number>;
    repairs: FullBoundedNumberField;
    core_active: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
        readonly initial: false;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>>;
    core_energy: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
        readonly min: 0;
        readonly integer: true;
        readonly initial: 1;
    }, number, number, number>;
    loadout: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SchemaField<{
        frame: EmbeddedRefField;
        weapon_mounts: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SchemaField<{
            slots: any;
            type: any;
            bracing: any;
        }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SchemaField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>>>;
            type?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: any;
                mod: any;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: string;
                mod: string;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>>>;
            type?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: any;
                mod: any;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>>>;
            type?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>>>;
            type?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>>>;
            type?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>>>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: any;
                mod: any;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>[], import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: string;
                mod: string;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: string;
                mod: string;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>[]>;
        systems: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField<EmbeddedRefField, any, any, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<any>, any, any[], string, string[]>;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").SchemaField.DefaultOptions, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
        frame?: any;
        weapon_mounts?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>>>;
            type?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").ArrayField.DefaultOptions<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon?: any;
                mod?: any;
                size?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>>>;
            type?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.AssignmentType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing?: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.AssignmentType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>>>;
        systems?: any;
    }>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
        frame: any;
        weapon_mounts: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: any;
                mod: any;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>[];
        systems: any[];
    }>, import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
        frame: string;
        weapon_mounts: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
            slots: import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").RemoveIndexSignatures<{
                weapon: string;
                mod: string;
                size: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                    readonly nullable: false;
                    readonly choices: typeof FittingSize;
                }>;
            }>[];
            type: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").StringField.InitializedType<{
                readonly nullable: false;
                readonly choices: MountType[];
            }>;
            bracing: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.InitializedType<import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").SimpleMerge<{
                readonly initial: false;
            }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").BooleanField.DefaultOptions>>;
        }>[];
        systems: string[];
    }>>;
    meltdown_timer: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").NumberField<{
        readonly required: false;
        readonly nullable: true;
        readonly integer: true;
        readonly min: 0;
    }, number, number, number>;
    notes: import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField<import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/fields.mjs").HTMLField.DefaultOptions, string, string, string>;
    pilot: SyncUUIDRefField;
};
type MechSchema = typeof mech_schema;
export declare class MechModel extends LancerDataModel<DataSchema, Actor> {
    static DEFAULT_ICON: string;
    static defineSchema(): MechSchema;
    static migrateData(data: any): import("@league-of-foundry-developers/foundry-vtt-types/src/types/utils.mjs").AnyObject;
}
export {};
