import { IDictionary } from "../../app-logic/Types";
import { EventType, IDispatchEvent } from "./Dispatch";
export declare class DispatchEvents {
    static baseEvent<T extends IDictionary>(eventType: EventType, data: T, id?: string, messageClass?: string): IDispatchEvent<T>;
    static classEvent<T extends IDictionary>(data: T, messageClass?: string): IDispatchEvent<T>;
    static okEvent<T extends IDictionary>(data: T, messageClass?: string, id?: string): IDispatchEvent<T>;
    static errorEvent<T extends IDictionary = {}>(data: T, message: string, messageClass?: string, id?: string): IDispatchEvent<T>;
    static okErrorEvent<T extends IDictionary = {}>(data: T, errorMessage: string, messageClass?: string, id?: string): IDispatchEvent<T>;
    static notification(messageClass: string, message?: string): IDispatchEvent;
}
