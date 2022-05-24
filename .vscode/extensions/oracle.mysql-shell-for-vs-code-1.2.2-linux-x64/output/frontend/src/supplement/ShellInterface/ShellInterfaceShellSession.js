"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceShellSession = void 0;
const Dispatch_1 = require("../Dispatch");
const communication_1 = require("../../communication");
const WebSession_1 = require("../WebSession");
const ShellInterfaceMds_1 = require("./ShellInterfaceMds");
class ShellInterfaceShellSession {
    constructor(sessionId) {
        this.id = "shellSession";
        this.mds = new ShellInterfaceMds_1.ShellInterfaceMds();
        this.moduleSessionLookupId = "";
        if (sessionId) {
            this.moduleSessionLookupId = this.id + ".temporary";
            WebSession_1.webSession.setModuleSessionId(this.moduleSessionLookupId, sessionId);
        }
    }
    get hasSession() {
        return this.moduleSessionId !== undefined;
    }
    startShellSession(id, dbConnectionId) {
        this.moduleSessionLookupId = this.id + "." + id;
        if (this.hasSession) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestShellStartSession(dbConnectionId);
        const listener = communication_1.currentConnection.sendRequest(request, { messageClass: "startShellModuleSession" });
        listener.then((event) => {
            if (event.data && event.eventType === Dispatch_1.EventType.DataResponse && event.data.moduleSessionId) {
                WebSession_1.webSession.setModuleSessionId(this.moduleSessionLookupId, event.data.moduleSessionId);
            }
        }).catch(() => {
        });
        return listener;
    }
    closeShellSession() {
        const sessionId = this.moduleSessionId;
        if (sessionId) {
            const request = communication_1.ProtocolGui.getRequestShellCloseSession(sessionId);
            const listener = communication_1.currentConnection.sendRequest(request, { messageClass: "closeModuleSession" });
            listener.then(() => {
                WebSession_1.webSession.setModuleSessionId(this.moduleSessionLookupId);
            }).catch((event) => {
                throw new Error(event.message);
            });
            return listener;
        }
        return Dispatch_1.ListenerEntry.resolve();
    }
    execute(command) {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestShellExecute(command, id);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "execute" });
    }
    sendReply(requestId, type, reply) {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestPromptReply(requestId, type, reply, id);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "sendReply" });
    }
    getCompletionItems(text, offset) {
        const id = this.moduleSessionId;
        if (!id) {
            return Dispatch_1.ListenerEntry.resolve();
        }
        const request = communication_1.ProtocolGui.getRequestShellComplete(text, offset, id);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getCompletionItems" });
    }
    get moduleSessionId() {
        return WebSession_1.webSession.moduleSessionId(this.moduleSessionLookupId);
    }
}
exports.ShellInterfaceShellSession = ShellInterfaceShellSession;
//# sourceMappingURL=ShellInterfaceShellSession.js.map