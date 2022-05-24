import { IMdsProfileData } from "../../../../frontend/src/communication";
import { OciBaseTreeItem } from "./OciBaseTreeItem";
export declare class OciConfigProfileTreeItem extends OciBaseTreeItem {
    contextValue: string;
    constructor(profile: IMdsProfileData);
}
