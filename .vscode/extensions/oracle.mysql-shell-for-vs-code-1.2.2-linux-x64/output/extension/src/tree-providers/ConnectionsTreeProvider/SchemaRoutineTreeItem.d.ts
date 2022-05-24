import { Command } from "vscode";
import { IConnectionEntry } from ".";
import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
export declare class SchemaRoutineTreeItem extends ConnectionsTreeBaseItem {
    name: string;
    schema: string;
    type: "function" | "procedure";
    entry: IConnectionEntry;
    contextValue: string;
    constructor(name: string, schema: string, type: "function" | "procedure", entry: IConnectionEntry, hasChildren: boolean, command?: Command);
    get qualifiedName(): string;
    protected get iconName(): string;
    protected get dbType(): string;
    protected get createScriptResultIndex(): number;
}
