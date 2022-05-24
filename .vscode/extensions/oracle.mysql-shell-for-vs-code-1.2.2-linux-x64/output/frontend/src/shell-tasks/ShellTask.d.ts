export declare type ShellTaskStatusType = "pending" | "running" | "done" | "error";
export declare type PromptCallback = (text: string, isPassword: boolean) => Promise<string | undefined>;
export declare type StatusCallback = (status: ShellTaskStatusType) => void;
export declare type MessageCallback = (message: string) => void;
export declare class ShellTask {
    readonly caption: string;
    private promptCallback;
    private messageCallback;
    private shellSession;
    private currentStatus;
    private statusCallback?;
    private shellResult;
    constructor(caption: string, promptCallback: PromptCallback, messageCallback: MessageCallback);
    get status(): ShellTaskStatusType;
    static getCurrentTimeStamp(): string;
    setStatusCallback(callback: StatusCallback): void;
    runTask(shellArgs: string[], dbConnectionId?: number): Promise<unknown>;
    private setStatus;
    private sendMessage;
    private isShellPromptResult;
}
