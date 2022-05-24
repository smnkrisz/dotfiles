import { ListenerEntry } from "../Dispatch";
import { ShellPromptResponseType } from "../../communication";
import { IShellInterface } from ".";
import { ShellInterfaceMds } from "./ShellInterfaceMds";
export declare class ShellInterfaceShellSession implements IShellInterface {
    readonly id = "shellSession";
    mds: ShellInterfaceMds;
    private moduleSessionLookupId;
    constructor(sessionId?: string);
    get hasSession(): boolean;
    startShellSession(id: string, dbConnectionId?: number): ListenerEntry;
    closeShellSession(): ListenerEntry;
    execute(command: string): ListenerEntry;
    sendReply(requestId: string, type: ShellPromptResponseType, reply: string): ListenerEntry;
    getCompletionItems(text: string, offset: number): ListenerEntry;
    private get moduleSessionId();
}
