import { TreeDataProvider, TreeItem, ProviderResult, Event } from "vscode";
import { IConnectionDetails, ShellInterfaceSqlEditor } from "../../../../frontend/src/supplement/ShellInterface";
export interface IConnectionEntry {
    id: string;
    details: IConnectionDetails;
    backend?: ShellInterfaceSqlEditor;
    schemas?: string[];
}
export declare class ConnectionsTreeDataProvider implements TreeDataProvider<TreeItem> {
    private static nextId;
    connections: IConnectionEntry[];
    private changeEvent;
    private useDedicatedSchemaSubtree;
    get onDidChangeTreeData(): Event<TreeItem | undefined>;
    constructor();
    dispose(): void;
    refresh(item?: TreeItem): void;
    getTreeItem(element: TreeItem): TreeItem;
    getChildren(element?: TreeItem): ProviderResult<TreeItem[]>;
    closeAllConnections(): void;
    private updateConnections;
    private updateSchemaList;
    private doUpdateSchemaList;
    private openNewConnection;
    private loadSchemaMembers;
    private loadTableMembers;
    private listMrsServices;
    private listMrsSchemas;
    private listMrsDbObjects;
    private refreshConnections;
    private isShellPromptResult;
}
