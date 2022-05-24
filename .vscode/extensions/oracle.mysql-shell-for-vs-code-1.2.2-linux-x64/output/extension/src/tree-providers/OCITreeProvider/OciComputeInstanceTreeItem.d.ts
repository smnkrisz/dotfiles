import { ICompartment, IComputeInstance, IMdsProfileData } from "../../../../frontend/src/communication";
import { ShellInterfaceShellSession } from "../../../../frontend/src/supplement/ShellInterface";
import { OciBaseTreeItem } from "./OciBaseTreeItem";
export declare class OciComputeInstanceTreeItem extends OciBaseTreeItem {
    compartment: ICompartment;
    compute: IComputeInstance;
    shellSession: ShellInterfaceShellSession;
    contextValue: string;
    constructor(profile: IMdsProfileData, compartment: ICompartment, compute: IComputeInstance, shellSession: ShellInterfaceShellSession);
    protected get iconName(): string;
}
