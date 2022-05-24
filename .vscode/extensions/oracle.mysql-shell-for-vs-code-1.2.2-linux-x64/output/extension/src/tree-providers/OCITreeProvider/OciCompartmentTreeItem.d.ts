import { TreeItemCollapsibleState } from "vscode";
import { ICompartment, IMdsProfileData } from "../../../../frontend/src/communication";
import { OciBaseTreeItem } from "./OciBaseTreeItem";
export declare class OciCompartmentTreeItem extends OciBaseTreeItem {
    compartment: ICompartment;
    contextValue: string;
    constructor(profile: IMdsProfileData, compartment: ICompartment, collapsibleState?: TreeItemCollapsibleState);
}
