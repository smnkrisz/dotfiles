"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlEditorViewProvider = void 0;
const vscode_1 = require("vscode");
const Requisitions_1 = require("../../../frontend/src/supplement/Requisitions");
const ModuleInfo_1 = require("../../../frontend/src/modules/ModuleInfo");
const WebviewProvider_1 = require("./WebviewProvider");
class SqlEditorViewProvider extends WebviewProvider_1.WebviewProvider {
    constructor(url, onDispose) {
        super(url, onDispose);
        this.refreshConnections = () => {
            return Requisitions_1.requisitions.execute("refreshConnections", undefined);
        };
        this.refreshOciTree = () => {
            return Requisitions_1.requisitions.execute("refreshOciTree", undefined);
        };
        this.updateCodeBlock = (data) => {
            return Requisitions_1.requisitions.execute("codeBlocksUpdate", data);
        };
        this.showOpenDialog = (options) => {
            return new Promise((resolve) => {
                var _a;
                const dialogOptions = {
                    defaultUri: vscode_1.Uri.file((_a = options.default) !== null && _a !== void 0 ? _a : ""),
                    openLabel: options.openLabel,
                    canSelectFiles: options.canSelectFiles,
                    canSelectFolders: options.canSelectFolders,
                    canSelectMany: options.canSelectMany,
                    filters: options.filters,
                    title: options.title,
                };
                void vscode_1.window.showOpenDialog(dialogOptions).then((paths) => {
                    var _a;
                    if (paths) {
                        void ((_a = this.requisitions) === null || _a === void 0 ? void 0 : _a.executeRemote("selectFile", paths.map((path) => {
                            return path.fsPath;
                        })));
                    }
                    resolve(true);
                });
            });
        };
    }
    show(caption, page) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page } },
        ], caption, "newConnection");
    }
    showPageSection(caption, page, section) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page } },
            { requestType: "showPageSection", parameter: section },
        ], caption, "newConnection");
    }
    runQuery(caption, page, details) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page, suppressAbout: true } },
            { requestType: "editorRunQuery", parameter: details },
        ], caption, details.linkId === -1 ? "newConnection" : "newConnectionWithEmbeddedSql");
    }
    runScript(caption, page, details) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page, suppressAbout: true } },
            { requestType: "editorRunScript", parameter: details },
        ], caption, "newConnection");
    }
    insertScriptData(state) {
        if (state.moduleDataId) {
            return this.runCommand("editorInsertUserScript", { language: state.language, resourceId: state.moduleDataId }, "", "newConnection");
        }
        return Promise.resolve(false);
    }
    addConnection(caption, mdsData, profileName) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page: "connections" } },
            { requestType: "addNewConnection", parameter: { mdsData, profileName } },
        ], caption, "connections");
    }
    removeConnection(caption, connectionId) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page: "connections" } },
            { requestType: "removeConnection", parameter: connectionId },
        ], caption, "connections");
    }
    editConnection(caption, connectionId) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page: "connections" } },
            { requestType: "editConnection", parameter: connectionId },
        ], caption, "connections");
    }
    duplicateConnection(caption, connectionId) {
        return this.runCommand("job", [
            { requestType: "showModule", parameter: ModuleInfo_1.DBEditorModuleId },
            { requestType: "showPage", parameter: { module: ModuleInfo_1.DBEditorModuleId, page: "connections" } },
            { requestType: "duplicateConnection", parameter: connectionId },
        ], caption, "connections");
    }
    requisitionsCreated() {
        super.requisitionsCreated();
        if (this.requisitions) {
            this.requisitions.register("refreshConnections", this.refreshConnections);
            this.requisitions.register("refreshOciTree", this.refreshOciTree);
            this.requisitions.register("codeBlocksUpdate", this.updateCodeBlock);
            this.requisitions.register("showOpenDialog", this.showOpenDialog);
        }
    }
}
exports.SqlEditorViewProvider = SqlEditorViewProvider;
//# sourceMappingURL=SqlEditorViewProvider.js.map