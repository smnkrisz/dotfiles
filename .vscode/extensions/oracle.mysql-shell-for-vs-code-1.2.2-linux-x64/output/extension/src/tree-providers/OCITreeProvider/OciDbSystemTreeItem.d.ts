import { IMdsProfileData, ICompartment, IMySQLDbSystem } from "../../../../frontend/src/communication";
import { OciBaseTreeItem } from "./OciBaseTreeItem";
export declare class OciDbSystemTreeItem extends OciBaseTreeItem {
    compartment: ICompartment;
    dbSystem: IMySQLDbSystem;
    contextValue: string;
    constructor(profile: IMdsProfileData, compartment: ICompartment, dbSystem: IMySQLDbSystem);
}
