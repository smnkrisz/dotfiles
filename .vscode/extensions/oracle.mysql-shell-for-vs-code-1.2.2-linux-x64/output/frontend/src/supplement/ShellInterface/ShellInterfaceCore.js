"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceCore = void 0;
const communication_1 = require("../../communication");
const string_helpers_1 = require("../../utilities/string-helpers");
const Dispatch_1 = require("../Dispatch");
class ShellInterfaceCore {
    constructor() {
        this.id = "core";
    }
    get backendInformation() {
        return new Promise((resolve) => {
            const request = communication_1.ProtocolGui.getRequestCoreGetBackendInformation();
            communication_1.currentConnection.sendRequest(request, { messageClass: "getBackendInformation" })
                .then((event) => {
                if (!event.data) {
                    return;
                }
                resolve({
                    architecture: event.data.info.architecture,
                    major: (0, string_helpers_1.filterInt)(event.data.info.major),
                    minor: (0, string_helpers_1.filterInt)(event.data.info.minor),
                    patch: (0, string_helpers_1.filterInt)(event.data.info.patch),
                    platform: event.data.info.platform,
                    serverDistribution: event.data.info.serverDistribution,
                    serverMajor: (0, string_helpers_1.filterInt)(event.data.info.serverMajor),
                    serverMinor: (0, string_helpers_1.filterInt)(event.data.info.serverMinor),
                    serverPatch: (0, string_helpers_1.filterInt)(event.data.info.serverPatch),
                });
            });
        });
    }
    getLogLevel() {
        return new Promise((resolve, reject) => {
            const request = communication_1.ProtocolGui.getRequestCoreGetLogLevel();
            communication_1.currentConnection.sendRequest(request, { messageClass: "getLogLevel" })
                .then((event) => {
                var _a;
                resolve((_a = event.data) === null || _a === void 0 ? void 0 : _a.result);
            }).catch((errorEvent) => {
                reject(errorEvent.message);
            });
        });
    }
    setLogLevel(level) {
        return new Promise((resolve, reject) => {
            const request = communication_1.ProtocolGui.getRequestCoreSetLogLevel(level);
            communication_1.currentConnection.sendRequest(request, { messageClass: "getLogLevel" })
                .then(() => {
                resolve();
            }).catch((errorEvent) => {
                reject(errorEvent.message);
            });
        });
    }
    getDbTypes() {
        return new Promise((resolve) => {
            const result = [];
            const context = { messageClass: communication_1.ShellAPIGui.GuiDbconnectionsGetDbTypes };
            communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsGetDbTypes(), context)
                .then((event) => {
                if (event.data) {
                    result.push(...event.data.dbType);
                }
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve(result);
                }
            });
        });
    }
    validatePath(path) {
        return new Promise((resolve) => {
            const request = communication_1.ProtocolGui.getRequestCoreValidatePath(path);
            communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiCoreValidatePath })
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve(true);
                }
            }).catch(() => {
                resolve(false);
            });
        });
    }
    createDatabaseFile(path) {
        return new Promise((resolve, reject) => {
            const request = communication_1.ProtocolGui.getRequestCoreCreateFile(path);
            communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiCoreCreateFile })
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    resolve();
                }
            }).catch((event) => {
                reject(event.message);
            });
        });
    }
}
exports.ShellInterfaceCore = ShellInterfaceCore;
//# sourceMappingURL=ShellInterfaceCore.js.map