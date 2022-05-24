import { Command, TreeItem } from "vscode";
import { IShellSessionDetails } from "../../../../frontend/src/supplement/ShellInterface";
export declare class ShellConsoleSessionTreeItem extends TreeItem {
    details: IShellSessionDetails;
    contextValue: string;
    constructor(details: IShellSessionDetails, command?: Command);
}
