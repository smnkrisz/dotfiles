import { ConnectionsTreeBaseItem } from "./ConnectionsTreeBaseItem";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
export declare class SchemaTableIndexTreeItem extends ConnectionsTreeBaseItem {
    schema: string;
    table: string;
    contextValue: string;
    constructor(name: string, schema: string, table: string, entry: IConnectionEntry);
    get qualifiedName(): string;
    protected get iconName(): string;
    protected get dbType(): string;
}
