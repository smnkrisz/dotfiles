import { SchemaItemGroupType } from "./SchemaIndex";
import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class SchemaGroupTreeItem extends ConnectionsTreeBaseItem {
    contextValue: string;
    constructor(schema: string, entry: IConnectionEntry, type: SchemaItemGroupType);
    protected get iconName(): string;
}
