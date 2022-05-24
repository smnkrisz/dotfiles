import { IBastionSummary, ICompartment, IMdsProfileData } from "../../../../frontend/src/communication";
import { OciBaseTreeItem } from "./OciBaseTreeItem";
export declare class OciBastionTreeItem extends OciBaseTreeItem {
    compartment: ICompartment;
    bastion: IBastionSummary;
    contextValue: string;
    constructor(profile: IMdsProfileData, compartment: ICompartment, bastion: IBastionSummary);
}
