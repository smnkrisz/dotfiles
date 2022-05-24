import { IBackendInformation, IShellInterface } from ".";
export declare class ShellInterfaceCore implements IShellInterface {
    readonly id = "core";
    get backendInformation(): Promise<IBackendInformation>;
    getLogLevel(): Promise<string>;
    setLogLevel(level: string): Promise<void>;
    getDbTypes(): Promise<string[]>;
    validatePath(path: string): Promise<boolean>;
    createDatabaseFile(path: string): Promise<void>;
}
