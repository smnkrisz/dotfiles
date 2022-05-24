import { Protocol, IShellRequest } from ".";
export declare enum ShellAPIMrs {
    MrsAddService = "mrs.add.service",
    MrsGetService = "mrs.get.service",
    MrsListServices = "mrs.list.services",
    MrsEnableService = "mrs.enable.service",
    MrsDisableService = "mrs.disable.service",
    MrsDeleteService = "mrs.delete.service",
    MrsSetServiceDefault = "mrs.set.service.default",
    MrsSetServiceContextPath = "mrs.set.service.context_path",
    MrsSetServiceProtocol = "mrs.set.service.protocol",
    MrsSetServiceComments = "mrs.set.service.comments",
    MrsUpdateService = "mrs.update.service",
    MrsAddSchema = "mrs.add.schema",
    MrsGetSchema = "mrs.get.schema",
    MrsListSchemas = "mrs.list.schemas",
    MrsEnableSchema = "mrs.enable.schema",
    MrsDisableSchema = "mrs.disable.schema",
    MrsDeleteSchema = "mrs.delete.schema",
    MrsSetSchemaName = "mrs.set.schema.name",
    MrsSetSchemaRequestPath = "mrs.set.schema.request_path",
    MrsSetSchemaRequiresAuth = "mrs.set.schema.requires_auth",
    MrsSetSchemaItemsPerPage = "mrs.set.schema.items_per_page",
    MrsSetSchemaComments = "mrs.set.schema.comments",
    MrsUpdateSchema = "mrs.update.schema",
    MrsAddContentSet = "mrs.add.content_set",
    MrsListContentSets = "mrs.list.content_sets",
    MrsGetContentSet = "mrs.get.content_set",
    MrsEnableContentSet = "mrs.enable.content_set",
    MrsDisableContentSet = "mrs.disable.content_set",
    MrsDeleteContentSet = "mrs.delete.content_set",
    MrsAddDbObject = "mrs.add.db_object",
    MrsGetDbObject = "mrs.get.db_object",
    MrsListDbObjects = "mrs.list.db_objects",
    MrsSetDbObjectRequestPath = "mrs.set.db_object.request_path",
    MrsSetDbObjectCrudOperations = "mrs.set.db_object.crud_operations",
    MrsEnableDbObject = "mrs.enable.db_object",
    MrsDisableDbObject = "mrs.disable.db_object",
    MrsDeleteDbObject = "mrs.delete.db_object",
    MrsListContentFiles = "mrs.list.content_files",
    MrsAddAuthenticationApp = "mrs.add.authentication_app",
    MrsListAuthenticationApps = "mrs.list.authentication_apps",
    MrsInfo = "mrs.info",
    MrsVersion = "mrs.version",
    MrsLs = "mrs.ls",
    MrsConfigure = "mrs.configure",
    MrsStatus = "mrs.status"
}
export interface IShellAddServiceKwargs {
    urlProtocol?: string;
    isDefault?: boolean;
    comments?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellGetServiceKwargs {
    getDefault?: boolean;
    autoSelectSingle?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellListServicesKwargs {
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellEnableServiceKwargs {
    urlContextRoot?: string;
    urlHostName?: string;
    serviceId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellDisableServiceKwargs {
    urlContextRoot?: string;
    urlHostName?: string;
    serviceId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellDeleteServiceKwargs {
    urlContextRoot?: string;
    urlHostName?: string;
    serviceId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetServiceDefaultKwargs {
    urlContextRoot?: string;
    urlHostName?: string;
    serviceId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetServiceContextPathKwargs {
    urlContextRoot?: string;
    urlHostName?: string;
    value?: string;
    serviceId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetServiceProtocolKwargs {
    urlContextRoot?: string;
    urlHostName?: string;
    value?: string;
    serviceId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetServiceCommentsKwargs {
    urlContextRoot?: string;
    urlHostName?: string;
    value?: string;
    serviceId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellUpdateServiceKwargs {
    serviceId?: number;
    urlContextRoot?: string;
    urlHostName?: string;
    value?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellAddSchemaKwargs {
    schemaName?: string;
    serviceId?: number;
    requestPath?: string;
    requiresAuth?: boolean;
    enabled?: boolean;
    itemsPerPage?: number;
    comments?: string;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellGetSchemaKwargs {
    requestPath?: string;
    schemaName?: string;
    schemaId?: number;
    serviceId?: number;
    autoSelectSingle?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellListSchemasKwargs {
    serviceId?: number;
    includeEnableState?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellEnableSchemaKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellDisableSchemaKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellDeleteSchemaKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetSchemaNameKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    value?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetSchemaRequestPathKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    value?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetSchemaRequiresAuthKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    value?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetSchemaItemsPerPageKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    value?: number;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetSchemaCommentsKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    value?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellUpdateSchemaKwargs {
    schemaName?: string;
    serviceId?: number;
    schemaId?: number;
    value?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellAddContentSetKwargs {
    requestPath?: string;
    requiresAuth?: boolean;
    comments?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellListContentSetsKwargs {
    includeEnableState?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellGetContentSetKwargs {
    contentSetId?: number;
    serviceId?: number;
    autoSelectSingle?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellEnableContentSetKwargs {
    serviceId?: number;
    contentSetId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellDisableContentSetKwargs {
    serviceId?: number;
    contentSetId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellDeleteContentSetKwargs {
    serviceId?: number;
    contentSetId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellAddDbObjectKwargs {
    dbObjectName?: string;
    dbObjectType?: string;
    schemaId?: number;
    schemaName?: string;
    autoAddSchema?: boolean;
    requestPath?: string;
    crudOperations?: unknown[];
    crudOperationFormat?: string;
    requiresAuth?: boolean;
    itemsPerPage?: number;
    rowUserOwnershipEnforced?: boolean;
    rowUserOwnershipColumn?: string;
    comments?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellGetDbObjectKwargs {
    dbObjectId?: number;
    schemaId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellListDbObjectsKwargs {
    includeEnableState?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellSetDbObjectRequestPathKwargs {
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellSetDbObjectCrudOperationsKwargs {
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellEnableDbObjectKwargs {
    dbObjectId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellDisableDbObjectKwargs {
    dbObjectId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellDeleteDbObjectKwargs {
    dbObjectId?: number;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellListContentFilesKwargs {
    contentSetId?: number;
    includeEnableState?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellAddAuthenticationAppKwargs {
    authVendorId?: string;
    description?: string;
    url?: string;
    accessToken?: string;
    appId?: string;
    limitToRegisteredUsers?: boolean;
    registeredUsers?: string;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellListAuthenticationAppsKwargs {
    includeEnableState?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellConfigureKwargs {
    enableMrs?: boolean;
    moduleSessionId?: string;
    interactive?: boolean;
}
export interface IShellStatusKwargs {
    moduleSessionId?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export declare class ProtocolMrs extends Protocol {
    static getRequestAddService(urlContextRoot?: string, urlHostName?: string, enabled?: boolean, kwargs?: IShellAddServiceKwargs): IShellRequest;
    static getRequestGetService(urlContextRoot?: string, urlHostName?: string, serviceId?: number, kwargs?: IShellGetServiceKwargs): IShellRequest;
    static getRequestListServices(kwargs?: IShellListServicesKwargs): IShellRequest;
    static getRequestEnableService(kwargs?: IShellEnableServiceKwargs): IShellRequest;
    static getRequestDisableService(kwargs?: IShellDisableServiceKwargs): IShellRequest;
    static getRequestDeleteService(kwargs?: IShellDeleteServiceKwargs): IShellRequest;
    static getRequestSetServiceDefault(kwargs?: IShellSetServiceDefaultKwargs): IShellRequest;
    static getRequestSetServiceContextPath(kwargs?: IShellSetServiceContextPathKwargs): IShellRequest;
    static getRequestSetServiceProtocol(kwargs?: IShellSetServiceProtocolKwargs): IShellRequest;
    static getRequestSetServiceComments(kwargs?: IShellSetServiceCommentsKwargs): IShellRequest;
    static getRequestUpdateService(kwargs?: IShellUpdateServiceKwargs): IShellRequest;
    static getRequestAddSchema(kwargs?: IShellAddSchemaKwargs): IShellRequest;
    static getRequestGetSchema(kwargs?: IShellGetSchemaKwargs): IShellRequest;
    static getRequestListSchemas(kwargs?: IShellListSchemasKwargs): IShellRequest;
    static getRequestEnableSchema(kwargs?: IShellEnableSchemaKwargs): IShellRequest;
    static getRequestDisableSchema(kwargs?: IShellDisableSchemaKwargs): IShellRequest;
    static getRequestDeleteSchema(kwargs?: IShellDeleteSchemaKwargs): IShellRequest;
    static getRequestSetSchemaName(kwargs?: IShellSetSchemaNameKwargs): IShellRequest;
    static getRequestSetSchemaRequestPath(kwargs?: IShellSetSchemaRequestPathKwargs): IShellRequest;
    static getRequestSetSchemaRequiresAuth(kwargs?: IShellSetSchemaRequiresAuthKwargs): IShellRequest;
    static getRequestSetSchemaItemsPerPage(kwargs?: IShellSetSchemaItemsPerPageKwargs): IShellRequest;
    static getRequestSetSchemaComments(kwargs?: IShellSetSchemaCommentsKwargs): IShellRequest;
    static getRequestUpdateSchema(kwargs?: IShellUpdateSchemaKwargs): IShellRequest;
    static getRequestAddContentSet(contentDir?: string, serviceId?: number, kwargs?: IShellAddContentSetKwargs): IShellRequest;
    static getRequestListContentSets(serviceId?: number, kwargs?: IShellListContentSetsKwargs): IShellRequest;
    static getRequestGetContentSet(requestPath?: string, kwargs?: IShellGetContentSetKwargs): IShellRequest;
    static getRequestEnableContentSet(kwargs?: IShellEnableContentSetKwargs): IShellRequest;
    static getRequestDisableContentSet(kwargs?: IShellDisableContentSetKwargs): IShellRequest;
    static getRequestDeleteContentSet(kwargs?: IShellDeleteContentSetKwargs): IShellRequest;
    static getRequestAddDbObject(kwargs?: IShellAddDbObjectKwargs): IShellRequest;
    static getRequestGetDbObject(requestPath?: string, dbObjectName?: string, kwargs?: IShellGetDbObjectKwargs): IShellRequest;
    static getRequestListDbObjects(schemaId: number, kwargs?: IShellListDbObjectsKwargs): IShellRequest;
    static getRequestSetDbObjectRequestPath(dbObjectId?: number, requestPath?: string, kwargs?: IShellSetDbObjectRequestPathKwargs): IShellRequest;
    static getRequestSetDbObjectCrudOperations(dbObjectId?: number, crudOperations?: unknown[], crudOperationFormat?: string, kwargs?: IShellSetDbObjectCrudOperationsKwargs): IShellRequest;
    static getRequestEnableDbObject(dbObjectName?: string, schemaId?: number, kwargs?: IShellEnableDbObjectKwargs): IShellRequest;
    static getRequestDisableDbObject(dbObjectName?: string, schemaId?: number, kwargs?: IShellDisableDbObjectKwargs): IShellRequest;
    static getRequestDeleteDbObject(dbObjectName?: string, schemaId?: number, kwargs?: IShellDeleteDbObjectKwargs): IShellRequest;
    static getRequestListContentFiles(kwargs?: IShellListContentFilesKwargs): IShellRequest;
    static getRequestAddAuthenticationApp(appName?: string, serviceId?: number, kwargs?: IShellAddAuthenticationAppKwargs): IShellRequest;
    static getRequestListAuthenticationApps(serviceId?: number, kwargs?: IShellListAuthenticationAppsKwargs): IShellRequest;
    static getRequestInfo(): IShellRequest;
    static getRequestVersion(): IShellRequest;
    static getRequestLs(path?: string, moduleSessionId?: string): IShellRequest;
    static getRequestConfigure(kwargs?: IShellConfigureKwargs): IShellRequest;
    static getRequestStatus(kwargs?: IShellStatusKwargs): IShellRequest;
}
