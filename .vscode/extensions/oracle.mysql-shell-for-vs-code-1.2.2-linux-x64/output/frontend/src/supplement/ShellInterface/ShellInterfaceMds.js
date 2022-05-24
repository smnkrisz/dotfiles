"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceMds = void 0;
const communication_1 = require("../../communication");
class ShellInterfaceMds {
    getMdsConfigProfiles(configFilePath) {
        const request = communication_1.ProtocolMds.getRequestListConfigProfiles({ configFilePath });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsConfigProfiles" });
    }
    setDefaultConfigProfile(profile) {
        const request = communication_1.ProtocolMds.getRequestSetDefaultConfigProfile(profile);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "setMdsDefaultConfigProfile" });
    }
    getMdsCompartments(configProfile, compartmentId) {
        const request = communication_1.ProtocolMds.getRequestListCompartments({ configProfile, compartmentId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsCompartments" });
    }
    getMdsMySQLDbSystems(configProfile, compartmentId) {
        const request = communication_1.ProtocolMds.getRequestListDbSystems({ configProfile, compartmentId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsMySQLDbSystems" });
    }
    getMdsMySQLDbSystem(configProfile, dbSystemId) {
        const request = communication_1.ProtocolMds.getRequestGetDbSystem({ configProfile, dbSystemId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsMySQLDbSystem" });
    }
    getMdsComputeInstances(configProfile, compartmentId) {
        const request = communication_1.ProtocolMds.getRequestListComputeInstances({ configProfile, compartmentId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsComputeInstances" });
    }
    getMdsBastions(configProfile, compartmentId, validForDbSystemId) {
        const request = communication_1.ProtocolMds.getRequestListBastions({ configProfile, compartmentId, validForDbSystemId });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsBastions" });
    }
    getMdsBastion(configProfile, bastionId) {
        const request = communication_1.ProtocolMds.getRequestGetBastion({ configProfile, bastionId, raiseExceptions: true });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsBastion" });
    }
    createBastion(configProfile, dbSystemId, awaitActiveState) {
        const request = communication_1.ProtocolMds.getRequestCreateBastion({ configProfile, dbSystemId, awaitActiveState });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "createBastion" });
    }
    createBastionSession(configProfile, targetId, sessionType, compartmentId, awaitCreation) {
        const request = communication_1.ProtocolMds.getRequestCreateBastionSession({
            configProfile,
            targetId,
            sessionType,
            compartmentId,
            awaitCreation,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "createBastionSession" });
    }
    listLoadBalancers(configProfile, compartmentId) {
        const request = communication_1.ProtocolMds.getRequestListLoadBalancers({
            configProfile,
            compartmentId,
        });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getMdsLoadBalancers" });
    }
    setCurrentCompartment(parameters) {
        const request = communication_1.ProtocolMds.getRequestSetCurrentCompartment(parameters);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "setCurrentCompartment" });
    }
    setCurrentBastion(parameters) {
        const request = communication_1.ProtocolMds.getRequestSetCurrentBastion(parameters);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "setCurrentBastion" });
    }
}
exports.ShellInterfaceMds = ShellInterfaceMds;
//# sourceMappingURL=ShellInterfaceMds.js.map