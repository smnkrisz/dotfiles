"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtensionHost = void 0;
const vscode_1 = require("vscode");
const lodash_1 = require("lodash");
const Dispatch_1 = require("../../frontend/src/supplement/Dispatch");
const ShellInterface_1 = require("../../frontend/src/supplement/ShellInterface");
const WebSession_1 = require("../../frontend/src/supplement/WebSession");
const SettingsRegistry_1 = require("../../frontend/src/supplement/Settings/SettingsRegistry");
const Settings_1 = require("../../frontend/src/supplement/Settings/Settings");
const ShellTask_1 = require("../../frontend/src/shell-tasks/ShellTask");
const ShellConsolesTreeProvider_1 = require("./tree-providers/ShellTreeProvider/ShellConsolesTreeProvider");
const ShellTasksTreeProvider_1 = require("./tree-providers/ShellTreeProvider/ShellTasksTreeProvider");
const extension_1 = require("./extension");
const DbEditorCommandHandler_1 = require("./DbEditorCommandHandler");
const ShellConsoleCommandHandler_1 = require("./ShellConsoleCommandHandler");
const Requisitions_1 = require("../../frontend/src/supplement/Requisitions");
const MDSCommandHandler_1 = require("./MDSCommandHandler");
const MRSCommandHandler_1 = require("./MRSCommandHandler");
class ExtensionHost {
    constructor(context) {
        this.context = context;
        this.updatingSettings = false;
        this.dbEditorCommandHandler = new DbEditorCommandHandler_1.DbEditorCommandHandler();
        this.shellConsoleCommandHandler = new ShellConsoleCommandHandler_1.ShellConsoleCommandHandler();
        this.mrsCommandHandler = new MRSCommandHandler_1.MRSCommandHandler();
        this.mdsCommandHandler = new MDSCommandHandler_1.MDSCommandHandler();
        this.shellTasks = [];
        this.moduleDataCategories = new Map();
        this.updateVscodeSettings = (entry) => __awaiter(this, void 0, void 0, function* () {
            var e_1, _a, e_2, _b;
            if (!this.updatingSettings) {
                this.updatingSettings = true;
                if (entry) {
                    const parts = entry.key.split(".");
                    if (parts.length === 3) {
                        const configuration = vscode_1.workspace.getConfiguration(`msg.${parts[0]}`);
                        const currentValue = configuration.get(`${parts[1]}.${parts[2]}`);
                        if (currentValue !== entry.value) {
                            yield configuration.update(`${parts[1]}.${parts[2]}`, entry.value, true);
                        }
                    }
                }
                else {
                    const categories = SettingsRegistry_1.settingCategories.children;
                    if (categories) {
                        const updateFromChildren = (children, configuration) => { var children_1, children_1_1; return __awaiter(this, void 0, void 0, function* () {
                            var e_3, _a, e_4, _b;
                            if (children && configuration) {
                                try {
                                    for (children_1 = __asyncValues(children); children_1_1 = yield children_1.next(), !children_1_1.done;) {
                                        const child = children_1_1.value;
                                        try {
                                            for (var _c = (e_4 = void 0, __asyncValues(child.values)), _d; _d = yield _c.next(), !_d.done;) {
                                                const value = _d.value;
                                                const setting = Settings_1.settings.get(value.id);
                                                const currentValue = configuration.get(`${child.key}.${value.key}`);
                                                if (setting !== currentValue) {
                                                    yield configuration.update(`${child.key}.${value.key}`, setting, true);
                                                }
                                            }
                                        }
                                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                        finally {
                                            try {
                                                if (_d && !_d.done && (_b = _c.return)) yield _b.call(_c);
                                            }
                                            finally { if (e_4) throw e_4.error; }
                                        }
                                        yield updateFromChildren(child.children, configuration);
                                    }
                                }
                                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                finally {
                                    try {
                                        if (children_1_1 && !children_1_1.done && (_a = children_1.return)) yield _a.call(children_1);
                                    }
                                    finally { if (e_3) throw e_3.error; }
                                }
                            }
                        }); };
                        try {
                            for (var categories_1 = __asyncValues(categories), categories_1_1; categories_1_1 = yield categories_1.next(), !categories_1_1.done;) {
                                const category = categories_1_1.value;
                                if (category.key !== "theming") {
                                    const configuration = vscode_1.workspace.getConfiguration(`msg.${category.key}`);
                                    try {
                                        for (var _c = (e_2 = void 0, __asyncValues(category.values)), _d; _d = yield _c.next(), !_d.done;) {
                                            const value = _d.value;
                                            const setting = Settings_1.settings.get(value.id);
                                            const currentValue = configuration.get(value.key);
                                            if (setting !== currentValue) {
                                                yield configuration.update(value.key, setting, true);
                                            }
                                        }
                                    }
                                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                    finally {
                                        try {
                                            if (_d && !_d.done && (_b = _c.return)) yield _b.call(_c);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                    }
                                    yield updateFromChildren(category.children, configuration);
                                }
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (categories_1_1 && !categories_1_1.done && (_a = categories_1.return)) yield _a.call(categories_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                }
                this.updatingSettings = false;
            }
            return true;
        });
        this.taskPromptCallback = (text, isPassword) => {
            return new Promise((resolve) => {
                const match = text.match(/\[([\w\d\s/]+)\]:\s*?$/);
                if (match && match.length === 2 && match.index) {
                    const buttons = match[1].split("/");
                    for (let i = 0; i < buttons.length; i++) {
                        buttons[i] = buttons[i].charAt(0).toUpperCase() + buttons[i].slice(1);
                    }
                    void vscode_1.window.showInformationMessage(text.substring(0, match.index) + "?", ...buttons).then((value) => {
                        resolve(value);
                    });
                }
                else {
                    void vscode_1.window.showInputBox({ title: text, password: isPassword }).then((value) => {
                        resolve(value);
                    });
                }
            });
        };
        this.taskMessageCallback = (message) => {
            if (typeof message === "string") {
                extension_1.taskOutputChannel.append(message);
            }
            else {
                extension_1.taskOutputChannel.append(JSON.stringify(message));
            }
        };
        this.setupEnvironment();
        Requisitions_1.requisitions.register("settingsChanged", this.updateVscodeSettings);
        this.serverResponseListener = Dispatch_1.ListenerEntry.createByClass("serverResponse", { persistent: true });
        this.serverResponseListener.catch((errorEvent) => {
            void vscode_1.window.showErrorMessage(`Backend Error: ${errorEvent.data.error}`);
        });
        this.sessionListener = Dispatch_1.ListenerEntry.createByClass("webSession", { filters: [Dispatch_1.eventFilterNoRequests], persistent: true });
        this.sessionListener.then((event) => {
            var _a, _b;
            if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.sessionUuid) {
                WebSession_1.webSession.sessionId = event.data.sessionUuid;
                WebSession_1.webSession.localUserMode = event.data.localUserMode;
            }
            if (WebSession_1.webSession.userName === "") {
                if ((_b = event.data) === null || _b === void 0 ? void 0 : _b.localUserMode) {
                    ShellInterface_1.ShellInterface.users.authenticate("LocalAdministrator", "")
                        .then((authEvent) => {
                        this.onAuthentication(authEvent);
                    });
                }
            }
            else if (event.data) {
                WebSession_1.webSession.loadProfile(event.data.activeProfile);
                this.activeProfile = event.data.activeProfile;
            }
        }).catch((event) => {
            (0, extension_1.printChannelOutput)("Internal error: " + String(event.stack), true);
        });
    }
    closeAllTabs() {
        this.dbEditorCommandHandler.closeProviders();
        this.shellConsoleCommandHandler.closeProviders();
    }
    addNewShellTask(caption, shellArgs, dbConnectionId) {
        const task = new ShellTask_1.ShellTask(caption, this.taskPromptCallback, this.taskMessageCallback);
        this.shellTasks.push(task);
        this.shellTasksTreeDataProvider.refresh();
        extension_1.taskOutputChannel.show();
        return task.runTask(shellArgs, dbConnectionId).then(() => {
            this.shellTasksTreeDataProvider.refresh();
        });
    }
    setupEnvironment() {
        this.dbEditorCommandHandler.setup(this.context);
        this.shellConsoleCommandHandler.setup(this.context);
        this.mrsCommandHandler.setup(this.context, this);
        this.mdsCommandHandler.setup(this.context, this);
        const updateLogLevel = () => {
            const configuration = vscode_1.workspace.getConfiguration(`msg.debugLog`);
            const level = configuration.get("level", "INFO");
            void ShellInterface_1.ShellInterface.core.setLogLevel(level).catch((error) => {
                void vscode_1.window.showErrorMessage("Error while setting log level: " + String(error));
            });
        };
        updateLogLevel();
        this.context.subscriptions.push(vscode_1.workspace.onDidChangeConfiguration((event) => {
            if (event.affectsConfiguration("msg")) {
                updateLogLevel();
                this.updateProfileSettings();
            }
        }));
        this.consoleTreeDataProvider = new ShellConsolesTreeProvider_1.ShellConsolesTreeDataProvider();
        this.context.subscriptions.push(vscode_1.window.registerTreeDataProvider("msg.consoles", this.consoleTreeDataProvider));
        this.shellTasksTreeDataProvider = new ShellTasksTreeProvider_1.ShellTasksTreeDataProvider(this.shellTasks);
        this.context.subscriptions.push(vscode_1.window.registerTreeDataProvider("msg.shellTasks", this.shellTasksTreeDataProvider));
        this.context.subscriptions.push(vscode_1.commands.registerCommand("msg.selectProfile", () => {
            this.selectProfile();
        }));
        this.context.subscriptions.push(vscode_1.commands.registerCommand("msg.dumpSchemaToDisk", (item) => {
            if (item) {
                void vscode_1.window.showOpenDialog({
                    title: "Select an output folder for the dump.",
                    openLabel: "Select Dump Folder",
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false,
                }).then((targetUri) => {
                    if (targetUri && targetUri.length === 1) {
                        const shellArgs = [
                            "--",
                            "util",
                            "dump-schemas",
                            item.schema,
                            "--outputUrl",
                            targetUri[0].fsPath,
                        ];
                        void this.addNewShellTask(`Dump Schema ${item.schema} to Disk`, shellArgs, item.entry.details.id)
                            .then(() => {
                            this.shellTasksTreeDataProvider.refresh();
                        });
                    }
                });
            }
        }));
        this.context.subscriptions.push(vscode_1.commands.registerCommand("msg.dumpSchemaToDiskForMds", (item) => {
            if (item) {
                void vscode_1.window.showOpenDialog({
                    title: "Select an output folder for the dump.",
                    openLabel: "Select Dump Folder",
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false,
                }).then((targetUri) => {
                    if (targetUri && targetUri.length === 1) {
                        const shellArgs = [
                            "--",
                            "util",
                            "dump-schemas",
                            item.schema,
                            "--outputUrl",
                            targetUri[0].fsPath,
                            "--ocimds",
                            "true",
                            "--compatibility",
                            "create_invisible_pks,force_innodb,skip_invalid_accounts," +
                                "strip_definers,strip_restricted_grants,strip_tablespaces",
                        ];
                        void this.addNewShellTask(`Dump Schema ${item.schema} to Disk`, shellArgs, item.entry.details.id)
                            .then(() => {
                            this.shellTasksTreeDataProvider.refresh();
                        });
                    }
                });
            }
        }));
        this.context.subscriptions.push(vscode_1.commands.registerCommand("msg.loadDumpFromDisk", (item) => {
            if (item) {
                void vscode_1.window.showOpenDialog({
                    title: "Select a folder that contains a MySQL Shell dump.",
                    openLabel: "Select Dump Folder",
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false,
                }).then((targetUri) => {
                    if (targetUri && targetUri.length === 1) {
                        const shellArgs = [
                            "--",
                            "util",
                            "load-dump",
                            targetUri[0].fsPath,
                        ];
                        let folderName = "";
                        const m = targetUri[0].fsPath.match(/([^/]*)\/*$/);
                        if (m && m.length > 1) {
                            folderName = m[1] + " ";
                        }
                        void this.addNewShellTask(`Loading Dump ${folderName}from Disk`, shellArgs, item.entry.details.id)
                            .then(() => {
                            this.shellTasksTreeDataProvider.refresh();
                            void vscode_1.commands.executeCommand("msg.refreshConnections");
                        });
                    }
                });
            }
        }));
    }
    onAuthentication(event) {
        var _a;
        this.activeProfile = (_a = event.data) === null || _a === void 0 ? void 0 : _a.activeProfile;
        ShellInterface_1.ShellInterface.modules.listDataCategories().then((list) => {
            list.data.result.forEach((row) => {
                this.moduleDataCategories.set(row.name, row);
            });
            this.dbEditorCommandHandler.refreshConnectionTree();
            this.consoleTreeDataProvider.refresh([]);
            void vscode_1.commands.executeCommand("msg.mds.refreshOciProfiles");
        });
    }
    updateProfileSettings() {
        if (!this.updatingSettings) {
            this.updatingSettings = true;
            const handleChildren = (children, configuration) => {
                children === null || children === void 0 ? void 0 : children.forEach((child) => {
                    child.values.forEach((value) => {
                        const configValue = configuration === null || configuration === void 0 ? void 0 : configuration.get(`${child.key}.${value.key}`);
                        if (!(0, lodash_1.isNil)(configValue)) {
                            Settings_1.settings.set(value.id, configValue);
                        }
                    });
                    handleChildren(child.children, configuration);
                });
            };
            const categories = SettingsRegistry_1.settingCategories.children;
            if (categories) {
                categories.forEach((category) => {
                    const configuration = vscode_1.workspace.getConfiguration(`msg.${category.key}`);
                    category.values.forEach((value) => {
                        const configValue = configuration.get(value.key);
                        if (!(0, lodash_1.isNil)(configValue)) {
                            Settings_1.settings.set(value.id, configValue);
                        }
                    });
                    handleChildren(category.children, configuration);
                });
            }
            Settings_1.settings.saveSettings();
            this.updatingSettings = false;
        }
    }
    selectProfile() {
        if (this.activeProfile) {
            ShellInterface_1.ShellInterface.users.listProfiles(this.activeProfile.userId).then((event) => {
                var _a;
                if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.rows) {
                    const items = event.data.rows.map((value) => {
                        return value.name;
                    });
                    void vscode_1.window.showQuickPick(items, {
                        title: "Activate a Profile",
                        matchOnDescription: true,
                        placeHolder: "Type the name of an existing profile",
                    }).then((name) => {
                        var _a;
                        if (name && ((_a = event.data) === null || _a === void 0 ? void 0 : _a.rows)) {
                            const row = event.data.rows.find((candidate) => { return candidate.name === name; });
                            if (row) {
                                ShellInterface_1.ShellInterface.users.setCurrentProfile(row.id).then(() => {
                                    vscode_1.window.setStatusBarMessage("Profile set successfully", 5000);
                                });
                            }
                        }
                    });
                }
            });
        }
    }
}
exports.ExtensionHost = ExtensionHost;
//# sourceMappingURL=ExtensionHost.js.map