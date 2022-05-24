import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
export declare class SchemaEventTreeItem extends ConnectionsTreeBaseItem {
    contextValue: string;
    get qualifiedName(): string;
    protected get iconName(): string;
    protected get dbType(): string;
}
