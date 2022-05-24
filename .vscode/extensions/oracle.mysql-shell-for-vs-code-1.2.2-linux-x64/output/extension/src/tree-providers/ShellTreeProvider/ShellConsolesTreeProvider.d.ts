import { TreeDataProvider, TreeItem, ProviderResult, Event } from "vscode";
import { IShellSessionDetails } from "../../../../frontend/src/supplement/ShellInterface";
export declare class ShellConsolesTreeDataProvider implements TreeDataProvider<TreeItem> {
    private changeEvent;
    private sessions;
    constructor();
    dispose(): void;
    get onDidChangeTreeData(): Event<void>;
    refresh(sessions: IShellSessionDetails[]): void;
    getTreeItem(element: TreeItem): TreeItem;
    getChildren(element?: TreeItem): ProviderResult<TreeItem[]>;
    private refreshSessions;
}
