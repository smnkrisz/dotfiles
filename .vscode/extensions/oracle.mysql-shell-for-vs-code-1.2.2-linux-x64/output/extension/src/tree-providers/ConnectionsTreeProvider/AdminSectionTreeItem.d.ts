import { Command } from "vscode";
import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class AdminSectionTreeItem extends ConnectionsTreeBaseItem {
    name: string;
    schema: string;
    entry: IConnectionEntry;
    contextValue: string;
    constructor(name: string, schema: string, entry: IConnectionEntry, hasChildren: boolean, iconName: string, command?: Command);
}
