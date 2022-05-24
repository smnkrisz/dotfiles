import { IDispatchEvent, ListenerExecutor, IListenerThenable, ListenerCallback, ListenerEventSource } from ".";
export declare type EventFilter = (event: IDispatchEvent) => boolean;
export declare const eventFilterNoRequests: (event: IDispatchEvent) => boolean;
export interface IListenerEntryOptions {
    persistent?: boolean;
    filters?: EventFilter[];
}
export declare class ListenerEntry implements IListenerThenable {
    private static nextListenerId;
    id: number;
    persistent: boolean;
    filters: EventFilter[];
    source?: ListenerEventSource;
    private hasSource;
    private errorContext;
    private executors;
    constructor(options: IListenerEntryOptions, errorContext?: Error);
    static create(options: IListenerEntryOptions, errorContext?: Error): ListenerEntry;
    static createByID(requestId: string, options?: IListenerEntryOptions): ListenerEntry;
    static createByClass(messageClass: string, options?: IListenerEntryOptions): ListenerEntry;
    static all(entries: ListenerEntry[]): ListenerEntry;
    static resolve(source?: ListenerEventSource): ListenerEntry;
    filterEvent(event: IDispatchEvent): unknown;
    trigger(source?: ListenerEventSource): ListenerEntry;
    then(callback: ListenerCallback): IListenerThenable;
    catch(callback: ListenerCallback): IListenerThenable;
    finally(callback: ListenerCallback): IListenerThenable;
    addExecutor(executor: ListenerExecutor): ListenerExecutor;
    private removeExecutors;
}
