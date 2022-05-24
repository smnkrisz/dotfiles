import { IDictionary } from "../app-logic/Types";
export * from "./Protocol";
export * from "./ProtocolGui";
export * from "./ProtocolMds";
export * from "./ProtocolMrs";
export * from "./ClientConnection";
export * from "./GeneralEvents";
export * from "./OciEvents";
export * from "./Oci";
export declare type IEmbeddedSourceType = "app" | "host";
export interface IEmbeddedMessage {
    source: IEmbeddedSourceType;
    command: string;
    data?: IDictionary;
}
