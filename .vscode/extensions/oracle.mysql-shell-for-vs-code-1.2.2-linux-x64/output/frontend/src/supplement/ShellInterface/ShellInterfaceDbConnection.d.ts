import { ListenerEntry } from "../Dispatch";
import { IConnectionDetails, IShellInterface } from ".";
export declare class ShellInterfaceDbConnection implements IShellInterface {
    readonly id = "dbConnection";
    addDbConnection(profileId: number, connection: IConnectionDetails, folderPath: string): ListenerEntry;
    updateDbConnection(profileId: number, connection: IConnectionDetails): ListenerEntry;
    removeDbConnection(profileId: number, connectionId: number): ListenerEntry;
    listDbConnections(profileId: number, folderPath: string): ListenerEntry;
    getDbConnection(connectionId: number): ListenerEntry;
}
