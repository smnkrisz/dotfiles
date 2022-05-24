import { TreeItem } from "vscode";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class MrsTreeBaseItem extends TreeItem {
    entry: IConnectionEntry;
    constructor(label: string, entry: IConnectionEntry, hasChildren: boolean, iconName?: string);
    protected get iconName(): string;
}
