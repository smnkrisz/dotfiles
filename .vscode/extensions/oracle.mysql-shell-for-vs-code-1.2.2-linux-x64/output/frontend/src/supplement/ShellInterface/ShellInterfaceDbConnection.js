"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceDbConnection = void 0;
const communication_1 = require("../../communication");
const helpers_1 = require("../../utilities/helpers");
class ShellInterfaceDbConnection {
    constructor() {
        this.id = "dbConnection";
    }
    addDbConnection(profileId, connection, folderPath) {
        const conn = {
            dbType: connection.dbType,
            caption: connection.caption,
            description: connection.description,
            options: (0, helpers_1.convertCamelToSnakeCase)(connection.options),
        };
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsAddDbConnection(profileId, conn, folderPath), { messageClass: "addDbConnection" });
    }
    updateDbConnection(profileId, connection) {
        const conn = {
            dbType: connection.dbType,
            caption: connection.caption,
            description: connection.description,
            options: (0, helpers_1.convertCamelToSnakeCase)(connection.options),
        };
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsUpdateDbConnection(profileId, connection.id, conn), { messageClass: "updateDbConnection" });
    }
    removeDbConnection(profileId, connectionId) {
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsRemoveDbConnection(profileId, connectionId), { messageClass: "removeDbConnection" });
    }
    listDbConnections(profileId, folderPath) {
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsListDbConnections(profileId, folderPath), { messageClass: "listDbConnections" });
    }
    getDbConnection(connectionId) {
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsGetDbConnection(connectionId), { messageClass: "getDbConnection" });
    }
}
exports.ShellInterfaceDbConnection = ShellInterfaceDbConnection;
//# sourceMappingURL=ShellInterfaceDbConnection.js.map