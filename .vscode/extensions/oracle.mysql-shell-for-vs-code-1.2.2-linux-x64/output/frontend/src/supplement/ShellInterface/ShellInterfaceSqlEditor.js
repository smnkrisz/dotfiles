"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceSqlEditor = void 0;
const Dispatch_1 = require("../Dispatch");
const communication_1 = require("../../communication");
const WebSession_1 = require("../WebSession");
const Settings_1 = require("../Settings/Settings");
const _1 = require(".");
class ShellInterfaceSqlEditor extends _1.ShellInterfaceDb {
    constructor() {
        super(...arguments);
        this.mds = new _1.ShellInterfaceMds();
        this.mrs = new _1.ShellInterfaceMrs();
    }
    get id() {
        return "sqlEditor";
    }
    get hasSession() {
        return this.moduleSessionId !== undefined;
    }
    startSession(id) {
        return new Promise((resolve, reject) => {
            this.moduleSessionLookupId = this.id + "." + id;
            this.mrs.moduleSessionLookupId = this.moduleSessionLookupId;
            if (this.hasSession) {
                resolve();
            }
            const request = communication_1.ProtocolGui.getRequestSqleditorStartSession();
            const listener = communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorStartSession });
            listener.then((event) => {
                if (event.data) {
                    WebSession_1.webSession.setModuleSessionId(this.moduleSessionLookupId, event.data.moduleSessionId);
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
                const request = communication_1.ProtocolGui.getRequestSqleditorCloseSession(id);
                communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorCloseSession })
                    .then(() => {
                    WebSession_1.webSession.setModuleSessionId(this.moduleSessionLookupId);
                    resolve();
                }).catch((event) => {
                    reject(event.message);
                });
            }
        });
    }
    getGuiModuleDisplayInfo() {
        const request = communication_1.ProtocolGui.getRequestSqleditorGetGuiModuleDisplayInfo();
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getModuleDisplayInfo" });
    }
    isGuiModuleBackend() {
        const request = communication_1.ProtocolGui.getRequestSqleditorIsGuiModuleBackend();
        return communication_1.currentConnection.sendRequest(request, { messageClass: "isGuiModuleBackend" });
    }
    openConnection(dbConnectionId) {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestSqleditorOpenConnection(dbConnectionId, id);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "openConnection" });
    }
    execute(sql, params) {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestSqleditorExecute(sql, id, params, { rowPacketSize: Settings_1.settings.get("sql.rowPacketSize", 1000) });
        return communication_1.currentConnection.sendRequest(request, { messageClass: "execute" });
    }
    reconnect() {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestSqleditorReconnect(id);
        return communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorReconnect });
    }
    killQuery() {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestSqleditorKillQuery(id);
        return communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorKillQuery });
    }
    setAutoCommit(value) {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                return resolve();
            }
            const request = communication_1.ProtocolGui.getRequestSqleditorSetAutoCommit(id, value);
            communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorSetAutoCommit })
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve();
                }
            })
                .catch((event) => {
                reject(event.message);
            });
        });
    }
    getAutoCommit() {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                return resolve(false);
            }
            const request = communication_1.ProtocolGui.getRequestSqleditorGetAutoCommit(id);
            communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorGetAutoCommit })
                .then((event) => {
                var _a;
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve(((_a = event.data) === null || _a === void 0 ? void 0 : _a.result) !== 0);
                }
            })
                .catch((event) => {
                reject(event.message);
            });
        });
    }
    getCurrentSchema() {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                return resolve("");
            }
            const request = communication_1.ProtocolGui.getRequestSqleditorGetCurrentSchema(id);
            communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorGetCurrentSchema })
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve(event.data ? event.data.result : "");
                }
            }).catch((event) => {
                reject(event.message);
            });
        });
    }
    setCurrentSchema(schema) {
        return new Promise((resolve, reject) => {
            const id = this.moduleSessionId;
            if (!id) {
                return resolve();
            }
            const request = communication_1.ProtocolGui.getRequestSqleditorSetCurrentSchema(id, schema);
            communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiSqleditorSetCurrentSchema })
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve();
                }
            }).catch((event) => {
                reject(event.message);
            });
        });
    }
    sendReply(requestId, type, reply) {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestPromptReply(requestId, type, reply, id);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "sendReply" });
    }
}
exports.ShellInterfaceSqlEditor = ShellInterfaceSqlEditor;
//# sourceMappingURL=ShellInterfaceSqlEditor.js.map