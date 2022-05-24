import { IMrsSchemaData } from "../../../../frontend/src/communication/GeneralEvents";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
import { MrsTreeBaseItem } from "./MrsTreeBaseItem";
export declare class MrsSchemaTreeItem extends MrsTreeBaseItem {
    value: IMrsSchemaData;
    contextValue: string;
    constructor(label: string, value: IMrsSchemaData, entry: IConnectionEntry);
}
