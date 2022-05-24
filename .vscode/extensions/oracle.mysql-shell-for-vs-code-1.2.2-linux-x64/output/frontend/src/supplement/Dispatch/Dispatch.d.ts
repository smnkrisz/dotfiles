import { IDictionary } from "../../app-logic/Types";
import { ListenerEntry } from "./ListenerEntry";
export declare enum EventType {
    Request = -1,
    ErrorResponse = -2,
    StartResponse = 1,
    DataResponse = 2,
    FinalResponse = 3,
    Notification = 4,
    Unknown = 0
}
export interface IDispatchEventContext {
    messageClass: string;
    data?: unknown;
}
export interface IDispatchEvent<T extends IDictionary = {
    [key: string]: unknown;
}> {
    id: string;
    eventType: EventType;
    message: string;
    context: IDispatchEventContext;
    data: T;
}
export declare class Dispatcher {
    private listeners;
    private messageContext;
    protected constructor();
    mapMessageContext(requestId: string, context: IDispatchEventContext): void;
    listen(listener: ListenerEntry): void;
    remove(id: number): void;
    triggerNotification(messageClass: string): void;
    triggerEvent(event: IDispatchEvent, debugging?: boolean): void;
}
declare class DispatcherSingleton extends Dispatcher {
    constructor();
}
export declare const dispatcher: DispatcherSingleton;
export {};
