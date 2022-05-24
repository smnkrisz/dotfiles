import { IDispatchEvent } from "./Dispatch";
export declare type ListenerCallback = (event: any) => any;
export declare type ListenerEventSource = IDispatchEvent | Error | undefined;
declare enum CallbackType {
    Then = 1,
    Catch = 2,
    Finally = 3
}
interface ICallbackCapsule {
    callback: ListenerCallback;
    callbackType: CallbackType;
    errorContext: Error;
}
export interface IListenerThenable {
    then: (callback: ListenerCallback, errorContext?: Error) => IListenerThenable;
    catch: (callback: ListenerCallback, errorContext?: Error) => IListenerThenable;
    finally: (callback: ListenerCallback, errorContext?: Error) => IListenerThenable;
}
export declare class ListenerExecutor implements IListenerThenable {
    private callbackChain;
    private errorContext;
    constructor(callbackChain: ICallbackCapsule[], errorContext?: Error);
    then(callback: ListenerCallback, errorContext?: Error): IListenerThenable;
    catch(callback: ListenerCallback, errorContext?: Error): IListenerThenable;
    finally(callback: ListenerCallback, errorContext?: Error): IListenerThenable;
    execute: (source: ListenerEventSource) => boolean;
    private findFirstCallbackIndex;
    private callBackTypesForSource;
    private triggerHeadCallback;
    private clone;
}
export {};
