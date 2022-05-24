import { Command, TreeItem } from "vscode";
import { IModuleDataEntry } from "../../../frontend/src/modules/SQLNotebook";
export declare class ScriptTreeItem extends TreeItem {
    entry: IModuleDataEntry;
    contextValue: string;
    constructor(entry: IModuleDataEntry, command?: Command);
}
