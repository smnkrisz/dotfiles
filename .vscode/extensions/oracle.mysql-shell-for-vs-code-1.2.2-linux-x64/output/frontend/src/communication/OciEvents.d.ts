import { IAuthenticationDetails, IComputeInstance, IGenericResponse } from ".";
import { IBastionSession, IBastionSummary, IBastion, ICompartment, IMySQLDbSystem, ILoadBalancer } from "./Oci";
import { IDispatchEvent } from "../supplement/Dispatch";
import { IResponseDictionary } from "./GeneralEvents";
export interface IOciComputeInstanceData extends IResponseDictionary {
    result: IComputeInstance[];
}
export interface IOciBastionSessionData extends IGenericResponse {
    result: IBastionSession;
}
export interface IOciBastionSummaryData extends IGenericResponse {
    result: IBastionSummary;
}
export interface IOciBastionsListData extends IGenericResponse {
    result: IBastionSummary[];
}
export interface IOciBastionData extends IGenericResponse {
    result: IBastion;
}
export interface IOciMySQLDbSystemData extends IGenericResponse {
    result: IMySQLDbSystem;
}
export interface IOciMySQLDbSystemListData extends IGenericResponse {
    result: IMySQLDbSystem[];
}
export interface IOciCompartmentData extends IGenericResponse {
    result: ICompartment[];
}
export interface IOciAuthenticationDetailData extends IGenericResponse {
    result: IAuthenticationDetails[];
}
export interface IOciLoadBalancersListData extends IGenericResponse {
    result: ILoadBalancer[];
}
export declare type ICommOciComputeInstanceEvent = IDispatchEvent<IOciComputeInstanceData>;
export declare type ICommOciSessionResultEvent = IDispatchEvent<IOciBastionSessionData>;
export declare type ICommOciBastionSummaryEvent = IDispatchEvent<IOciBastionSummaryData>;
export declare type ICommOciBastionsEvent = IDispatchEvent<IOciBastionsListData>;
export declare type ICommOciBastionEvent = IDispatchEvent<IOciBastionData>;
export declare type ICommOciMySQLDbSystemEvent = IDispatchEvent<IOciMySQLDbSystemData>;
export declare type ICommOciMySQLDbSystemListEvent = IDispatchEvent<IOciMySQLDbSystemListData>;
export declare type ICommOciCompartmentEvent = IDispatchEvent<IOciCompartmentData>;
export declare type ICommOciAuthenticationDetailsEvent = IDispatchEvent<IOciAuthenticationDetailData>;
export declare type ICommOciLoadBalancersEvent = IDispatchEvent<IOciLoadBalancersListData>;
