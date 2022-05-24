"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MDSCommandHandler = void 0;
const vscode_1 = require("vscode");
const os_1 = require("os");
const fs_1 = require("fs");
const Dispatch_1 = require("../../frontend/src/supplement/Dispatch");
const ShellInterface_1 = require("../../frontend/src/supplement/ShellInterface");
const extension_1 = require("./extension");
const OCITreeProvider_1 = require("./tree-providers/OCITreeProvider");
class MDSCommandHandler {
    constructor() {
        this.shellSession = new ShellInterface_1.ShellInterfaceShellSession();
        this.setup = (context, host) => {
            this.ociTreeDataProvider = new OCITreeProvider_1.OciTreeDataProvider();
            context.subscriptions.push(vscode_1.window.registerTreeDataProvider("msg.oci", this.ociTreeDataProvider));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.refreshOciProfiles", () => {
                this.ociTreeDataProvider.refresh();
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.configureOciProfiles", () => {
                const configFile = vscode_1.Uri.file(`${(0, os_1.homedir)()}/.oci/config`);
                if (!(0, fs_1.existsSync)(configFile.fsPath)) {
                    const workspaceEdit = new vscode_1.WorkspaceEdit();
                    void workspaceEdit.createFile(configFile, { ignoreIfExists: true });
                    void vscode_1.workspace.applyEdit(workspaceEdit).then(() => {
                        void vscode_1.workspace.openTextDocument(configFile).then((doc) => {
                            void vscode_1.window.showTextDocument(doc, 1, false).then((editor) => {
                                void editor.edit((edit) => {
                                    const firstLine = doc.lineAt(0);
                                    const lastLine = doc.lineAt(doc.lineCount - 1);
                                    const textRange = new vscode_1.Range(firstLine.range.start, lastLine.range.end);
                                    edit.replace(textRange, ";To add a new OCI Profile, please follow these instructions.\n" +
                                        ";https://docs.oracle.com/en-us/iaas/Content/API/Concepts/" +
                                        "devguidesetupprereq.htm.\n" +
                                        ";Then paste your OCI Config here, replacing these lines and save.\n" +
                                        ";Click the Reload icon in the ORACLE CLOUD INFRASTRUCTURE View.");
                                }).then(() => {
                                    const position = editor.selection.start;
                                    editor.selection = new vscode_1.Selection(position, position);
                                });
                            });
                        });
                    });
                }
                else {
                    void vscode_1.workspace.openTextDocument(configFile).then((doc) => {
                        void vscode_1.window.showTextDocument(doc, 1, false);
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.createRouterEndpoint", (item) => {
                if (item && item.dbSystem.id) {
                    void vscode_1.window.showInputBox({
                        title: `Please enter a name for this new MDS Endpoint [${item.name} Endpoint]:`,
                        value: `${item.name} Endpoint`,
                    }).then((endpointName) => {
                        if (endpointName) {
                            const shellArgs = [
                                "--",
                                "mds",
                                "util",
                                "create-mds-endpoint",
                                `--db_system_id=${item.dbSystem.id.toString()}`,
                                `--config_profile=${item.profile.profile.toString()}`,
                                `--instance_name=${endpointName}`,
                                "--raise_exceptions=true",
                            ];
                            void host.addNewShellTask("Create new Router Endpoint", shellArgs).then(() => {
                                void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                            });
                        }
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.getProfileInfo", (item) => {
                if (item && item.profile.profile) {
                    this.showNewJsonDocument(`${item.profile.profile.toString()} Info.json`, JSON.stringify(item.profile, null, 4));
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.setDefaultProfile", (item) => {
                if (item && item.profile.profile) {
                    vscode_1.window.setStatusBarMessage(`Setting current config profile to ${item.profile.profile} ...`, 10000);
                    this.shellSession.mds.setDefaultConfigProfile(item.profile.profile)
                        .then((event) => {
                        if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                            void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                            vscode_1.window.setStatusBarMessage(`Default config profile set to ${item.profile.profile}.`, 5000);
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while setting default config profile: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.getCompartmentInfo", (item) => {
                if (item && item.compartment.id) {
                    this.showNewJsonDocument(`${item.compartment.name.toString()} Info.json`, JSON.stringify(item.compartment, null, 4));
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.setCurrentCompartment", (item) => {
                if (item && item.compartment.id) {
                    vscode_1.window.setStatusBarMessage(`Setting current compartment to ${item.compartment.name} ...`, 10000);
                    this.shellSession.mds.setCurrentCompartment({
                        compartmentId: item.compartment.id,
                        configProfile: item.profile.profile,
                        interactive: false,
                        raiseExceptions: true,
                    }).then((event) => {
                        if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                            void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                            vscode_1.window.setStatusBarMessage(`Current compartment set to ${item.compartment.name}.`, 5000);
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while setting current compartment: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.getDbSystemInfo", (item) => {
                if (item && item.dbSystem.id) {
                    this.shellSession.mds.getMdsMySQLDbSystem(item.profile.profile, item.dbSystem.id)
                        .then((event) => {
                        var _a, _b;
                        if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                            this.showNewJsonDocument(`${(_a = item.dbSystem.displayName) !== null && _a !== void 0 ? _a : "<unknown>"} Info.json`, JSON.stringify((_b = event.data) === null || _b === void 0 ? void 0 : _b.result, null, 4));
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while fetching the DB System data: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.startDbSystem", (item) => {
                if (item && item.dbSystem.id) {
                    const shellArgs = [
                        "--",
                        "mds",
                        "start",
                        "db-system",
                        `--db_system_id=${item.dbSystem.id.toString()}`,
                        `--config_profile=${item.profile.profile.toString()}`,
                        "--await_completion=true",
                        "--raise_exceptions=true",
                    ];
                    void host.addNewShellTask("Start DB System", shellArgs).then(() => {
                        void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.stopDbSystem", (item) => {
                if (item && item.dbSystem.id) {
                    const shellArgs = [
                        "--",
                        "mds",
                        "stop",
                        "db-system",
                        `--db_system_id=${item.dbSystem.id.toString()}`,
                        `--config_profile=${item.profile.profile.toString()}`,
                        "--await_completion=true",
                        "--raise_exceptions=true",
                    ];
                    void host.addNewShellTask("Stop DB System", shellArgs).then(() => {
                        void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.restartDbSystem", (item) => {
                if (item && item.dbSystem.id) {
                    const shellArgs = [
                        "--",
                        "mds",
                        "restart",
                        "db-system",
                        `--db_system_id=${item.dbSystem.id.toString()}`,
                        `--config_profile=${item.profile.profile.toString()}`,
                        "--await_completion=true",
                        "--raise_exceptions=true",
                    ];
                    void host.addNewShellTask("Restart DB System", shellArgs).then(() => {
                        void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.deleteDbSystem", (item) => {
                if (item && item.dbSystem.id) {
                    const shellArgs = [
                        "--",
                        "mds",
                        "delete",
                        "db-system",
                        `--db_system_id=${item.dbSystem.id.toString()}`,
                        `--config_profile=${item.profile.profile.toString()}`,
                        "--await_completion=true",
                        "--raise_exceptions=true",
                    ];
                    void host.addNewShellTask("Delete DB System", shellArgs).then(() => {
                        void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.getComputeInstance", (item) => {
                var _a;
                if (item && item.compute.id) {
                    this.showNewJsonDocument(`${(_a = item.compute.displayName) !== null && _a !== void 0 ? _a : "<unknown>"} Info.json`, JSON.stringify(item.compute, null, 4));
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.getBastion", (item) => {
                if (item && item.bastion.id) {
                    this.shellSession.mds.getMdsBastion(item.profile.profile, item.bastion.id)
                        .then((event) => {
                        var _a, _b;
                        if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                            this.showNewJsonDocument(`${(_a = item.bastion.name) !== null && _a !== void 0 ? _a : "<unknown>"} Info.json`, JSON.stringify((_b = event.data) === null || _b === void 0 ? void 0 : _b.result, null, 4));
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while fetching the bastion data: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.getLoadBalancer", (item) => {
                var _a;
                if (item && item.loadBalancer) {
                    this.showNewJsonDocument(`${(_a = item.loadBalancer.displayName) !== null && _a !== void 0 ? _a : "<unknown>"} Info.json`, JSON.stringify(item.loadBalancer, null, 4));
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.showTaskOutput", () => {
                extension_1.taskOutputChannel.show();
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.deleteBastion", (item) => {
                if (item && item.bastion.id) {
                    const shellArgs = [
                        "--",
                        "mds",
                        "delete",
                        "bastion",
                        `--bastion_id=${item.bastion.id.toString()}`,
                        `--config_profile=${item.profile.profile.toString()}`,
                        "--await_deletion=true",
                        "--raise_exceptions=true",
                    ];
                    void host.addNewShellTask("Delete Bastion", shellArgs).then(() => {
                        void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.setCurrentBastion", (item) => {
                if (item && item.bastion.id) {
                    vscode_1.window.setStatusBarMessage(`Setting current bastion to ${item.bastion.name} ...`, 10000);
                    this.shellSession.mds.setCurrentBastion({
                        bastionId: item.bastion.id,
                        configProfile: item.profile.profile,
                        interactive: false,
                        raiseExceptions: true,
                    }).then((event) => {
                        if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                            void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                            vscode_1.window.setStatusBarMessage(`Current compartment set to ${item.bastion.name}.`, 5000);
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while setting current bastion: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.refreshOnBastionActiveState", (item) => {
                if (item && item.bastion.id) {
                    const shellArgs = [
                        "--",
                        "mds",
                        "get",
                        "bastion",
                        `--bastion_id=${item.bastion.id.toString()}`,
                        `--config_profile=${item.profile.profile.toString()}`,
                        "--await_state=ACTIVE",
                        "--raise_exceptions=true",
                    ];
                    void host.addNewShellTask("Refresh Bastion", shellArgs).then(() => {
                        void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.deleteComputeInstance", (item) => {
                if (item && item.compute.id) {
                    const shellArgs = [
                        "--",
                        "mds",
                        "delete",
                        "compute_instance",
                        `--instance_id=${item.compute.id}`,
                        `--config_profile=${item.profile.profile}`,
                        "--await_deletion=true",
                        "--raise_exceptions=true",
                    ];
                    void host.addNewShellTask("Delete Compute Instance", shellArgs).then(() => {
                        void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
                    });
                }
            }));
            context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.openBastionSshSession", (item) => {
                if (item && item.shellSession && item.shellSession.mds && item.compute.id) {
                    vscode_1.window.setStatusBarMessage("Opening Bastion Session ...", 10000);
                    item.shellSession.mds.createBastionSession(item.profile.profile, item.compute.id, "MANAGED_SSH", item.compute.compartmentId, true)
                        .then((event) => {
                        var _a;
                        switch (event.eventType) {
                            case Dispatch_1.EventType.DataResponse: {
                                if (event.message) {
                                    vscode_1.window.setStatusBarMessage(event.message);
                                }
                                break;
                            }
                            case Dispatch_1.EventType.FinalResponse: {
                                vscode_1.window.setStatusBarMessage("Bastion Session available, opening Terminal ...", 5000);
                                const res = (_a = event.data) === null || _a === void 0 ? void 0 : _a.result;
                                if (res === null || res === void 0 ? void 0 : res.bastionId) {
                                    const terminal = vscode_1.window.createTerminal(`Terminal ${item.name}`);
                                    const sshHost = `${res.id}@host.bastion.` +
                                        `${item.profile.region}.oci.oraclecloud.com`;
                                    const sshTargetIp = res.targetResourceDetails.targetResourcePrivateIpAddress;
                                    if (sshTargetIp) {
                                        const sshTargetPort = res.targetResourceDetails.targetResourcePort;
                                        terminal.sendText(`ssh -o ProxyCommand="ssh -W %h:%p -p 22 ${sshHost}"` +
                                            ` -p ${sshTargetPort} opc@${sshTargetIp}`);
                                        terminal.sendText("clear");
                                        terminal.show();
                                    }
                                }
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    }).catch((errorEvent) => {
                        var _a;
                        void vscode_1.window.showErrorMessage(`Error while creating the bastion session: ` +
                            `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                    });
                }
            }));
        };
    }
    showNewJsonDocument(title, text) {
        const setting = vscode_1.Uri.parse(`untitled:${(0, os_1.homedir)()}/${title}`);
        vscode_1.workspace.openTextDocument(setting).then((doc) => {
            void vscode_1.window.showTextDocument(doc, 1, false).then((editor) => {
                void editor.edit((edit) => {
                    const firstLine = doc.lineAt(0);
                    const lastLine = doc.lineAt(doc.lineCount - 1);
                    const textRange = new vscode_1.Range(firstLine.range.start, lastLine.range.end);
                    edit.replace(textRange, text);
                }).then(() => {
                    const position = editor.selection.start;
                    editor.selection = new vscode_1.Selection(position, position);
                });
                void vscode_1.languages.setTextDocumentLanguage(doc, "json");
            });
        }, (error) => {
            console.error(error);
            debugger;
        });
    }
}
exports.MDSCommandHandler = MDSCommandHandler;
//# sourceMappingURL=MDSCommandHandler.js.map