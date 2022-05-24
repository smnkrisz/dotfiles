import { IShellRequest } from ".";
import { IDispatchEventContext, ListenerEntry } from "../supplement/Dispatch";
export declare enum ConnectionEventType {
    Open = 1,
    Close = 2,
    Error = 3,
    Message = 4
}
export declare class ClientConnection {
    protected debugging: boolean;
    protected loadedScripts: Map<string, string>;
    private connectionEstablished;
    private autoReconnecting;
    private disconnecting;
    private reconnectTimer;
    private socket?;
    get isConnected(): boolean;
    set scripts(map: Map<string, string>);
    connect(url: URL, shellConfigDir: string): Promise<void>;
    disconnect(): void;
    sendRequest(request: IShellRequest, context: IDispatchEventContext): ListenerEntry;
    clearState(): void;
    private onOpen;
    private onClose;
    private onMessage;
    private onError;
}
export declare const currentConnection: ClientConnection;
