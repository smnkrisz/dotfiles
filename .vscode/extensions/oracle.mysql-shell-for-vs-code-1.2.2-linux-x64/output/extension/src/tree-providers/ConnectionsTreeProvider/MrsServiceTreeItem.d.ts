import { IMrsServiceData } from "../../../../frontend/src/communication/GeneralEvents";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
import { MrsTreeBaseItem } from "./MrsTreeBaseItem";
export declare class MrsServiceTreeItem extends MrsTreeBaseItem {
    value: IMrsServiceData;
    contextValue: string;
    constructor(label: string, value: IMrsServiceData, details: IConnectionEntry);
}
