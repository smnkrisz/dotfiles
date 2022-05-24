import { IShellInterface } from ".";
import { ICommShellProfile } from "../../communication";
import { ListenerEntry } from "../Dispatch";
export declare class ShellInterfaceUser implements IShellInterface {
    readonly id = "user";
    authenticate(username: string, password: string): ListenerEntry;
    createUser(user: string, password: string, role: string): ListenerEntry;
    getDefaultProfile(userId: number): ListenerEntry;
    getGuiModuleList(userId: number): ListenerEntry;
    getProfile(profileId: number): ListenerEntry;
    updateProfile(profile: ICommShellProfile): ListenerEntry;
    addProfile(profile: ICommShellProfile): ListenerEntry;
    grantRole(username: string, role: string): ListenerEntry;
    listProfiles(userId: number): ListenerEntry;
    listRolePrivileges(role: string): ListenerEntry;
    listRoles(): ListenerEntry;
    listUserPrivileges(username: string): ListenerEntry;
    listUserRoles(username: string): ListenerEntry;
    listUsers(): ListenerEntry;
    setDefaultProfile(userId: number, profileId: number): ListenerEntry;
    setCurrentProfile(profileId: number): ListenerEntry;
    storePassword(url: string, password: string): ListenerEntry;
    clearPassword(url: string): ListenerEntry;
    listCredentials(): ListenerEntry;
}
