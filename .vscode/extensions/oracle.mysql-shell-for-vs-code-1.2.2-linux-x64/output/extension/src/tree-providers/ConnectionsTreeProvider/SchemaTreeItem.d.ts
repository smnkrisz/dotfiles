import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
export declare class SchemaTreeItem extends ConnectionsTreeBaseItem {
    contextValue: string;
    get qualifiedName(): string;
    protected get iconName(): string;
    protected get dbType(): string;
}
