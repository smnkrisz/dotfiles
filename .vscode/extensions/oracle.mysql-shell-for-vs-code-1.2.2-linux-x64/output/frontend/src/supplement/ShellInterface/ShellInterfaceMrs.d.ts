import { ListenerEntry } from "../Dispatch";
export declare class ShellInterfaceMrs {
    moduleSessionLookupId: string;
    listServices(): ListenerEntry;
    addService(urlContextRoot: string, urlProtocol: string, urlHostName: string, isDefault?: boolean, comments?: string, enabled?: boolean): ListenerEntry;
    updateService(serviceId: number, urlContextRoot: string, urlHostName: string): ListenerEntry;
    deleteService(serviceId?: number): ListenerEntry;
    setDefaultService(serviceId: number): ListenerEntry;
    listSchemas(serviceId: number): ListenerEntry;
    deleteSchema(schemaId: number, serviceId: number): ListenerEntry;
    addSchema(schemaName: string, requestPath: string, requiresAuth: boolean, serviceId?: number, itemsPerPage?: number, comments?: string): ListenerEntry;
    updateSchema(schemaId: number, schemaName: string, requestPath: string, requiresAuth: boolean, serviceId?: number, value?: string, interactive?: boolean, raiseExceptions?: boolean): ListenerEntry;
    addDbObject(dbObjectName: string, dbObjectType: string, schemaName: string, autoAddSchema: boolean, requestPath: string, crudOperations: string[], crudOperationFormat: string, requiresAuth: boolean, rowUserOwnershipEnforced: boolean, rowUserOwnershipColumn?: string, schemaId?: number, itemsPerPage?: number, comments?: string): ListenerEntry;
    listDbObjects(schemaId: number): ListenerEntry;
    private get moduleSessionId();
}
