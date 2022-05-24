"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolMds = exports.ShellAPIMds = void 0;
const _1 = require(".");
var ShellAPIMds;
(function (ShellAPIMds) {
    ShellAPIMds["MdsGetRegions"] = "mds.get.regions";
    ShellAPIMds["MdsListConfigProfiles"] = "mds.list.config_profiles";
    ShellAPIMds["MdsSetDefaultConfigProfile"] = "mds.set.default_config_profile";
    ShellAPIMds["MdsGetDefaultConfigProfile"] = "mds.get.default_config_profile";
    ShellAPIMds["MdsSetCurrentCompartment"] = "mds.set.current_compartment";
    ShellAPIMds["MdsGetCurrentCompartmentId"] = "mds.get.current_compartment_id";
    ShellAPIMds["MdsSetCurrentBastion"] = "mds.set.current_bastion";
    ShellAPIMds["MdsGetAvailabilityDomain"] = "mds.get.availability_domain";
    ShellAPIMds["MdsListCompartments"] = "mds.list.compartments";
    ShellAPIMds["MdsGetCompartment"] = "mds.get.compartment";
    ShellAPIMds["MdsListComputeInstances"] = "mds.list.compute_instances";
    ShellAPIMds["MdsGetComputeInstance"] = "mds.get.compute_instance";
    ShellAPIMds["MdsListComputeShapes"] = "mds.list.compute_shapes";
    ShellAPIMds["MdsDeleteComputeInstance"] = "mds.delete.compute_instance";
    ShellAPIMds["MdsUtilCreateMdsEndpoint"] = "mds.util.create_mds_endpoint";
    ShellAPIMds["MdsGetDbSystemConfiguration"] = "mds.get.db_system_configuration";
    ShellAPIMds["MdsListDbSystems"] = "mds.list.db_systems";
    ShellAPIMds["MdsGetDbSystem"] = "mds.get.db_system";
    ShellAPIMds["MdsGetDbSystemId"] = "mds.get.db_system_id";
    ShellAPIMds["MdsUpdateDbSystem"] = "mds.update.db_system";
    ShellAPIMds["MdsCreateDbSystem"] = "mds.create.db_system";
    ShellAPIMds["MdsDeleteDbSystem"] = "mds.delete.db_system";
    ShellAPIMds["MdsStopDbSystem"] = "mds.stop.db_system";
    ShellAPIMds["MdsStartDbSystem"] = "mds.start.db_system";
    ShellAPIMds["MdsRestartDbSystem"] = "mds.restart.db_system";
    ShellAPIMds["MdsListLoadBalancers"] = "mds.list.load_balancers";
    ShellAPIMds["MdsListBastions"] = "mds.list.bastions";
    ShellAPIMds["MdsGetBastion"] = "mds.get.bastion";
    ShellAPIMds["MdsCreateBastion"] = "mds.create.bastion";
    ShellAPIMds["MdsDeleteBastion"] = "mds.delete.bastion";
    ShellAPIMds["MdsListBastionSessions"] = "mds.list.bastion_sessions";
    ShellAPIMds["MdsGetBastionSession"] = "mds.get.bastion_session";
    ShellAPIMds["MdsCreateBastionSession"] = "mds.create.bastion_session";
    ShellAPIMds["MdsDeleteBastionSession"] = "mds.delete.bastion_session";
})(ShellAPIMds = exports.ShellAPIMds || (exports.ShellAPIMds = {}));
class ProtocolMds extends _1.Protocol {
    static getRequestGetRegions() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetRegions, {
            args: {},
        });
    }
    static getRequestListConfigProfiles(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                config_file_path: kwargs.configFilePath,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListConfigProfiles, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetDefaultConfigProfile(profileName, configFileLocation = "~/.oci/config", cliRcFileLocation = "~/.oci/oci_cli_rc") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsSetDefaultConfigProfile, {
            args: {
                profile_name: profileName,
                config_file_location: configFileLocation,
                cli_rc_file_location: cliRcFileLocation,
            },
        });
    }
    static getRequestGetDefaultConfigProfile(cliRcFileLocation = "~/.oci/oci_cli_rc") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetDefaultConfigProfile, {
            args: {
                cli_rc_file_location: cliRcFileLocation,
            },
        });
    }
    static getRequestSetCurrentCompartment(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                compartment_path: kwargs.compartmentPath,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                profile_name: kwargs.profileName,
                cli_rc_file_path: kwargs.cliRcFilePath,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsSetCurrentCompartment, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetCurrentCompartmentId(compartmentId, config, profileName, cliRcFilePath = "~/.oci/oci_cli_rc") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetCurrentCompartmentId, {
            args: {
                compartment_id: compartmentId,
                config,
                profile_name: profileName,
                cli_rc_file_path: cliRcFilePath,
            },
        });
    }
    static getRequestSetCurrentBastion(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                bastion_name: kwargs.bastionName,
                bastion_id: kwargs.bastionId,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                profile_name: kwargs.profileName,
                cli_rc_file_path: kwargs.cliRcFilePath,
                raise_exceptions: kwargs.raiseExceptions,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsSetCurrentBastion, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetAvailabilityDomain(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                availability_domain: kwargs.availabilityDomain,
                random_selection: kwargs.randomSelection,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetAvailabilityDomain, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestListCompartments(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                compartment_id: kwargs.compartmentId,
                include_tenancy: kwargs.includeTenancy,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListCompartments, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetCompartment(compartmentPath, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                parent_compartment_id: kwargs.parentCompartmentId,
                config: kwargs.config,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetCompartment, {
            args: {
                compartment_path: compartmentPath,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestListComputeInstances(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListComputeInstances, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetComputeInstance(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                instance_name: kwargs.instanceName,
                instance_id: kwargs.instanceId,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetComputeInstance, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestListComputeShapes(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                limit_shapes_to: kwargs.limitShapesTo,
                availability_domain: kwargs.availabilityDomain,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListComputeShapes, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteComputeInstance(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                instance_name: kwargs.instanceName,
                instance_id: kwargs.instanceId,
                await_deletion: kwargs.awaitDeletion,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                ignore_current: kwargs.ignoreCurrent,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsDeleteComputeInstance, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestUtilCreateMdsEndpoint(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                instance_name: kwargs.instanceName,
                db_system_name: kwargs.dbSystemName,
                db_system_id: kwargs.dbSystemId,
                private_key_file_path: kwargs.privateKeyFilePath,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsUtilCreateMdsEndpoint, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetDbSystemConfiguration(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                config_name: kwargs.configName,
                configuration_id: kwargs.configurationId,
                shape: kwargs.shape,
                availability_domain: kwargs.availabilityDomain,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetDbSystemConfiguration, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestListDbSystems(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListDbSystems, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetDbSystem(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                db_system_id: kwargs.dbSystemId,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetDbSystem, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetDbSystemId(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetDbSystemId, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestUpdateDbSystem(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                db_system_id: kwargs.dbSystemId,
                ignore_current: kwargs.ignoreCurrent,
                new_name: kwargs.newName,
                new_description: kwargs.newDescription,
                new_freeform_tags: kwargs.newFreeformTags,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsUpdateDbSystem, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestCreateDbSystem(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                description: kwargs.description,
                availability_domain: kwargs.availabilityDomain,
                shape: kwargs.shape,
                subnet_id: kwargs.subnetId,
                configuration_id: kwargs.configurationId,
                data_storage_size_in_gbs: kwargs.dataStorageSizeInGbs,
                mysql_version: kwargs.mysqlVersion,
                admin_username: kwargs.adminUsername,
                admin_password: kwargs.adminPassword,
                private_key_file_path: kwargs.privateKeyFilePath,
                par_url: kwargs.parUrl,
                perform_cleanup_after_import: kwargs.performCleanupAfterImport,
                source_mysql_uri: kwargs.sourceMysqlUri,
                source_mysql_password: kwargs.sourceMysqlPassword,
                source_local_dump_dir: kwargs.sourceLocalDumpDir,
                source_bucket: kwargs.sourceBucket,
                host_image_id: kwargs.hostImageId,
                defined_tags: kwargs.definedTags,
                freeform_tags: kwargs.freeformTags,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                interactive: kwargs.interactive,
                return_object: kwargs.returnObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsCreateDbSystem, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteDbSystem(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                db_system_id: kwargs.dbSystemId,
                await_completion: kwargs.awaitCompletion,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsDeleteDbSystem, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestStopDbSystem(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                db_system_id: kwargs.dbSystemId,
                await_completion: kwargs.awaitCompletion,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsStopDbSystem, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestStartDbSystem(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                db_system_id: kwargs.dbSystemId,
                await_completion: kwargs.awaitCompletion,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsStartDbSystem, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestRestartDbSystem(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_system_name: kwargs.dbSystemName,
                db_system_id: kwargs.dbSystemId,
                await_completion: kwargs.awaitCompletion,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsRestartDbSystem, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestListLoadBalancers(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                return_type: kwargs.returnType,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListLoadBalancers, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestListBastions(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                compartment_id: kwargs.compartmentId,
                valid_for_db_system_id: kwargs.validForDbSystemId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                return_type: kwargs.returnType,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListBastions, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetBastion(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                bastion_name: kwargs.bastionName,
                bastion_id: kwargs.bastionId,
                await_state: kwargs.awaitState,
                ignore_current: kwargs.ignoreCurrent,
                fallback_to_any_in_compartment: kwargs.fallbackToAnyInCompartment,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                return_type: kwargs.returnType,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetBastion, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestCreateBastion(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                bastion_name: kwargs.bastionName,
                db_system_id: kwargs.dbSystemId,
                client_cidr: kwargs.clientCidr,
                max_session_ttl_in_seconds: kwargs.maxSessionTtlInSeconds,
                target_subnet_id: kwargs.targetSubnetId,
                await_active_state: kwargs.awaitActiveState,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                ignore_current: kwargs.ignoreCurrent,
                interactive: kwargs.interactive,
                return_type: kwargs.returnType,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsCreateBastion, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteBastion(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                bastion_name: kwargs.bastionName,
                bastion_id: kwargs.bastionId,
                await_deletion: kwargs.awaitDeletion,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                ignore_current: kwargs.ignoreCurrent,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsDeleteBastion, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestListBastionSessions(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                bastion_id: kwargs.bastionId,
                ignore_current: kwargs.ignoreCurrent,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                interactive: kwargs.interactive,
                return_type: kwargs.returnType,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsListBastionSessions, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetBastionSession(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                session_name: kwargs.sessionName,
                session_id: kwargs.sessionId,
                bastion_id: kwargs.bastionId,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                ignore_current: kwargs.ignoreCurrent,
                interactive: kwargs.interactive,
                return_type: kwargs.returnType,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsGetBastionSession, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestCreateBastionSession(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                bastion_name: kwargs.bastionName,
                bastion_id: kwargs.bastionId,
                fallback_to_any_in_compartment: kwargs.fallbackToAnyInCompartment,
                session_type: kwargs.sessionType,
                session_name: kwargs.sessionName,
                target_id: kwargs.targetId,
                target_ip: kwargs.targetIp,
                target_port: kwargs.targetPort,
                target_user: kwargs.targetUser,
                ttl_in_seconds: kwargs.ttlInSeconds,
                public_key_file: kwargs.publicKeyFile,
                public_key_content: kwargs.publicKeyContent,
                await_creation: kwargs.awaitCreation,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                ignore_current: kwargs.ignoreCurrent,
                interactive: kwargs.interactive,
                return_type: kwargs.returnType,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsCreateBastionSession, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteBastionSession(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                session_name: kwargs.sessionName,
                session_id: kwargs.sessionId,
                bastion_name: kwargs.bastionName,
                bastion_id: kwargs.bastionId,
                compartment_id: kwargs.compartmentId,
                config: kwargs.config,
                config_profile: kwargs.configProfile,
                ignore_current: kwargs.ignoreCurrent,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMds.MdsDeleteBastionSession, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
}
exports.ProtocolMds = ProtocolMds;
//# sourceMappingURL=ProtocolMds.js.map