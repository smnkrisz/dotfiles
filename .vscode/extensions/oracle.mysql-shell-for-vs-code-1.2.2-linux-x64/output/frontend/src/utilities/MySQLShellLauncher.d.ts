import * as child_process from "child_process";
export declare type ShellOutputCallback = (output: string) => void;
export declare type ShellErrorCallback = (error: Error) => void;
export declare type ShellExitCallback = (code: number) => void;
export declare type LogLevel = "NONE" | "ERROR" | "WARNING" | "INFO" | "DEBUG" | "DEBUG2" | "DEBUG3";
export interface IShellLaunchDetails {
    port: number;
    singleUserToken: string;
}
export interface IShellLaunchConfiguration {
    rootPath: string;
    parameters: string[];
    processInput?: string;
    logLevel: LogLevel;
    onStdOutData: ShellOutputCallback;
    onStdErrData?: ShellOutputCallback;
    onError?: ShellErrorCallback;
    onExit?: ShellExitCallback;
}
export declare class MySQLShellLauncher {
    private onOutput;
    private onError;
    private onExit?;
    static readonly extensionShellUserConfigFolderBaseName = "mysqlsh-gui";
    private shellProcess;
    private launchDetails;
    constructor(onOutput: ShellOutputCallback, onError: ShellErrorCallback, onExit?: ShellExitCallback | undefined);
    static getShellUserConfigDir: (rootPath: string) => string;
    static runMysqlShell: (config: IShellLaunchConfiguration) => child_process.ChildProcess;
    private static getShellPath;
    private static findFreePort;
    exitProcess(): Promise<void>;
    startShellAndConnect: (rootPath: string, secure: boolean, logLevel?: LogLevel, target?: string | undefined) => void;
}
