"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MRSCommandHandler = void 0;
const vscode_1 = require("vscode");
const Types_1 = require("../../frontend/src/app-logic/Types");
const Dispatch_1 = require("../../frontend/src/supplement/Dispatch");
const DialogWebviewProvider_1 = require("./web-views/DialogWebviewProvider");
class MRSCommandHandler {
    constructor() {
        this.dialogManager = new DialogWebviewProvider_1.DialogWebviewManager();
        this.setup = (context, host) => {
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.configureMySQLRestService", (item) => {
                if (item) {
                    const shellArgs = [
                        "--",
                        "mrs",
                        "configure",
                    ];
                    void host.addNewShellTask("Configure MySQL REST Service", shellArgs, item.entry.details.id)
                        .then(() => {
                        void vscode_1.commands.executeCommand("msg.refreshConnections");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.addService", (item) => {
                if (item && item.entry.backend) {
                    this.showMrsServiceDialog(item.entry.backend);
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.editService", (item) => {
                if (item && item.entry.backend) {
                    this.showMrsServiceDialog(item.entry.backend, item.value);
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.deleteService", (item) => {
                if (item) {
                    void vscode_1.window.showInformationMessage(`Are you sure the MRS service ${item.value.urlContextRoot} should be deleted?`, "Yes", "No").then((answer) => {
                        var _a;
                        if (answer === "Yes") {
                            (_a = item.entry.backend) === null || _a === void 0 ? void 0 : _a.mrs.deleteService(item.value.id).then((deleteServiceEvent) => {
                                switch (deleteServiceEvent.eventType) {
                                    case Dispatch_1.EventType.DataResponse:
                                    case Dispatch_1.EventType.FinalResponse: {
                                        void vscode_1.commands.executeCommand("msg.refreshConnections");
                                        void vscode_1.window.showInformationMessage("The MRS service has been deleted successfully.");
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }).catch((errorEvent) => {
                                var _a;
                                void vscode_1.window.showErrorMessage(`Error adding the MRS service: ` +
                                    `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                            });
                        }
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.setDefaultService", (item) => {
                var _a;
                if (item) {
                    (_a = item.entry.backend) === null || _a === void 0 ? void 0 : _a.mrs.setDefaultService(item.value.id).then((setDefaultServiceEvent) => {
                        switch (setDefaultServiceEvent.eventType) {
                            case Dispatch_1.EventType.DataResponse:
                            case Dispatch_1.EventType.FinalResponse: {
                                void vscode_1.commands.executeCommand("msg.refreshConnections");
                                void vscode_1.window.showInformationMessage("The MRS service has been set as the new default service.");
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error setting the default MRS service: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.deleteSchema", (item) => {
                if (item) {
                    void vscode_1.window.showInformationMessage(`Are you sure the MRS schema ${item.value.name} should be deleted?`, "Yes", "No").then((answer) => {
                        var _a;
                        if (answer === "Yes") {
                            (_a = item.entry.backend) === null || _a === void 0 ? void 0 : _a.mrs.deleteSchema(item.value.id, item.value.serviceId).then((deleteServiceEvent) => {
                                switch (deleteServiceEvent.eventType) {
                                    case Dispatch_1.EventType.DataResponse:
                                    case Dispatch_1.EventType.FinalResponse: {
                                        void vscode_1.commands.executeCommand("msg.refreshConnections");
                                        void vscode_1.window.showInformationMessage("The MRS schema has been deleted successfully.");
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }).catch((errorEvent) => {
                                var _a;
                                void vscode_1.window.showErrorMessage(`Error removing an MRS schema: ` +
                                    `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                            });
                        }
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.editSchema", (item) => {
                if (item && item.entry.backend) {
                    this.showMrsSchemaDialog(item.entry.backend, item.value.name, item.value);
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.addSchema", (item) => {
                if (item && item.entry.backend) {
                    this.showMrsSchemaDialog(item.entry.backend, item.schema);
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mrs.addTable", (item) => {
                if (item) {
                    void vscode_1.window.showInputBox({
                        title: `Please enter the request path for this table [/${item.name}]:`,
                        value: `/${item.name}`,
                    }).then((requestPath) => {
                        var _a;
                        if (requestPath) {
                            (_a = item.entry.backend) === null || _a === void 0 ? void 0 : _a.mrs.addDbObject(item.name, "TABLE", item.schema, true, requestPath, ["READ"], "FEED", false, false).then((addServiceEvent) => {
                                switch (addServiceEvent.eventType) {
                                    case Dispatch_1.EventType.DataResponse:
                                    case Dispatch_1.EventType.FinalResponse: {
                                        void vscode_1.commands.executeCommand("msg.refreshConnections");
                                        void vscode_1.window.showInformationMessage(`The Table ${item.name} has been added successfully.`);
                                        break;
                                    }
                                    default: {
                                        break;
                                    }
                                }
                            }).catch((errorEvent) => {
                                var _a;
                                void vscode_1.window.showErrorMessage(`Error adding the Table to the MRS service: ` +
                                    `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                            });
                        }
                    });
                }
            }));
        };
    }
    showMrsServiceDialog(backend, service) {
        var _a, _b, _c;
        const title = service
            ? "Adjust the MySQL REST Service Configuration"
            : "Enter Configuration Values for the New MySQL REST Service";
        const request = {
            type: Types_1.DialogType.MrsService,
            title,
            parameters: { protocols: ["HTTPS", "HTTP"] },
            values: {
                serviceName: (_a = service === null || service === void 0 ? void 0 : service.urlContextRoot) !== null && _a !== void 0 ? _a : "/mrs",
                protocols: (_b = service === null || service === void 0 ? void 0 : service.urlProtocol) !== null && _b !== void 0 ? _b : "HTTPS,HTTP",
                isDefault: !service || service.isDefault === 1,
                enabled: !service || service.enabled === 1,
                comments: (_c = service === null || service === void 0 ? void 0 : service.comments) !== null && _c !== void 0 ? _c : "",
            },
        };
        void this.dialogManager.showDialog(request, title).then((response) => {
            if (!response || !response.accepted) {
                return;
            }
            if (response.values) {
                const urlContextRoot = response.values.serviceName;
                const protocols = response.values.protocols.join(",");
                const hostName = response.values.hostName;
                const comments = response.values.comments;
                const isDefault = response.values.isDefault;
                const enabled = response.values.enabled;
                if (!service) {
                    backend.mrs.addService(urlContextRoot, protocols, hostName, isDefault, comments, enabled)
                        .then((addServiceEvent) => {
                        switch (addServiceEvent.eventType) {
                            case Dispatch_1.EventType.DataResponse:
                            case Dispatch_1.EventType.FinalResponse: {
                                void vscode_1.commands.executeCommand("msg.refreshConnections");
                                void vscode_1.window.setStatusBarMessage("The MRS service has been added successfully.", 5000);
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while adding MySQL REST service: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
                else {
                    backend.mrs.updateService(service.id, urlContextRoot, hostName)
                        .then((addServiceEvent) => {
                        switch (addServiceEvent.eventType) {
                            case Dispatch_1.EventType.DataResponse:
                            case Dispatch_1.EventType.FinalResponse: {
                                void vscode_1.commands.executeCommand("msg.refreshConnections");
                                void vscode_1.window.setStatusBarMessage("The MRS service has been successfully updated.", 5000);
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while adding MySQL REST service: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }
        });
    }
    showMrsSchemaDialog(backend, schemaName, schema) {
        backend.mrs.listServices().then((event) => {
            var _a, _b, _c, _d;
            const title = schema
                ? "Adjust the MySQL REST Schema Configuration"
                : "Enter Configuration Values for the New MySQL REST Schema";
            const request = {
                type: Types_1.DialogType.MrsSchema,
                title,
                parameters: { services: (_a = event.data) === null || _a === void 0 ? void 0 : _a.result },
                values: {
                    serviceId: schema === null || schema === void 0 ? void 0 : schema.serviceId,
                    name: (_b = schema === null || schema === void 0 ? void 0 : schema.name) !== null && _b !== void 0 ? _b : schemaName,
                    requestPath: (_c = schema === null || schema === void 0 ? void 0 : schema.requestPath) !== null && _c !== void 0 ? _c : `/${schemaName !== null && schemaName !== void 0 ? schemaName : ""}`,
                    requiresAuth: (schema === null || schema === void 0 ? void 0 : schema.requiresAuth) === 1 || (schema === null || schema === void 0 ? void 0 : schema.requiresAuth) !== undefined,
                    enabled: !schema || schema.enabled === 1,
                    itemsPerPage: schema === null || schema === void 0 ? void 0 : schema.itemsPerPage,
                    comments: (_d = schema === null || schema === void 0 ? void 0 : schema.comments) !== null && _d !== void 0 ? _d : "",
                },
            };
            void this.dialogManager.showDialog(request, title).then((response) => {
                if (!response || !response.accepted) {
                    return;
                }
                if (response.values) {
                    const serviceId = response.values.serviceId;
                    const name = response.values.name;
                    const requestPath = response.values.requestPath;
                    const requiresAuth = response.values.requiresAuth;
                    const itemsPerPage = response.values.itemsPerPage;
                    const comments = response.values.comments;
                    if (!schema) {
                        backend.mrs.addSchema(name, requestPath, requiresAuth, serviceId, itemsPerPage, comments)
                            .then((addSchemaEvent) => {
                            switch (addSchemaEvent.eventType) {
                                case Dispatch_1.EventType.FinalResponse: {
                                    void vscode_1.commands.executeCommand("msg.refreshConnections");
                                    void vscode_1.window.setStatusBarMessage("The MRS schema has been added successfully.", 5000);
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }).catch((errorEvent) => {
                            var _a;
                            void vscode_1.window.showErrorMessage(`Error while adding MRS schema: ` +
                                `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                        });
                    }
                    else {
                        backend.mrs.updateSchema(schema.id, name, requestPath, requiresAuth, serviceId)
                            .then((addSchemaEvent) => {
                            switch (addSchemaEvent.eventType) {
                                case Dispatch_1.EventType.DataResponse:
                                case Dispatch_1.EventType.FinalResponse: {
                                    void vscode_1.commands.executeCommand("msg.refreshConnections");
                                    void vscode_1.window.setStatusBarMessage("The MRS schema has been successfully updated.", 5000);
                                    break;
                                }
                                default: {
                                    break;
                                }
                            }
                        }).catch((errorEvent) => {
                            var _a;
                            void vscode_1.window.showErrorMessage(`Error while updating MRS schema: ` +
                                `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                        });
                    }
                }
            });
        }).catch((errorEvent) => {
            var _a;
            void vscode_1.window.showErrorMessage(`Error while listing MySQL REST services: ` +
                `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
        });
    }
}
exports.MRSCommandHandler = MRSCommandHandler;
//# sourceMappingURL=MRSCommandHandler.js.map