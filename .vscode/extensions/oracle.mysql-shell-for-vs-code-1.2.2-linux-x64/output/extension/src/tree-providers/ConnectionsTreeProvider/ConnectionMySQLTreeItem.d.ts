import { IConnectionEntry } from "./ConnectionsTreeProvider";
import { ConnectionTreeItem } from "./ConnectionTreeItem";
export declare class ConnectionMySQLTreeItem extends ConnectionTreeItem {
    entry: IConnectionEntry;
    contextValue: string;
    constructor(entry: IConnectionEntry);
}
