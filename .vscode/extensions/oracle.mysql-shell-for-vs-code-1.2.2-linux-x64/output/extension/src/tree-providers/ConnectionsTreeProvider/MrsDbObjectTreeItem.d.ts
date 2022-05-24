import { IMrsDbObjectData } from "../../../../frontend/src/communication/GeneralEvents";
import { IConnectionEntry } from "./ConnectionsTreeProvider";
import { MrsTreeBaseItem } from "./MrsTreeBaseItem";
export declare class MrsDbObjectTreeItem extends MrsTreeBaseItem {
    value: IMrsDbObjectData;
    contextValue: string;
    constructor(label: string, value: IMrsDbObjectData, details: IConnectionEntry);
    protected get iconName(): string;
}
