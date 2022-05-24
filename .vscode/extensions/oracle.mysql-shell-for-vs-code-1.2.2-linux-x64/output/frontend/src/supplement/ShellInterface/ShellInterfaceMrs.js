"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceMrs = void 0;
const communication_1 = require("../../communication");
const WebSession_1 = require("../WebSession");
class ShellInterfaceMrs {
    constructor() {
        this.moduleSessionLookupId = "";
    }
    listServices() {
        const request = communication_1.ProtocolMrs.getRequestListServices({ moduleSessionId: this.moduleSessionId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsListServices" });
    }
    addService(urlContextRoot, urlProtocol, urlHostName, isDefault, comments, enabled) {
        const request = communication_1.ProtocolMrs.getRequestAddService(urlContextRoot, urlHostName, enabled, {
            moduleSessionId: this.moduleSessionId,
            urlProtocol,
            isDefault,
            comments,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsAddService" });
    }
    updateService(serviceId, urlContextRoot, urlHostName) {
        const request = communication_1.ProtocolMrs.getRequestUpdateService({
            moduleSessionId: this.moduleSessionId,
            serviceId,
            urlContextRoot,
            urlHostName,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsUpdateService" });
    }
    deleteService(serviceId) {
        const request = communication_1.ProtocolMrs.getRequestDeleteService({ moduleSessionId: this.moduleSessionId, serviceId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsDeleteService" });
    }
    setDefaultService(serviceId) {
        const request = communication_1.ProtocolMrs.getRequestSetServiceDefault({
            moduleSessionId: this.moduleSessionId,
            serviceId,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsSetDefaultService" });
    }
    listSchemas(serviceId) {
        const request = communication_1.ProtocolMrs.getRequestListSchemas({ serviceId, moduleSessionId: this.moduleSessionId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsListSchemas" });
    }
    deleteSchema(schemaId, serviceId) {
        const request = communication_1.ProtocolMrs.getRequestDeleteSchema({
            moduleSessionId: this.moduleSessionId,
            schemaId,
            serviceId,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsDeleteSchema" });
    }
    addSchema(schemaName, requestPath, requiresAuth, serviceId, itemsPerPage, comments) {
        const request = communication_1.ProtocolMrs.getRequestAddSchema({
            moduleSessionId: this.moduleSessionId,
            schemaName,
            requestPath,
            requiresAuth,
            serviceId,
            itemsPerPage,
            comments,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsAddSchema" });
    }
    updateSchema(schemaId, schemaName, requestPath, requiresAuth, serviceId, value, interactive, raiseExceptions) {
        const request = communication_1.ProtocolMrs.getRequestUpdateSchema({
            moduleSessionId: this.moduleSessionId,
            schemaId,
            schemaName,
            serviceId,
            value,
            interactive,
            raiseExceptions,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsUpdateSchema" });
    }
    addDbObject(dbObjectName, dbObjectType, schemaName, autoAddSchema, requestPath, crudOperations, crudOperationFormat, requiresAuth, rowUserOwnershipEnforced, rowUserOwnershipColumn, schemaId, itemsPerPage, comments) {
        const request = communication_1.ProtocolMrs.getRequestAddDbObject({
            moduleSessionId: this.moduleSessionId,
            dbObjectName,
            dbObjectType,
            schemaId,
            schemaName,
            autoAddSchema,
            requestPath,
            crudOperations,
            crudOperationFormat,
            requiresAuth,
            itemsPerPage,
            rowUserOwnershipEnforced,
            rowUserOwnershipColumn,
            comments,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsAddService" });
    }
    listDbObjects(schemaId) {
        const request = communication_1.ProtocolMrs.getRequestListDbObjects(schemaId, { moduleSessionId: this.moduleSessionId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "mrsListDbObjects" });
    }
    get moduleSessionId() {
        return WebSession_1.webSession.moduleSessionId(this.moduleSessionLookupId);
    }
}
exports.ShellInterfaceMrs = ShellInterfaceMrs;
//# sourceMappingURL=ShellInterfaceMrs.js.map