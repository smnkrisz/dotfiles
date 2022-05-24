"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolMrs = exports.ShellAPIMrs = void 0;
const _1 = require(".");
var ShellAPIMrs;
(function (ShellAPIMrs) {
    ShellAPIMrs["MrsAddService"] = "mrs.add.service";
    ShellAPIMrs["MrsGetService"] = "mrs.get.service";
    ShellAPIMrs["MrsListServices"] = "mrs.list.services";
    ShellAPIMrs["MrsEnableService"] = "mrs.enable.service";
    ShellAPIMrs["MrsDisableService"] = "mrs.disable.service";
    ShellAPIMrs["MrsDeleteService"] = "mrs.delete.service";
    ShellAPIMrs["MrsSetServiceDefault"] = "mrs.set.service.default";
    ShellAPIMrs["MrsSetServiceContextPath"] = "mrs.set.service.context_path";
    ShellAPIMrs["MrsSetServiceProtocol"] = "mrs.set.service.protocol";
    ShellAPIMrs["MrsSetServiceComments"] = "mrs.set.service.comments";
    ShellAPIMrs["MrsUpdateService"] = "mrs.update.service";
    ShellAPIMrs["MrsAddSchema"] = "mrs.add.schema";
    ShellAPIMrs["MrsGetSchema"] = "mrs.get.schema";
    ShellAPIMrs["MrsListSchemas"] = "mrs.list.schemas";
    ShellAPIMrs["MrsEnableSchema"] = "mrs.enable.schema";
    ShellAPIMrs["MrsDisableSchema"] = "mrs.disable.schema";
    ShellAPIMrs["MrsDeleteSchema"] = "mrs.delete.schema";
    ShellAPIMrs["MrsSetSchemaName"] = "mrs.set.schema.name";
    ShellAPIMrs["MrsSetSchemaRequestPath"] = "mrs.set.schema.request_path";
    ShellAPIMrs["MrsSetSchemaRequiresAuth"] = "mrs.set.schema.requires_auth";
    ShellAPIMrs["MrsSetSchemaItemsPerPage"] = "mrs.set.schema.items_per_page";
    ShellAPIMrs["MrsSetSchemaComments"] = "mrs.set.schema.comments";
    ShellAPIMrs["MrsUpdateSchema"] = "mrs.update.schema";
    ShellAPIMrs["MrsAddContentSet"] = "mrs.add.content_set";
    ShellAPIMrs["MrsListContentSets"] = "mrs.list.content_sets";
    ShellAPIMrs["MrsGetContentSet"] = "mrs.get.content_set";
    ShellAPIMrs["MrsEnableContentSet"] = "mrs.enable.content_set";
    ShellAPIMrs["MrsDisableContentSet"] = "mrs.disable.content_set";
    ShellAPIMrs["MrsDeleteContentSet"] = "mrs.delete.content_set";
    ShellAPIMrs["MrsAddDbObject"] = "mrs.add.db_object";
    ShellAPIMrs["MrsGetDbObject"] = "mrs.get.db_object";
    ShellAPIMrs["MrsListDbObjects"] = "mrs.list.db_objects";
    ShellAPIMrs["MrsSetDbObjectRequestPath"] = "mrs.set.db_object.request_path";
    ShellAPIMrs["MrsSetDbObjectCrudOperations"] = "mrs.set.db_object.crud_operations";
    ShellAPIMrs["MrsEnableDbObject"] = "mrs.enable.db_object";
    ShellAPIMrs["MrsDisableDbObject"] = "mrs.disable.db_object";
    ShellAPIMrs["MrsDeleteDbObject"] = "mrs.delete.db_object";
    ShellAPIMrs["MrsListContentFiles"] = "mrs.list.content_files";
    ShellAPIMrs["MrsAddAuthenticationApp"] = "mrs.add.authentication_app";
    ShellAPIMrs["MrsListAuthenticationApps"] = "mrs.list.authentication_apps";
    ShellAPIMrs["MrsInfo"] = "mrs.info";
    ShellAPIMrs["MrsVersion"] = "mrs.version";
    ShellAPIMrs["MrsLs"] = "mrs.ls";
    ShellAPIMrs["MrsConfigure"] = "mrs.configure";
    ShellAPIMrs["MrsStatus"] = "mrs.status";
})(ShellAPIMrs = exports.ShellAPIMrs || (exports.ShellAPIMrs = {}));
class ProtocolMrs extends _1.Protocol {
    static getRequestAddService(urlContextRoot, urlHostName, enabled = true, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_protocol: kwargs.urlProtocol,
                is_default: kwargs.isDefault,
                comments: kwargs.comments,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsAddService, {
            args: {
                url_context_root: urlContextRoot,
                url_host_name: urlHostName,
                enabled,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetService(urlContextRoot, urlHostName, serviceId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                get_default: kwargs.getDefault,
                auto_select_single: kwargs.autoSelectSingle,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsGetService, {
            args: {
                url_context_root: urlContextRoot,
                url_host_name: urlHostName,
                service_id: serviceId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestListServices(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsListServices, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestEnableService(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                service_id: kwargs.serviceId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsEnableService, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDisableService(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                service_id: kwargs.serviceId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDisableService, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteService(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                service_id: kwargs.serviceId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDeleteService, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetServiceDefault(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                service_id: kwargs.serviceId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetServiceDefault, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetServiceContextPath(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                value: kwargs.value,
                service_id: kwargs.serviceId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetServiceContextPath, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetServiceProtocol(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                value: kwargs.value,
                service_id: kwargs.serviceId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetServiceProtocol, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetServiceComments(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                value: kwargs.value,
                service_id: kwargs.serviceId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetServiceComments, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestUpdateService(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                service_id: kwargs.serviceId,
                url_context_root: kwargs.urlContextRoot,
                url_host_name: kwargs.urlHostName,
                value: kwargs.value,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsUpdateService, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestAddSchema(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                request_path: kwargs.requestPath,
                requires_auth: kwargs.requiresAuth,
                enabled: kwargs.enabled,
                items_per_page: kwargs.itemsPerPage,
                comments: kwargs.comments,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsAddSchema, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetSchema(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                request_path: kwargs.requestPath,
                schema_name: kwargs.schemaName,
                schema_id: kwargs.schemaId,
                service_id: kwargs.serviceId,
                auto_select_single: kwargs.autoSelectSingle,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsGetSchema, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestListSchemas(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                service_id: kwargs.serviceId,
                include_enable_state: kwargs.includeEnableState,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsListSchemas, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestEnableSchema(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsEnableSchema, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDisableSchema(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDisableSchema, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteSchema(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDeleteSchema, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetSchemaName(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                value: kwargs.value,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetSchemaName, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetSchemaRequestPath(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                value: kwargs.value,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetSchemaRequestPath, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetSchemaRequiresAuth(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                value: kwargs.value,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetSchemaRequiresAuth, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetSchemaItemsPerPage(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                value: kwargs.value,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetSchemaItemsPerPage, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetSchemaComments(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                value: kwargs.value,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetSchemaComments, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestUpdateSchema(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                schema_name: kwargs.schemaName,
                service_id: kwargs.serviceId,
                schema_id: kwargs.schemaId,
                value: kwargs.value,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsUpdateSchema, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestAddContentSet(contentDir, serviceId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                request_path: kwargs.requestPath,
                requires_auth: kwargs.requiresAuth,
                comments: kwargs.comments,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsAddContentSet, {
            args: {
                content_dir: contentDir,
                service_id: serviceId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestListContentSets(serviceId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                include_enable_state: kwargs.includeEnableState,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsListContentSets, {
            args: {
                service_id: serviceId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetContentSet(requestPath, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                content_set_id: kwargs.contentSetId,
                service_id: kwargs.serviceId,
                auto_select_single: kwargs.autoSelectSingle,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsGetContentSet, {
            args: {
                request_path: requestPath,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestEnableContentSet(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                service_id: kwargs.serviceId,
                content_set_id: kwargs.contentSetId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsEnableContentSet, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDisableContentSet(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                service_id: kwargs.serviceId,
                content_set_id: kwargs.contentSetId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDisableContentSet, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteContentSet(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                service_id: kwargs.serviceId,
                content_set_id: kwargs.contentSetId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDeleteContentSet, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestAddDbObject(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_object_name: kwargs.dbObjectName,
                db_object_type: kwargs.dbObjectType,
                schema_id: kwargs.schemaId,
                schema_name: kwargs.schemaName,
                auto_add_schema: kwargs.autoAddSchema,
                request_path: kwargs.requestPath,
                crud_operations: kwargs.crudOperations,
                crud_operation_format: kwargs.crudOperationFormat,
                requires_auth: kwargs.requiresAuth,
                items_per_page: kwargs.itemsPerPage,
                row_user_ownership_enforced: kwargs.rowUserOwnershipEnforced,
                row_user_ownership_column: kwargs.rowUserOwnershipColumn,
                comments: kwargs.comments,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
                return_python_object: kwargs.returnPythonObject,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsAddDbObject, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestGetDbObject(requestPath, dbObjectName, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_object_id: kwargs.dbObjectId,
                schema_id: kwargs.schemaId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsGetDbObject, {
            args: {
                request_path: requestPath,
                db_object_name: dbObjectName,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestListDbObjects(schemaId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                include_enable_state: kwargs.includeEnableState,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsListDbObjects, {
            args: {
                schema_id: schemaId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetDbObjectRequestPath(dbObjectId, requestPath, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetDbObjectRequestPath, {
            args: {
                db_object_id: dbObjectId,
                request_path: requestPath,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestSetDbObjectCrudOperations(dbObjectId, crudOperations, crudOperationFormat, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsSetDbObjectCrudOperations, {
            args: {
                db_object_id: dbObjectId,
                crud_operations: crudOperations,
                crud_operation_format: crudOperationFormat,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestEnableDbObject(dbObjectName, schemaId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_object_id: kwargs.dbObjectId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsEnableDbObject, {
            args: {
                db_object_name: dbObjectName,
                schema_id: schemaId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestDisableDbObject(dbObjectName, schemaId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_object_id: kwargs.dbObjectId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDisableDbObject, {
            args: {
                db_object_name: dbObjectName,
                schema_id: schemaId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestDeleteDbObject(dbObjectName, schemaId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                db_object_id: kwargs.dbObjectId,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsDeleteDbObject, {
            args: {
                db_object_name: dbObjectName,
                schema_id: schemaId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestListContentFiles(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                content_set_id: kwargs.contentSetId,
                include_enable_state: kwargs.includeEnableState,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsListContentFiles, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestAddAuthenticationApp(appName, serviceId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                auth_vendor_id: kwargs.authVendorId,
                description: kwargs.description,
                url: kwargs.url,
                access_token: kwargs.accessToken,
                app_id: kwargs.appId,
                limit_to_registered_users: kwargs.limitToRegisteredUsers,
                registered_users: kwargs.registeredUsers,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsAddAuthenticationApp, {
            args: {
                app_name: appName,
                service_id: serviceId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestListAuthenticationApps(serviceId, kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                include_enable_state: kwargs.includeEnableState,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsListAuthenticationApps, {
            args: {
                service_id: serviceId,
            },
            kwargs: kwargsToUse,
        });
    }
    static getRequestInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsInfo, {
            args: {},
        });
    }
    static getRequestVersion() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsVersion, {
            args: {},
        });
    }
    static getRequestLs(path, moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsLs, {
            args: {
                path,
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestConfigure(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                enable_mrs: kwargs.enableMrs,
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsConfigure, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestStatus(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                module_session_id: kwargs.moduleSessionId,
                interactive: kwargs.interactive,
                raise_exceptions: kwargs.raiseExceptions,
                return_formatted: kwargs.returnFormatted,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIMrs.MrsStatus, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
}
exports.ProtocolMrs = ProtocolMrs;
//# sourceMappingURL=ProtocolMrs.js.map