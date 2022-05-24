import { ListenerEntry } from "../Dispatch";
import { ShellPromptResponseType } from "../../communication";
import { ShellInterfaceDb, ShellInterfaceMds, ShellInterfaceMrs } from ".";
export declare class ShellInterfaceSqlEditor extends ShellInterfaceDb {
    mds: ShellInterfaceMds;
    mrs: ShellInterfaceMrs;
    get id(): string;
    get hasSession(): boolean;
    startSession(id: string): Promise<void>;
    closeSession(): Promise<void>;
    getGuiModuleDisplayInfo(): ListenerEntry;
    isGuiModuleBackend(): ListenerEntry;
    openConnection(dbConnectionId: number): ListenerEntry;
    execute(sql: string, params?: string[]): ListenerEntry;
    reconnect(): ListenerEntry;
    killQuery(): ListenerEntry;
    setAutoCommit(value: boolean): Promise<void>;
    getAutoCommit(): Promise<boolean>;
    getCurrentSchema(): Promise<string>;
    setCurrentSchema(schema: string): Promise<void>;
    sendReply(requestId: string, type: ShellPromptResponseType, reply: string): ListenerEntry;
}
