"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceDb = void 0;
const communication_1 = require("../../communication");
const Dispatch_1 = require("../Dispatch");
const WebSession_1 = require("../WebSession");
class ShellInterfaceDb {
    constructor() {
        this.moduleSessionLookupId = "";
    }
    get id() {
        return "dbSession";
    }
    startSession(id, connection) {
        this.moduleSessionLookupId = this.id + "." + id;
        return new Promise((resolve, reject) => {
            const request = communication_1.ProtocolGui.getRequestDbStartSession(connection);
            const listener = communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiDbStartSession });
            listener.then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    const id = event.data.moduleSessionId;
                    WebSession_1.webSession.setModuleSessionId(this.moduleSessionLookupId, id);
                    resolve();
                }
            }).catch((event) => {
                reject(event.message);
            });
        });
    }
    closeSession() {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                resolve();
            }
            else {
                const request = communication_1.ProtocolGui.getRequestDbCloseSession(id);
                communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiDbCloseSession }).then(() => {
                    WebSession_1.webSession.setModuleSessionId(this.moduleSessionLookupId);
                    resolve();
                }).catch((event) => {
                    reject(event.message);
                });
            }
        });
    }
    getCatalogObjects(type, filter) {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                resolve([]);
            }
            else {
                const names = [];
                const request = communication_1.ProtocolGui.getRequestDbGetCatalogObjectNames(id, type, filter);
                communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiDbGetCatalogObjectNames })
                    .then((event) => {
                    var _a;
                    if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.result) {
                        names.push(...event.data.result);
                    }
                    if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                        resolve(names);
                    }
                }).catch((event) => {
                    reject(event.message);
                });
            }
        });
    }
    getSchemaObjects(schema, type, routineType, filter) {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                return resolve([]);
            }
            const names = [];
            const request = communication_1.ProtocolGui.getRequestDbGetSchemaObjectNames(id, type, schema, filter, routineType);
            communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiDbGetSchemaObjectNames })
                .then((event) => {
                var _a;
                if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.result) {
                    names.push(...event.data.result);
                }
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve(names);
                }
            }).catch((event) => {
                reject(event.message);
            });
        });
    }
    getTableObjects(schema, table, type, filter) {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                resolve([]);
            }
            else {
                const request = communication_1.ProtocolGui.getRequestDbGetTableObjectNames(id, type, schema, table, filter);
                const names = [];
                communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiDbGetTableObjectNames })
                    .then((event) => {
                    var _a;
                    if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.result) {
                        names.push(...event.data.result);
                    }
                    if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                        resolve(names);
                    }
                })
                    .catch((event) => {
                    reject(event.message);
                });
            }
        });
    }
    get moduleSessionId() {
        return WebSession_1.webSession.moduleSessionId(this.moduleSessionLookupId);
    }
}
exports.ShellInterfaceDb = ShellInterfaceDb;
//# sourceMappingURL=ShellInterfaceDb.js.map