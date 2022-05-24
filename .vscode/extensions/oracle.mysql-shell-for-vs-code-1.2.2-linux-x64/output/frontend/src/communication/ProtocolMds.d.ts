import { Protocol, IShellRequest, IShellDictionary } from ".";
export declare enum ShellAPIMds {
    MdsGetRegions = "mds.get.regions",
    MdsListConfigProfiles = "mds.list.config_profiles",
    MdsSetDefaultConfigProfile = "mds.set.default_config_profile",
    MdsGetDefaultConfigProfile = "mds.get.default_config_profile",
    MdsSetCurrentCompartment = "mds.set.current_compartment",
    MdsGetCurrentCompartmentId = "mds.get.current_compartment_id",
    MdsSetCurrentBastion = "mds.set.current_bastion",
    MdsGetAvailabilityDomain = "mds.get.availability_domain",
    MdsListCompartments = "mds.list.compartments",
    MdsGetCompartment = "mds.get.compartment",
    MdsListComputeInstances = "mds.list.compute_instances",
    MdsGetComputeInstance = "mds.get.compute_instance",
    MdsListComputeShapes = "mds.list.compute_shapes",
    MdsDeleteComputeInstance = "mds.delete.compute_instance",
    MdsUtilCreateMdsEndpoint = "mds.util.create_mds_endpoint",
    MdsGetDbSystemConfiguration = "mds.get.db_system_configuration",
    MdsListDbSystems = "mds.list.db_systems",
    MdsGetDbSystem = "mds.get.db_system",
    MdsGetDbSystemId = "mds.get.db_system_id",
    MdsUpdateDbSystem = "mds.update.db_system",
    MdsCreateDbSystem = "mds.create.db_system",
    MdsDeleteDbSystem = "mds.delete.db_system",
    MdsStopDbSystem = "mds.stop.db_system",
    MdsStartDbSystem = "mds.start.db_system",
    MdsRestartDbSystem = "mds.restart.db_system",
    MdsListLoadBalancers = "mds.list.load_balancers",
    MdsListBastions = "mds.list.bastions",
    MdsGetBastion = "mds.get.bastion",
    MdsCreateBastion = "mds.create.bastion",
    MdsDeleteBastion = "mds.delete.bastion",
    MdsListBastionSessions = "mds.list.bastion_sessions",
    MdsGetBastionSession = "mds.get.bastion_session",
    MdsCreateBastionSession = "mds.create.bastion_session",
    MdsDeleteBastionSession = "mds.delete.bastion_session"
}
export interface IShellListConfigProfilesKwargs {
    configFilePath?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellSetCurrentCompartmentKwargs {
    compartmentPath?: string;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    profileName?: string;
    cliRcFilePath?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellSetCurrentBastionKwargs {
    bastionName?: string;
    bastionId?: string;
    compartmentId?: string;
    config?: object;
    configProfile?: string;
    profileName?: string;
    cliRcFilePath?: string;
    raiseExceptions?: boolean;
    interactive?: boolean;
}
export interface IShellGetAvailabilityDomainKwargs {
    availabilityDomain?: string;
    randomSelection?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellListCompartmentsKwargs {
    compartmentId?: string;
    includeTenancy?: boolean;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellGetCompartmentKwargs {
    parentCompartmentId?: string;
    config?: object;
}
export interface IShellListComputeInstancesKwargs {
    compartmentId?: string;
    config?: object;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellGetComputeInstanceKwargs {
    instanceName?: string;
    instanceId?: string;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellListComputeShapesKwargs {
    limitShapesTo?: unknown[];
    availabilityDomain?: string;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellDeleteComputeInstanceKwargs {
    instanceName?: string;
    instanceId?: string;
    awaitDeletion?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    ignoreCurrent?: boolean;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellUtilCreateMdsEndpointKwargs {
    instanceName?: string;
    dbSystemName?: string;
    dbSystemId?: string;
    privateKeyFilePath?: string;
    compartmentId?: string;
    config?: object;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
}
export interface IShellGetDbSystemConfigurationKwargs {
    configName?: string;
    configurationId?: string;
    shape?: string;
    availabilityDomain?: string;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellListDbSystemsKwargs {
    compartmentId?: string;
    config?: object;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellGetDbSystemKwargs {
    dbSystemName?: string;
    dbSystemId?: string;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
    returnFormatted?: boolean;
    returnPythonObject?: boolean;
}
export interface IShellGetDbSystemIdKwargs {
    dbSystemName?: string;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: object;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellUpdateDbSystemKwargs {
    dbSystemName?: string;
    dbSystemId?: string;
    ignoreCurrent?: boolean;
    newName?: string;
    newDescription?: string;
    newFreeformTags?: string;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellCreateDbSystemKwargs {
    dbSystemName?: string;
    description?: string;
    availabilityDomain?: string;
    shape?: string;
    subnetId?: string;
    configurationId?: string;
    dataStorageSizeInGbs?: number;
    mysqlVersion?: string;
    adminUsername?: string;
    adminPassword?: string;
    privateKeyFilePath?: string;
    parUrl?: string;
    performCleanupAfterImport?: boolean;
    sourceMysqlUri?: string;
    sourceMysqlPassword?: string;
    sourceLocalDumpDir?: string;
    sourceBucket?: string;
    hostImageId?: string;
    definedTags?: IShellDictionary;
    freeformTags?: IShellDictionary;
    compartmentId?: string;
    config?: object;
    interactive?: boolean;
    returnObject?: boolean;
}
export interface IShellDeleteDbSystemKwargs {
    dbSystemName?: string;
    dbSystemId?: string;
    awaitCompletion?: boolean;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellStopDbSystemKwargs {
    dbSystemName?: string;
    dbSystemId?: string;
    awaitCompletion?: boolean;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellStartDbSystemKwargs {
    dbSystemName?: string;
    dbSystemId?: string;
    awaitCompletion?: boolean;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellRestartDbSystemKwargs {
    dbSystemName?: string;
    dbSystemId?: string;
    awaitCompletion?: boolean;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellListLoadBalancersKwargs {
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    returnType?: string;
    raiseExceptions?: boolean;
}
export interface IShellListBastionsKwargs {
    compartmentId?: string;
    validForDbSystemId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    returnType?: string;
    raiseExceptions?: boolean;
}
export interface IShellGetBastionKwargs {
    bastionName?: string;
    bastionId?: string;
    awaitState?: string;
    ignoreCurrent?: boolean;
    fallbackToAnyInCompartment?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    interactive?: boolean;
    returnType?: string;
    raiseExceptions?: boolean;
}
export interface IShellCreateBastionKwargs {
    bastionName?: string;
    dbSystemId?: string;
    clientCidr?: string;
    maxSessionTtlInSeconds?: number;
    targetSubnetId?: string;
    awaitActiveState?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    ignoreCurrent?: boolean;
    interactive?: boolean;
    returnType?: string;
    raiseExceptions?: boolean;
}
export interface IShellDeleteBastionKwargs {
    bastionName?: string;
    bastionId?: string;
    awaitDeletion?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    ignoreCurrent?: boolean;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export interface IShellListBastionSessionsKwargs {
    bastionId?: string;
    ignoreCurrent?: boolean;
    compartmentId?: string;
    config?: object;
    configProfile?: string;
    interactive?: boolean;
    returnType?: string;
    raiseExceptions?: boolean;
}
export interface IShellGetBastionSessionKwargs {
    sessionName?: string;
    sessionId?: string;
    bastionId?: string;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    ignoreCurrent?: boolean;
    interactive?: boolean;
    returnType?: string;
    raiseExceptions?: boolean;
}
export interface IShellCreateBastionSessionKwargs {
    bastionName?: string;
    bastionId?: string;
    fallbackToAnyInCompartment?: boolean;
    sessionType?: string;
    sessionName?: string;
    targetId?: string;
    targetIp?: string;
    targetPort?: string;
    targetUser?: string;
    ttlInSeconds?: number;
    publicKeyFile?: string;
    publicKeyContent?: string;
    awaitCreation?: boolean;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    ignoreCurrent?: boolean;
    interactive?: boolean;
    returnType?: string;
    raiseExceptions?: boolean;
}
export interface IShellDeleteBastionSessionKwargs {
    sessionName?: string;
    sessionId?: string;
    bastionName?: string;
    bastionId?: string;
    compartmentId?: string;
    config?: IShellDictionary;
    configProfile?: string;
    ignoreCurrent?: boolean;
    interactive?: boolean;
    raiseExceptions?: boolean;
}
export declare class ProtocolMds extends Protocol {
    static getRequestGetRegions(): IShellRequest;
    static getRequestListConfigProfiles(kwargs?: IShellListConfigProfilesKwargs): IShellRequest;
    static getRequestSetDefaultConfigProfile(profileName?: string, configFileLocation?: string, cliRcFileLocation?: string): IShellRequest;
    static getRequestGetDefaultConfigProfile(cliRcFileLocation?: string): IShellRequest;
    static getRequestSetCurrentCompartment(kwargs?: IShellSetCurrentCompartmentKwargs): IShellRequest;
    static getRequestGetCurrentCompartmentId(compartmentId?: string, config?: IShellDictionary, profileName?: string, cliRcFilePath?: string): IShellRequest;
    static getRequestSetCurrentBastion(kwargs?: IShellSetCurrentBastionKwargs): IShellRequest;
    static getRequestGetAvailabilityDomain(kwargs?: IShellGetAvailabilityDomainKwargs): IShellRequest;
    static getRequestListCompartments(kwargs?: IShellListCompartmentsKwargs): IShellRequest;
    static getRequestGetCompartment(compartmentPath?: string, kwargs?: IShellGetCompartmentKwargs): IShellRequest;
    static getRequestListComputeInstances(kwargs?: IShellListComputeInstancesKwargs): IShellRequest;
    static getRequestGetComputeInstance(kwargs?: IShellGetComputeInstanceKwargs): IShellRequest;
    static getRequestListComputeShapes(kwargs?: IShellListComputeShapesKwargs): IShellRequest;
    static getRequestDeleteComputeInstance(kwargs?: IShellDeleteComputeInstanceKwargs): IShellRequest;
    static getRequestUtilCreateMdsEndpoint(kwargs?: IShellUtilCreateMdsEndpointKwargs): IShellRequest;
    static getRequestGetDbSystemConfiguration(kwargs?: IShellGetDbSystemConfigurationKwargs): IShellRequest;
    static getRequestListDbSystems(kwargs?: IShellListDbSystemsKwargs): IShellRequest;
    static getRequestGetDbSystem(kwargs?: IShellGetDbSystemKwargs): IShellRequest;
    static getRequestGetDbSystemId(kwargs?: IShellGetDbSystemIdKwargs): IShellRequest;
    static getRequestUpdateDbSystem(kwargs?: IShellUpdateDbSystemKwargs): IShellRequest;
    static getRequestCreateDbSystem(kwargs?: IShellCreateDbSystemKwargs): IShellRequest;
    static getRequestDeleteDbSystem(kwargs?: IShellDeleteDbSystemKwargs): IShellRequest;
    static getRequestStopDbSystem(kwargs?: IShellStopDbSystemKwargs): IShellRequest;
    static getRequestStartDbSystem(kwargs?: IShellStartDbSystemKwargs): IShellRequest;
    static getRequestRestartDbSystem(kwargs?: IShellRestartDbSystemKwargs): IShellRequest;
    static getRequestListLoadBalancers(kwargs?: IShellListLoadBalancersKwargs): IShellRequest;
    static getRequestListBastions(kwargs?: IShellListBastionsKwargs): IShellRequest;
    static getRequestGetBastion(kwargs?: IShellGetBastionKwargs): IShellRequest;
    static getRequestCreateBastion(kwargs?: IShellCreateBastionKwargs): IShellRequest;
    static getRequestDeleteBastion(kwargs?: IShellDeleteBastionKwargs): IShellRequest;
    static getRequestListBastionSessions(kwargs?: IShellListBastionSessionsKwargs): IShellRequest;
    static getRequestGetBastionSession(kwargs?: IShellGetBastionSessionKwargs): IShellRequest;
    static getRequestCreateBastionSession(kwargs?: IShellCreateBastionSessionKwargs): IShellRequest;
    static getRequestDeleteBastionSession(kwargs?: IShellDeleteBastionSessionKwargs): IShellRequest;
}
