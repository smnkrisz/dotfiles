import { SchemaItemGroupType } from "./SchemaIndex";
import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class TableGroupTreeItem extends ConnectionsTreeBaseItem {
    table: string;
    contextValue: string;
    constructor(schema: string, table: string, entry: IConnectionEntry, type: SchemaItemGroupType);
    protected get iconName(): string;
}
