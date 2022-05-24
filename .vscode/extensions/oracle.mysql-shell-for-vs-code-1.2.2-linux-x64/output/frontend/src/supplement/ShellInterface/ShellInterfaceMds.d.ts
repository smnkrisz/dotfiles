import { ListenerEntry } from "../Dispatch";
import { IShellSetCurrentCompartmentKwargs, IShellSetCurrentBastionKwargs } from "../../communication";
export declare class ShellInterfaceMds {
    getMdsConfigProfiles(configFilePath?: string): ListenerEntry;
    setDefaultConfigProfile(profile: string): ListenerEntry;
    getMdsCompartments(configProfile: string, compartmentId?: string): ListenerEntry;
    getMdsMySQLDbSystems(configProfile: string, compartmentId: string): ListenerEntry;
    getMdsMySQLDbSystem(configProfile: string, dbSystemId: string): ListenerEntry;
    getMdsComputeInstances(configProfile: string, compartmentId: string): ListenerEntry;
    getMdsBastions(configProfile: string, compartmentId: string, validForDbSystemId?: string): ListenerEntry;
    getMdsBastion(configProfile: string, bastionId: string): ListenerEntry;
    createBastion(configProfile: string, dbSystemId: string, awaitActiveState?: boolean): ListenerEntry;
    createBastionSession(configProfile: string, targetId: string, sessionType: string, compartmentId: string, awaitCreation: boolean): ListenerEntry;
    listLoadBalancers(configProfile: string, compartmentId: string): ListenerEntry;
    setCurrentCompartment(parameters?: IShellSetCurrentCompartmentKwargs): ListenerEntry;
    setCurrentBastion(parameters?: IShellSetCurrentBastionKwargs): ListenerEntry;
}
