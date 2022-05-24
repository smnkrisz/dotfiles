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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbEditorCommandHandler = void 0;
const vscode_1 = require("vscode");
const Requisitions_1 = require("../../frontend/src/supplement/Requisitions");
const ConnectionsTreeProvider_1 = require("./tree-providers/ConnectionsTreeProvider");
const SqlEditorViewProvider_1 = require("./web-views/SqlEditorViewProvider");
const CodeBlocks_1 = require("./CodeBlocks");
class DbEditorCommandHandler {
    constructor() {
        this.connectionsProvider = new ConnectionsTreeProvider_1.ConnectionsTreeDataProvider();
        this.providers = [];
        this.codeBlocks = new CodeBlocks_1.CodeBlocks();
        this.connectedToUrl = (url) => {
            this.url = url;
            this.closeProviders();
            return Promise.resolve(true);
        };
        this.editorRunQuery = (details) => {
            const provider = this.currentProvider;
            if (provider) {
                return provider.runQuery(details.data.caption, details.data.connectionId, {
                    linkId: details.linkId,
                    query: details.query,
                    data: {},
                    parameters: [],
                });
            }
            return Promise.resolve(false);
        };
        this.determineConnection = () => __awaiter(this, void 0, void 0, function* () {
            const connections = this.connectionsProvider.connections;
            const connectionName = vscode_1.workspace.getConfiguration("msg.editor").get("defaultDbConnection");
            if (connectionName) {
                const connection = connections.find((candidate) => {
                    return candidate.details.caption === connectionName;
                });
                if (connection) {
                    return connection;
                }
            }
            else {
                const items = connections.map((connection) => { return connection.details.caption; });
                const name = yield vscode_1.window.showQuickPick(items, {
                    title: "Select a connection for SQL execution",
                    matchOnDescription: true,
                    placeHolder: "Type the name of an existing DB connection",
                });
                const connection = connections.find((candidate) => {
                    return candidate.details.caption === name;
                });
                if (connection) {
                    return connection;
                }
            }
        });
    }
    setup(context) {
        this.codeBlocks.setup(context);
        context.subscriptions.push(vscode_1.window.registerTreeDataProvider("msg.connections", this.connectionsProvider));
        Requisitions_1.requisitions.register("connectedToUrl", this.connectedToUrl);
        Requisitions_1.requisitions.register("editorRunQuery", this.editorRunQuery);
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.refreshConnections", () => {
            void Requisitions_1.requisitions.execute("refreshConnections", undefined);
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.openConnection", (item) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.show(item.entry.details.caption, String(item.entry.details.id)));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.openConnectionNewTab", (params) => {
            const provider = this.newProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.show(params.entry.details.caption, String(params.entry.details.id)));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.showTableData", (item) => {
            const provider = this.currentProvider;
            const configuration = vscode_1.workspace.getConfiguration(`msg.dbEditor`);
            const uppercaseKeywords = configuration.get("upperCaseKeywords", true);
            const select = uppercaseKeywords ? "SELECT" : "select";
            const from = uppercaseKeywords ? "FROM" : "from";
            void (provider === null || provider === void 0 ? void 0 : provider.runQuery(item.entry.details.caption, String(item.entry.details.id), {
                linkId: -1,
                query: `${select} * ${from} \`${item.schema}\`.\`${item.label}\``,
                data: {},
                parameters: [],
            }));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.showServerStatus", (caption, id) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.showPageSection(caption, String(id), "serverStatus"));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.showClientConnections", (caption, id) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.showPageSection(caption, String(id), "clientConnections"));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.showPerformanceDashboard", (caption, id) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.showPageSection(caption, String(id), "performanceDashboard"));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.insertScript", (item) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.insertScriptData(item.entry));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.addConnection", () => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.addConnection("SQL Connections"));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.refreshConnection", (item) => {
            void Requisitions_1.requisitions.execute("refreshConnections", { item });
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.removeConnection", (item) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.removeConnection("SQL Connections", item.entry.details.id));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.editConnection", (item) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.editConnection("SQL Connections", item.entry.details.id));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.duplicateConnection", (item) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.duplicateConnection("SQL Connections", item.entry.details.id));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.showSystemSchemasOnConnection", (item) => {
            item.entry.details.hideSystemSchemas = false;
            void Requisitions_1.requisitions.execute("refreshConnections", { item });
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.hideSystemSchemasOnConnection", (item) => {
            item.entry.details.hideSystemSchemas = true;
            void Requisitions_1.requisitions.execute("refreshConnections", { item });
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.openDBBrowser", () => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.show("SQL Connections", "connections"));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.dropSchema", (item) => {
            item === null || item === void 0 ? void 0 : item.dropItem();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.dropTable", (item) => {
            item === null || item === void 0 ? void 0 : item.dropItem();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.dropView", (item) => {
            item === null || item === void 0 ? void 0 : item.dropItem();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.dropRoutine", (item) => {
            item === null || item === void 0 ? void 0 : item.dropItem();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.dropTrigger", (item) => {
            item === null || item === void 0 ? void 0 : item.dropItem();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.dropEvent", (item) => {
            item === null || item === void 0 ? void 0 : item.dropItem();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.defaultConnection", (item) => {
            const configuration = vscode_1.workspace.getConfiguration(`msg.editor`);
            void configuration.update("defaultDbConnection", item.label).then(() => {
                void vscode_1.window.showInformationMessage(`"${item.label}" ` +
                    `has been set as default DB Connection for embedded SQL execution.`);
            });
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.copyNameToClipboard", (item) => {
            item.copyNameToClipboard();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.copyCreateScriptToClipboard", (item) => {
            item.copyCreateScriptToClipboard();
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.mds.createConnectionViaBastionService", (item) => {
            if (item) {
                const provider = this.currentProvider;
                void (provider === null || provider === void 0 ? void 0 : provider.addConnection("SQL Connections", item.dbSystem, item.profile.profile));
            }
        }));
        context.subscriptions.push(vscode_1.commands.registerTextEditorCommand("msg.executeEmbeddedSqlFromEditor", (editor) => {
            void this.determineConnection().then((connection) => {
                if (connection) {
                    this.codeBlocks.executeSqlFromEditor(editor, connection.details.caption, connection.details.id);
                }
            });
        }));
        context.subscriptions.push(vscode_1.commands.registerTextEditorCommand("msg.executeSelectedSqlFromEditor", (editor) => {
            void this.determineConnection().then((connection) => {
                if (connection) {
                    const provider = this.currentProvider;
                    if (provider) {
                        let sql = "";
                        if (!editor.selection.isEmpty) {
                            editor.selections.forEach((selection) => {
                                sql += editor.document.getText(selection);
                            });
                        }
                        else {
                            sql = editor.document.getText();
                        }
                        return provider.runScript(connection.details.caption, String(connection.details.id), {
                            content: sql,
                        });
                    }
                }
            });
        }));
    }
    refreshConnectionTree() {
        this.connectionsProvider.closeAllConnections();
        this.connectionsProvider.refresh();
    }
    closeProviders() {
        this.providers.forEach((provider) => {
            provider.close();
        });
        this.providers = [];
    }
    get currentProvider() {
        if (this.providers.length > 0) {
            return this.providers[this.providers.length - 1];
        }
        else {
            return this.newProvider;
        }
    }
    get newProvider() {
        if (this.url) {
            const provider = new SqlEditorViewProvider_1.SqlEditorViewProvider(this.url, (view) => {
                const index = this.providers.findIndex((candidate) => { return candidate === view; });
                if (index > -1) {
                    this.providers.splice(index, 1);
                }
            });
            this.providers.push(provider);
            return provider;
        }
        return undefined;
    }
}
exports.DbEditorCommandHandler = DbEditorCommandHandler;
//# sourceMappingURL=DbEditorCommandHandler.js.map