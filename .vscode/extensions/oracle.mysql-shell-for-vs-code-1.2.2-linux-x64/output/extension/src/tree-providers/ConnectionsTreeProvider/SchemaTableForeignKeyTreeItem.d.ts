import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class SchemaTableForeignKeyTreeItem extends ConnectionsTreeBaseItem {
    schema: string;
    table: string;
    contextValue: string;
    constructor(name: string, schema: string, table: string, entry: IConnectionEntry);
    protected get iconName(): string;
}
