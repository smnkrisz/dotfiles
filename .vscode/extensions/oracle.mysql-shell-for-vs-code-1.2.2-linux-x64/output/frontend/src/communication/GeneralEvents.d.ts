import { IDispatchEvent } from "../supplement/Dispatch";
import { IShellDictionary, IShellRequest } from ".";
export interface IResponseDictionary {
    [key: string]: unknown;
}
export interface IRequestState {
    type: string;
    msg: string;
}
export interface IGenericResponse extends IResponseDictionary {
    requestId?: string;
    requestState: IRequestState;
}
export interface ICommShellProfile {
    id: number;
    userId: number;
    name: string;
    description: string;
    options: IShellDictionary;
}
export interface IWebSessionData extends IGenericResponse {
    sessionUuid?: string;
    localUserMode: boolean;
    activeProfile: ICommShellProfile;
}
export interface IAuthenticationData extends IGenericResponse {
    activeProfile: ICommShellProfile;
}
export interface IStartSessionData extends IGenericResponse {
    moduleSessionId: string;
}
export interface IOpenDBConnectionData extends IGenericResponse {
    currentSchema?: string;
    sqlMode?: string;
    info: {
        version?: string;
        edition?: string;
    };
}
export interface IOpenMdsConnectionData extends IGenericResponse {
    result: {
        prompt: string;
    };
}
export declare type IOpenConnectionData = IOpenDBConnectionData | IOpenMdsConnectionData;
export interface IAddConnectionData extends IGenericResponse {
    result: {
        dbConnectionId: number;
    };
}
export declare type IResultSetStateData = IGenericResponse;
export interface IResultSetData extends IGenericResponse {
    executionTime?: number;
    rows?: unknown[];
    columns?: Array<{
        name: string;
        type: string;
        length: number;
    }>;
    totalRowCount?: number;
}
export interface IProfileListData extends IGenericResponse {
    rows?: Array<{
        id: number;
        name: string;
    }>;
}
export interface IProfileData extends IGenericResponse {
    result: ICommShellProfile;
}
export interface IDbTypesData extends IGenericResponse {
    dbType: string[];
}
export interface IDebuggerScriptListData extends IGenericResponse {
    scripts: string[];
}
export interface IScriptContentData extends IGenericResponse {
    script: string;
}
export interface ISimpleResultData extends IGenericResponse {
    result: number | string | string[];
}
export interface IShellPromptValues {
    promptDescriptor?: {
        host?: string;
        port?: number;
        schema?: string;
        isProduction?: boolean;
        ssl?: string;
        socket?: string;
        session?: string;
        mode?: string;
    };
}
export interface IShellDocumentWarning {
    level: "Note" | "Warning" | "Error";
    code: "string";
    message: string;
}
export interface IShellResultData extends IShellPromptValues {
    hasData: boolean;
    affectedRowCount?: number;
    executionTime: string;
    affectedItemsCount: number;
    warningCount: number;
    warningsCount: number;
    warnings: IShellDocumentWarning[];
    info: string;
    autoIncrementValue: number;
}
export interface IShellDocumentData extends IShellResultData {
    documents: unknown[];
}
export interface IShellColumnMetadataEntry {
    Name: string;
    OrgName: string;
    Catalog: string;
    Database: string;
    Table: string;
    OrgTable: string;
    Type: string;
    DbType: string;
    Collation: string;
    Length: number;
    Decimals: number;
    Flags: string;
}
export interface IShellColumnsMetaData {
    [key: string]: IShellColumnMetadataEntry;
}
export interface IShellRowData extends IShellResultData {
    rows: unknown[];
}
export interface IShellSimpleResult extends IShellPromptValues {
    info?: string;
    error?: string | {
        message: string;
        type: string;
    };
    warning?: string;
    note?: string;
    status?: string;
}
export interface IShellValueResult extends IShellPromptValues {
    value: string | number;
}
export interface IShellObjectResult extends IShellPromptValues {
    class: string;
    name: string;
}
export interface IShellFeedbackRequest {
    prompt?: string;
    password?: string;
}
export declare type IShellResultType = IShellFeedbackRequest | IShellObjectResult | IShellObjectResult[] | IShellValueResult | IShellSimpleResult | IShellDocumentData | IShellRowData | IShellColumnsMetaData;
export interface IShellResponse extends IGenericResponse {
    result?: IShellResultType;
}
export interface IShellModuleDataCategoriesEntry {
    id: number;
    name: string;
    parentCategoryId?: number;
}
export interface IShellModuleDataCategoriesData extends IResponseDictionary {
    result: IShellModuleDataCategoriesEntry[];
}
export interface IShellModuleAddData extends IResponseDictionary {
    result: number;
}
export interface IShellModuleDataEntry {
    id: number;
    dataCategoryId: number;
    caption: string;
}
export interface IShellModuleData extends IResponseDictionary {
    result: IShellModuleDataEntry[];
}
export interface IShellModuleDataContentData extends IResponseDictionary {
    result: string;
}
export interface IShellCompletionData extends IGenericResponse {
    result: {
        offset: number;
        options: string[];
    };
}
export interface IMdsProfileData {
    fingerprint: string;
    keyFile: string;
    profile: string;
    region: string;
    tenancy: string;
    user: string;
    isCurrent: boolean;
}
export interface IMdsBastionData {
    id: string;
}
export interface IShellMdsProfileData extends IGenericResponse {
    result: IMdsProfileData[];
}
export interface IShellMdsBastionsData extends IGenericResponse {
    result: IMdsBastionData[];
}
export interface IShellBackendInformation extends IGenericResponse {
    info: {
        architecture: string;
        major: string;
        minor: string;
        patch: string;
        platform: string;
        serverDistribution: string;
        serverMajor: string;
        serverMinor: string;
        serverPatch: string;
    };
}
export interface ICompartmentTags {
    [key: string]: unknown;
}
export interface IMrsServiceData {
    enabled: number;
    hostCtx: string;
    id: number;
    isDefault: number;
    urlContextRoot: string;
    urlHostName: string;
    urlProtocol: string;
    comments: string;
}
export interface IMrsServiceResultData extends IResponseDictionary {
    result: IMrsServiceData[];
}
export interface IMrsSchemaData {
    comments: string;
    enabled: number;
    hostCtx: string;
    id: number;
    itemsPerPage: number;
    name: string;
    requestPath: string;
    requiresAuth: number;
    serviceId: number;
}
export interface IMrsSchemaResultData extends IResponseDictionary {
    result: IMrsSchemaData[];
}
export interface IMrsDbObjectData {
    changedAt?: string;
    comments: string;
    crudOperations: string[];
    dbSchemaId: number;
    enabled: boolean;
    hostCtx?: string;
    id: number;
    itemsPerPage?: number;
    name: string;
    objectType: string;
    requestPath: string;
    requiresAuth: boolean;
    rowOwnershipColumn?: string;
    rowOwnershipEnforced: boolean;
    rowOwnershipParameter?: string;
    schemaRequestPath?: string;
}
export interface IMrsDbObjectResultData extends IResponseDictionary {
    result: IMrsDbObjectData[];
}
export interface IModuleListData extends IGenericResponse {
    result: string[];
}
export interface IModuleAddDataCategory extends IGenericResponse {
    result: number;
}
export interface IDBDataTreeEntry {
    id: number;
    caption: string;
    parentFolderId: number;
}
export interface IDBDataTreeIdentifier {
    treeIdentifier: string;
}
export interface IDBDataTreeIdentifiers extends IResponseDictionary {
    result: IDBDataTreeIdentifier[];
}
export interface IDBDataTreeContent extends IResponseDictionary {
    result: IDBDataTreeEntry[];
}
export interface IObjectNamesData extends IGenericResponse {
    result?: string[];
}
export interface IErrorData extends IGenericResponse {
    msg: string;
}
export declare type ICommSimpleResultEvent = IDispatchEvent<ISimpleResultData>;
export declare type ICommWebSessionEvent = IDispatchEvent<IWebSessionData>;
export declare type ICommAuthenticationEvent = IDispatchEvent<IAuthenticationData>;
export declare type ICommStartSessionEvent = IDispatchEvent<IStartSessionData>;
export declare type ICommCloseSessionEvent = IDispatchEvent<IGenericResponse>;
export declare type ICommAddConnectionEvent = IDispatchEvent<IAddConnectionData>;
export declare type ICommOpenConnectionEvent = IDispatchEvent<IOpenConnectionData>;
export declare type ICommResultSetStateEvent = IDispatchEvent<IResultSetStateData>;
export declare type ICommResultSetEvent = IDispatchEvent<IResultSetData>;
export declare type ICommListProfilesEvent = IDispatchEvent<IProfileListData>;
export declare type ICommProfileEvent = IDispatchEvent<IProfileData>;
export declare type ICommDbTypesEvent = IDispatchEvent<IDbTypesData>;
export declare type ICommDebuggerScriptsEvent = IDispatchEvent<IDebuggerScriptListData>;
export declare type ICommScriptContentEvent = IDispatchEvent<IScriptContentData>;
export declare type ICommObjectNamesEvent = IDispatchEvent<IObjectNamesData>;
export declare type ICommListDataCategoriesEvent = IDispatchEvent<IShellModuleDataCategoriesData>;
export declare type ICommModuleAddDataEvent = IDispatchEvent<IShellModuleAddData>;
export declare type ICommModuleDataEvent = IDispatchEvent<IShellModuleData>;
export declare type ICommModuleDataContentEvent = IDispatchEvent<IShellModuleDataContentData>;
export declare type ICommProfileTreeIdentifiersEvent = IDispatchEvent<IDBDataTreeIdentifiers>;
export declare type ICommDataTreeContentEvent = IDispatchEvent<IDBDataTreeContent>;
export declare type ICommShellEvent = IDispatchEvent<IShellResponse>;
export declare type ICommShellCompletionEvent = IDispatchEvent<IShellCompletionData>;
export declare type ICommShellInformationEvent = IDispatchEvent<IShellBackendInformation>;
export declare type ICommMdsConfigProfileEvent = IDispatchEvent<IShellMdsProfileData>;
export declare type ICommMdsGetBastionsEvent = IDispatchEvent<IShellMdsBastionsData>;
export declare type ICommMrsServiceEvent = IDispatchEvent<IMrsServiceResultData>;
export declare type ICommMrsSchemaEvent = IDispatchEvent<IMrsSchemaResultData>;
export declare type ICommMrsDbObjectEvent = IDispatchEvent<IMrsDbObjectResultData>;
export declare type ICommModuleListEvent = IDispatchEvent<IModuleListData>;
export declare type ICommModuleAddDataCategoryEvent = IDispatchEvent<IModuleAddDataCategory>;
export declare type ICommErrorEvent = IDispatchEvent<IErrorData>;
export declare class CommunicationEvents {
    static generateWebSessionEvent(data: IWebSessionData): IDispatchEvent<IWebSessionData>;
    static generateResponseEvent(messageClass: string, data: IGenericResponse): IDispatchEvent;
    static generateRequestEvent(data: IShellRequest): IDispatchEvent;
}
