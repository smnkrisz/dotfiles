import { TreeItem } from "vscode";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class ConnectionTreeItem extends TreeItem {
    entry: IConnectionEntry;
    contextValue: string;
    constructor(entry: IConnectionEntry);
}
