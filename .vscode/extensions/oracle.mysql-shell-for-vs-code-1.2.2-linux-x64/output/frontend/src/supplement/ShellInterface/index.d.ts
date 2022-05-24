import { IMySQLConnectionOptions } from "../../communication/MySQL";
import { ISqliteConnectionOptions } from "../../communication/Sqlite";
export * from "./ShellInterface";
export * from "./ShellInterfaceCore";
export * from "./ShellInterfaceDb";
export * from "./ShellInterfaceDbConnection";
export * from "./ShellInterfaceModule";
export * from "./ShellInterfaceShellSession";
export * from "./ShellInterfaceSqlEditor";
export * from "./ShellInterfaceUser";
export * from "./ShellInterfaceMds";
export * from "./ShellInterfaceMrs";
export declare enum DBType {
    MySQL = "MySQL",
    Sqlite = "Sqlite"
}
export declare enum SSLUsage {
    Disable = "Disable",
    IfAvailable = "If Available",
    Require = "Require",
    RequireAndVerifyCA = "Require and Verify CA",
    RequireAndVerifyIdentity = "Require and Verify Identity"
}
export declare type IConnectionOptions = IMySQLConnectionOptions | ISqliteConnectionOptions | {};
export interface IConnectionDetails {
    id: number;
    dbType: DBType;
    folderPath: string;
    caption: string;
    description: string;
    options: IConnectionOptions;
    useSSH: boolean;
    useMDS: boolean;
    version?: number;
    sqlMode?: string;
    hideSystemSchemas?: boolean;
}
export interface IShellSessionDetails {
    sessionId: number;
    caption?: string;
    description?: string;
    version?: number;
    sqlMode?: string;
    dbConnectionId?: number;
}
export interface IShellInterface {
    id: string;
}
export interface IBackendInformation {
    architecture: string;
    major: number;
    minor: number;
    patch: number;
    platform: string;
    serverDistribution: string;
    serverMajor: number;
    serverMinor: number;
    serverPatch: number;
}
