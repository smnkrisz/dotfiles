import React from "react";
import { EditorLanguage, IExecutionContext, IRunQueryRequest, IRunScriptRequest, ISqlPageRequest } from ".";
import { IDialogRequest, IDialogResponse, IDictionary, IServicePasswordRequest, IStatusbarInfo } from "../app-logic/Types";
import { IEmbeddedMessage, IEmbeddedSourceType, IMySQLDbSystem, IShellPromptValues } from "../communication";
import { IThemeChangeData } from "../components/Theming/ThemeManager";
import { IEditorStatusInfo, IModuleDataEntry, ISchemaTreeEntry } from "../modules/SQLNotebook";
import { IConnectionDetails, IShellSessionDetails } from "./ShellInterface";
export declare const appParameters: AppParameters;
declare class AppParameters extends Map<string, string> {
    embedded?: boolean;
    inExtension?: boolean;
    inDevelopment?: boolean;
    testsRunning?: boolean;
}
declare type SimpleCallback = (_: undefined) => Promise<boolean>;
export interface IOpenDialogFilters {
    [key: string]: string[];
}
export interface IOpenDialogOptions {
    default?: string;
    openLabel?: string;
    canSelectFiles?: boolean;
    canSelectFolders?: boolean;
    canSelectMany?: boolean;
    filters?: IOpenDialogFilters;
    title?: string;
}
export interface IRequestTypeMap {
    "applicationDidStart": SimpleCallback;
    "applicationWillFinish": SimpleCallback;
    "updateStatusbar": (items: IStatusbarInfo[]) => Promise<boolean>;
    "profileLoaded": SimpleCallback;
    "changeProfile": (id: string | number) => Promise<boolean>;
    "statusBarButtonClick": (values: {
        type: string;
        event: React.SyntheticEvent;
    }) => Promise<boolean>;
    "editorInfoUpdated": (info: IEditorStatusInfo) => Promise<boolean>;
    "themeChanged": (data: IThemeChangeData) => Promise<boolean>;
    "openConnectionTab": (data: {
        details: IConnectionDetails;
        force: boolean;
    }) => Promise<boolean>;
    "selectFile": (path: string[]) => Promise<boolean>;
    "showOpenDialog": (options: IOpenDialogOptions) => Promise<boolean>;
    "editorExecuteSelectedOrAll": (startNewBlock: boolean) => Promise<boolean>;
    "editorExecuteCurrent": (startNewBlock: boolean) => Promise<boolean>;
    "editorFind": SimpleCallback;
    "editorFormat": SimpleCallback;
    "editorToggleSoftWrap": (active: boolean) => Promise<boolean>;
    "editorRunCommand": (details: {
        command: string;
        context: IExecutionContext;
    }) => Promise<boolean>;
    "editorToggleStopExecutionOnError": (active: boolean) => Promise<boolean>;
    "editorStopExecution": SimpleCallback;
    "editorToggleAutoCommit": (active: boolean) => Promise<boolean>;
    "editorExecuteExplain": SimpleCallback;
    "editorCommit": SimpleCallback;
    "editorRollback": SimpleCallback;
    "editorShowConnections": SimpleCallback;
    "editorInsertUserScript": (data: {
        language: EditorLanguage;
        resourceId: number;
    }) => Promise<boolean>;
    "sqlShowDataAtPage": (data: ISqlPageRequest) => Promise<boolean>;
    "editorRunQuery": (details: IRunQueryRequest) => Promise<boolean>;
    "editorRunScript": (details: IRunScriptRequest) => Promise<boolean>;
    "editorValidationDone": (id: string) => Promise<boolean>;
    "sqlSetCurrentSchema": (data: {
        id: string;
        connectionId: number;
        schema: string;
    }) => Promise<boolean>;
    "sqlTransactionChanged": SimpleCallback;
    "sqlTransactionEnded": SimpleCallback;
    "moduleToggle": (id: string) => Promise<boolean>;
    "sessionAdded": (session: IShellSessionDetails) => Promise<boolean>;
    "sessionRemoved": (session: IShellSessionDetails) => Promise<boolean>;
    "openSession": (session: IShellSessionDetails) => Promise<boolean>;
    "removeSession": (session: IShellSessionDetails) => Promise<boolean>;
    "newSession": (session: IShellSessionDetails) => Promise<boolean>;
    "addNewConnection": (details: {
        mdsData?: IMySQLDbSystem;
        profileName?: String;
    }) => Promise<boolean>;
    "removeConnection": (connectionId: number) => Promise<boolean>;
    "editConnection": (connectionId: number) => Promise<boolean>;
    "duplicateConnection": (connectionId: number) => Promise<boolean>;
    "explorerShowRows": (entry: ISchemaTreeEntry | IModuleDataEntry) => Promise<boolean>;
    "explorerDoubleClick": (entry: ISchemaTreeEntry) => Promise<boolean>;
    "requestPassword": (request: IServicePasswordRequest) => Promise<boolean>;
    "acceptPassword": (result: {
        request: IServicePasswordRequest;
        password: string;
    }) => Promise<boolean>;
    "cancelPassword": (request: IServicePasswordRequest) => Promise<boolean>;
    "showAbout": SimpleCallback;
    "showThemeEditor": SimpleCallback;
    "showPreferences": SimpleCallback;
    "showModule": (module: string) => Promise<boolean>;
    "showPage": (data: {
        module: string;
        page: string;
    }) => Promise<boolean>;
    "showPageSection": (section: string) => Promise<boolean>;
    "showDialog": (request: IDialogRequest) => Promise<boolean>;
    "dialogResponse": (response: IDialogResponse) => Promise<boolean>;
    "settingsChanged": (entry?: {
        key: string;
        value: unknown;
    }) => Promise<boolean>;
    "updateShellPrompt": (values: IShellPromptValues) => Promise<boolean>;
    "refreshOciTree": SimpleCallback;
    "refreshConnections": (data?: IDictionary) => Promise<boolean>;
    "selectConnectionTab": (page: string) => Promise<boolean>;
    "codeBlocksUpdate": (data: {
        linkId: number;
        code: string;
    }) => Promise<boolean>;
    "showError": (values: string[]) => Promise<boolean>;
    "connectedToUrl": (url?: URL) => Promise<boolean>;
    "refreshSessions": (sessions: IShellSessionDetails[]) => Promise<boolean>;
    "dbFileDropped": (fileName: string) => Promise<boolean>;
    "hostThemeChange": (data: {
        css: string;
        themeClass: string;
    }) => Promise<boolean>;
    "job": (job: Array<IRequestListEntry<keyof IRequestTypeMap>>) => Promise<boolean>;
    "message": (message: string) => Promise<boolean>;
    "testButtonClick": SimpleCallback;
}
interface IRemoteTarget {
    postMessage: (data: IEmbeddedMessage, origin: string) => void;
}
export declare type IRequisitionCallbackValues<K extends keyof IRequestTypeMap> = Parameters<IRequestTypeMap[K]>[0];
export interface IRequestListEntry<K extends keyof IRequestTypeMap> {
    requestType: K;
    parameter: IRequisitionCallbackValues<K>;
}
export declare class RequisitionHub {
    private registry;
    private remoteTarget?;
    private source;
    private requestPipeline;
    constructor(source?: IEmbeddedSourceType, target?: IRemoteTarget);
    static get instance(): RequisitionHub;
    register: <K extends keyof IRequestTypeMap>(requestType: K, callback: IRequestTypeMap[K]) => void;
    unregister: <K extends keyof IRequestTypeMap>(requestType?: K | undefined, callback?: IRequestTypeMap[K] | undefined) => void;
    registrations: <K extends keyof IRequestTypeMap>(requestType: K) => number;
    execute: <K extends keyof IRequestTypeMap>(requestType: K, parameter: IRequisitionCallbackValues<K>) => Promise<boolean>;
    executeRemote: <K extends keyof IRequestTypeMap>(requestType: K, parameter: IRequisitionCallbackValues<K>) => void;
    handleRemoteMessage(message: IEmbeddedMessage): void;
    writeToClipboard(text: string): void;
}
export declare const requisitions: RequisitionHub;
export {};
