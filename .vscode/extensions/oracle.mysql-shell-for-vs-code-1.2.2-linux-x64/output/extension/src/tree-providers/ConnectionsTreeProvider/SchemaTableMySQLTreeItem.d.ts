import { SchemaTableTreeItem } from "./SchemaTableTreeItem";
export declare class SchemaTableMySQLTreeItem extends SchemaTableTreeItem {
    contextValue: string;
    get qualifiedName(): string;
    protected get iconName(): string;
    protected get dbType(): string;
}
