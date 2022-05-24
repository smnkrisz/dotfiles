import { Command, TreeItem } from "vscode";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class ConnectionsTreeBaseItem extends TreeItem {
    name: string;
    schema: string;
    entry: IConnectionEntry;
    constructor(name: string, schema: string, entry: IConnectionEntry, hasChildren: boolean, command?: Command);
    copyNameToClipboard(): void;
    copyCreateScriptToClipboard(): void;
    dropItem(): void;
    get qualifiedName(): string;
    protected get iconName(): string;
    protected get dbType(): string;
    protected get createScriptResultIndex(): number;
}
