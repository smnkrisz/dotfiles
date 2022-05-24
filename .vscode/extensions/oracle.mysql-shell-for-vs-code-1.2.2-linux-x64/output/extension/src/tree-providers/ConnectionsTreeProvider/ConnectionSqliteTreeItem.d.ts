import { IConnectionEntry } from "./ConnectionsTreeProvider";
import { ConnectionTreeItem } from "./ConnectionTreeItem";
export declare class ConnectionSqliteTreeItem extends ConnectionTreeItem {
    entry: IConnectionEntry;
    contextValue: string;
    constructor(entry: IConnectionEntry);
}
