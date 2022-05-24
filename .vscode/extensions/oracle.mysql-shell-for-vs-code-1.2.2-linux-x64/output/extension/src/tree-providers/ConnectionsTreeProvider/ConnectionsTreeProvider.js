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
exports.ConnectionsTreeDataProvider = void 0;
const vscode_1 = require("vscode");
const Requisitions_1 = require("../../../../frontend/src/supplement/Requisitions");
const ShellInterface_1 = require("../../../../frontend/src/supplement/ShellInterface");
const communication_1 = require("../../../../frontend/src/communication");
const Dispatch_1 = require("../../../../frontend/src/supplement/Dispatch");
const WebSession_1 = require("../../../../frontend/src/supplement/WebSession");
const ConnectionTreeItem_1 = require("./ConnectionTreeItem");
const SchemaTreeItem_1 = require("./SchemaTreeItem");
const SchemaMySQLTreeItem_1 = require("./SchemaMySQLTreeItem");
const SchemaGroupTreeItem_1 = require("./SchemaGroupTreeItem");
const SchemaIndex_1 = require("./SchemaIndex");
const extension_1 = require("../../extension");
const _1 = require(".");
const helpers_1 = require("../../../../frontend/src/utilities/helpers");
const SchemaListTreeItem_1 = require("./SchemaListTreeItem");
class ConnectionsTreeDataProvider {
    constructor() {
        this.connections = [];
        this.changeEvent = new vscode_1.EventEmitter();
        this.refreshConnections = (data) => {
            this.refresh(data === null || data === void 0 ? void 0 : data.item);
            return Promise.resolve(true);
        };
        this.useDedicatedSchemaSubtree = false;
        Requisitions_1.requisitions.register("refreshConnections", this.refreshConnections);
    }
    get onDidChangeTreeData() {
        return this.changeEvent.event;
    }
    dispose() {
        Requisitions_1.requisitions.unregister("refreshConnections", this.refreshConnections);
        this.closeAllConnections();
    }
    refresh(item) {
        if (!item) {
            void this.updateConnections().then(() => {
                this.changeEvent.fire(item);
            });
        }
        else {
            this.changeEvent.fire(item);
        }
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return this.connections.map((connection) => {
                switch (connection.details.dbType) {
                    case ShellInterface_1.DBType.MySQL: {
                        return new _1.ConnectionMySQLTreeItem(connection);
                    }
                    case ShellInterface_1.DBType.Sqlite: {
                        return new _1.ConnectionSqliteTreeItem(connection);
                    }
                    default: {
                        throw new Error("Unsupported DB type: " + String(connection.details.dbType));
                    }
                }
            });
        }
        if (element instanceof ConnectionTreeItem_1.ConnectionTreeItem) {
            if (this.useDedicatedSchemaSubtree) {
                const items = [];
                if (element.entry.details.dbType === ShellInterface_1.DBType.MySQL) {
                    items.push(new _1.AdminTreeItem("MySQL Administration", "", element.entry, true));
                }
                items.push(new SchemaListTreeItem_1.SchemaListTreeItem("Schemas", "", element.entry, true));
                return items;
            }
            return this.updateSchemaList(element.entry);
        }
        if (element instanceof _1.AdminTreeItem) {
            const serverStatusCommand = {
                title: "Show Server Status",
                command: "msg.showServerStatus",
                arguments: ["Server Status", element.entry.details.id],
            };
            const clientConnectionsCommand = {
                title: "Show Client Connections",
                command: "msg.showClientConnections",
                arguments: ["Client Connections", element.entry.details.id],
            };
            const performanceDashboardCommand = {
                title: "Show Performance Dashboard",
                command: "msg.showPerformanceDashboard",
                arguments: ["Performance Dashboard", element.entry.details.id],
            };
            return [
                new _1.AdminSectionTreeItem("Server Status", "", element.entry, false, "adminServerStatus.svg", serverStatusCommand),
                new _1.AdminSectionTreeItem("Client Connections", "", element.entry, false, "clientConnections.svg", clientConnectionsCommand),
                new _1.AdminSectionTreeItem("Performance Dashboard", "", element.entry, false, "adminPerformanceDashboard.svg", performanceDashboardCommand),
            ];
        }
        if (this.useDedicatedSchemaSubtree) {
            if (element instanceof SchemaListTreeItem_1.SchemaListTreeItem) {
                return this.updateSchemaList(element.entry);
            }
        }
        if (element instanceof SchemaTreeItem_1.SchemaTreeItem) {
            const result = [
                new SchemaGroupTreeItem_1.SchemaGroupTreeItem(element.schema, element.entry, SchemaIndex_1.SchemaItemGroupType.Tables),
                new SchemaGroupTreeItem_1.SchemaGroupTreeItem(element.schema, element.entry, SchemaIndex_1.SchemaItemGroupType.Views),
            ];
            if (element.entry.details.dbType === ShellInterface_1.DBType.MySQL) {
                result.push(new SchemaGroupTreeItem_1.SchemaGroupTreeItem(element.schema, element.entry, SchemaIndex_1.SchemaItemGroupType.Routines));
                result.push(new SchemaGroupTreeItem_1.SchemaGroupTreeItem(element.schema, element.entry, SchemaIndex_1.SchemaItemGroupType.Events));
            }
            return result;
        }
        if (element instanceof SchemaGroupTreeItem_1.SchemaGroupTreeItem) {
            return this.loadSchemaMembers(element);
        }
        if (element instanceof _1.SchemaTableTreeItem) {
            return [
                new _1.TableGroupTreeItem(element.schema, element.name, element.entry, SchemaIndex_1.SchemaItemGroupType.Columns),
                new _1.TableGroupTreeItem(element.schema, element.name, element.entry, SchemaIndex_1.SchemaItemGroupType.Indexes),
                new _1.TableGroupTreeItem(element.schema, element.name, element.entry, SchemaIndex_1.SchemaItemGroupType.ForeignKeys),
                new _1.TableGroupTreeItem(element.schema, element.name, element.entry, SchemaIndex_1.SchemaItemGroupType.Triggers),
            ];
        }
        if (element instanceof _1.TableGroupTreeItem) {
            return this.loadTableMembers(element);
        }
        if (element instanceof _1.MrsTreeItem) {
            return this.listMrsServices(element);
        }
        if (element instanceof _1.MrsServiceTreeItem) {
            return this.listMrsSchemas(element);
        }
        if (element instanceof _1.MrsSchemaTreeItem) {
            return this.listMrsDbObjects(element);
        }
        return Promise.resolve([]);
    }
    closeAllConnections() {
        this.connections.forEach((entry) => {
            if (entry.backend) {
                entry.backend.closeSession().catch(() => { });
            }
        });
        this.connections = [];
    }
    updateConnections() {
        return new Promise((resolve, reject) => {
            if (WebSession_1.webSession.currentProfileId === -1) {
                this.closeAllConnections();
                resolve();
            }
            else {
                const details = [];
                ShellInterface_1.ShellInterface.dbConnections.listDbConnections(WebSession_1.webSession.currentProfileId, "")
                    .then((event) => {
                    var _a, _b, _c, _d;
                    if (!event.data) {
                        return;
                    }
                    const resultData = (0, helpers_1.convertSnakeToCamelCase)(event.data);
                    const entries = resultData.rows;
                    switch (event.eventType) {
                        case Dispatch_1.EventType.DataResponse: {
                            if ((_a = event.data) === null || _a === void 0 ? void 0 : _a.rows) {
                                details.push(...entries);
                            }
                            break;
                        }
                        case Dispatch_1.EventType.FinalResponse: {
                            if ((_b = event.data) === null || _b === void 0 ? void 0 : _b.rows) {
                                details.push(...entries);
                            }
                            let left = 0;
                            let right = 0;
                            while (left < this.connections.length && details.length > 0) {
                                if (this.connections[left].details.caption === details[right].caption) {
                                    if (right > 0) {
                                        for (let i = 0; i < right; ++i) {
                                            this.connections.splice(left, 0, {
                                                id: String(ConnectionsTreeDataProvider.nextId++),
                                                details: details[i],
                                            });
                                        }
                                        details.splice(0, right);
                                        right = 0;
                                    }
                                    ++left;
                                    details.shift();
                                }
                                else {
                                    while (++right < details.length) {
                                        if (this.connections[left].details.caption === details[right].caption) {
                                            break;
                                        }
                                    }
                                    if (right === details.length) {
                                        const entry = this.connections.splice(left, 1)[0];
                                        void ((_c = entry.backend) === null || _c === void 0 ? void 0 : _c.closeSession());
                                        right = 0;
                                    }
                                }
                            }
                            while (details.length > 0) {
                                ++left;
                                this.connections.push({
                                    id: String(ConnectionsTreeDataProvider.nextId++),
                                    details: details.shift(),
                                });
                            }
                            while (left < this.connections.length) {
                                const entry = this.connections.splice(left, 1)[0];
                                void ((_d = entry.backend) === null || _d === void 0 ? void 0 : _d.closeSession());
                            }
                            resolve();
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }).catch((event) => {
                    var _a;
                    const message = (_a = event.message) !== null && _a !== void 0 ? _a : String(event);
                    void vscode_1.window.showErrorMessage("Cannot load DB connections: " + message);
                    reject();
                });
            }
        });
    }
    updateSchemaList(entry) {
        if (!entry.backend) {
            return new Promise((resolve, reject) => {
                entry.backend = new ShellInterface_1.ShellInterfaceSqlEditor();
                entry.backend.startSession(entry.id).then(() => {
                    if (entry.backend && entry.details.dbType === ShellInterface_1.DBType.Sqlite) {
                        const options = entry.details.options;
                        ShellInterface_1.ShellInterface.core.validatePath(options.dbFile).then(() => {
                            this.openNewConnection(entry).then((items) => {
                                resolve(items);
                            }).catch((reason) => {
                                reject(reason);
                            });
                        }).catch(() => {
                            if (entry.backend) {
                                ShellInterface_1.ShellInterface.core.createDatabaseFile(options.dbFile).then(() => {
                                    this.openNewConnection(entry).then((items) => {
                                        resolve(items);
                                    }).catch((reason) => {
                                        reject(reason);
                                    });
                                }).catch((errorEvent) => {
                                    var _a;
                                    reject();
                                    void vscode_1.window.showErrorMessage(`DB Creation Error: \n` +
                                        `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`, "OK");
                                });
                            }
                            else {
                                reject();
                            }
                        });
                    }
                    else {
                        this.openNewConnection(entry).then((items) => {
                            resolve(items);
                        }).catch((reason) => {
                            var _a;
                            void ((_a = entry.backend) === null || _a === void 0 ? void 0 : _a.closeSession());
                            entry.backend = undefined;
                            reject(reason);
                        });
                    }
                }).catch((errorEvent) => {
                    var _a;
                    reject();
                    void vscode_1.window.showErrorMessage(`Error during module session creation: \n` +
                        `${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`, "OK");
                });
            });
        }
        else {
            return this.doUpdateSchemaList(entry);
        }
    }
    doUpdateSchemaList(entry) {
        return new Promise((resolve, reject) => {
            if (entry.backend) {
                const schemaList = [];
                if (entry.details.dbType === ShellInterface_1.DBType.MySQL) {
                    schemaList.push(new _1.AdminTreeItem("MySQL Administration", "", entry, true));
                }
                entry.backend.getCatalogObjects("Schema", "").then((schemas) => {
                    schemas.forEach((schema) => {
                        if (entry.details.dbType === "MySQL") {
                            if (schema === "mysql_rest_service_metadata") {
                                schemaList.unshift(new _1.MrsTreeItem("MySQL REST Service", schema, entry, true));
                            }
                            let hideSystemSchemas = true;
                            if (entry.details.hideSystemSchemas !== undefined) {
                                hideSystemSchemas = entry.details.hideSystemSchemas;
                            }
                            if ((schema !== "mysql" &&
                                schema !== "mysql_innodb_cluster_metadata" &&
                                schema !== "mysql_rest_service_metadata")
                                || !hideSystemSchemas) {
                                schemaList.push(new SchemaMySQLTreeItem_1.SchemaMySQLTreeItem(schema, schema, entry, true));
                            }
                        }
                        else {
                            schemaList.push(new SchemaTreeItem_1.SchemaTreeItem(schema, schema, entry, true));
                        }
                    });
                    resolve(schemaList);
                }).catch((reason) => {
                    reject(`Error retrieving schema list: ${String(reason)}`);
                });
            }
            else {
                reject();
            }
        });
    }
    openNewConnection(entry) {
        return new Promise((resolve, reject) => {
            if (entry.backend) {
                entry.backend.openConnection(entry.details.id).then((event) => {
                    var _a;
                    switch (event.eventType) {
                        case Dispatch_1.EventType.DataResponse: {
                            const result = (_a = event.data) === null || _a === void 0 ? void 0 : _a.result;
                            if (this.isShellPromptResult(result)) {
                                if (result.password) {
                                    void vscode_1.window.showInputBox({
                                        title: (0, helpers_1.stripAnsiCode)(result.password),
                                        password: true,
                                    }).then((value) => {
                                        if (event.data && event.data.requestId) {
                                            if (value) {
                                                entry.backend.sendReply(event.data.requestId, communication_1.ShellPromptResponseType.Ok, value);
                                            }
                                            else {
                                                entry.backend.sendReply(event.data.requestId, communication_1.ShellPromptResponseType.Cancel, "");
                                            }
                                        }
                                    });
                                }
                                else if (result.prompt) {
                                    void vscode_1.window.showInputBox({
                                        title: (0, helpers_1.stripAnsiCode)(result.prompt),
                                        password: false,
                                        value: "N",
                                    }).then((value) => {
                                        if (event.data && event.data.requestId) {
                                            if (value) {
                                                entry.backend.sendReply(event.data.requestId, communication_1.ShellPromptResponseType.Ok, value);
                                            }
                                            else {
                                                entry.backend.sendReply(event.data.requestId, communication_1.ShellPromptResponseType.Cancel, "");
                                            }
                                        }
                                    });
                                }
                            }
                            else if (event.message) {
                                (0, extension_1.showStatusText)(event.message);
                            }
                            break;
                        }
                        case Dispatch_1.EventType.FinalResponse: {
                            this.updateSchemaList(entry).then((list) => {
                                resolve(list);
                            }).catch((reason) => {
                                reject(reason);
                            });
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }).catch((errorEvent) => {
                    var _a;
                    reject(`Error during open connection: ${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                });
            }
            else {
                reject();
            }
        });
    }
    loadSchemaMembers(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!element.entry.backend) {
                return [];
            }
            const name = element.label;
            const schema = element.schema;
            const entry = element.entry;
            const items = [];
            const objectType = name.slice(0, -1);
            if (objectType === "Routine") {
                const createItems = (type, list) => {
                    for (const objectName of list) {
                        items.push(new _1.SchemaRoutineTreeItem(objectName, schema, type, entry, false));
                    }
                };
                try {
                    let names = yield element.entry.backend.getSchemaObjects(element.schema, objectType, "function");
                    createItems("function", names);
                    names = yield element.entry.backend.getSchemaObjects(element.schema, objectType, "procedure");
                    createItems("procedure", names);
                }
                catch (error) {
                    void vscode_1.window.showErrorMessage("Error while retrieving schema objects: " + error);
                }
            }
            else {
                try {
                    const names = yield element.entry.backend.getSchemaObjects(element.schema, objectType);
                    names.forEach((objectName) => {
                        switch (name) {
                            case SchemaIndex_1.SchemaItemGroupType.Tables: {
                                if (element.entry.details.dbType === "MySQL") {
                                    items.push(new _1.SchemaTableMySQLTreeItem(objectName, schema, entry, true));
                                }
                                else {
                                    items.push(new _1.SchemaTableTreeItem(objectName, schema, entry, true));
                                }
                                break;
                            }
                            case SchemaIndex_1.SchemaItemGroupType.Views: {
                                items.push(new _1.SchemaViewTreeItem(objectName, schema, entry, true));
                                break;
                            }
                            case SchemaIndex_1.SchemaItemGroupType.Events: {
                                items.push(new _1.SchemaEventTreeItem(objectName, schema, entry, false));
                                break;
                            }
                            default:
                        }
                    });
                }
                catch (error) {
                    void vscode_1.window.showErrorMessage("Error while retrieving schema objects: " + error);
                }
            }
            return items;
        });
    }
    loadTableMembers(element) {
        return new Promise((resolve, reject) => {
            if (!element.entry.backend) {
                resolve([]);
                return;
            }
            const itemList = [];
            const name = element.label;
            const schema = element.schema;
            const table = element.table;
            const entry = element.entry;
            const type = name === "Indexes" ? "Index" : name.slice(0, -1);
            element.entry.backend.getTableObjects(element.schema, element.table, type).then((names) => {
                names.forEach((objectName) => {
                    let item;
                    switch (name) {
                        case SchemaIndex_1.SchemaItemGroupType.Columns: {
                            item = new _1.SchemaTableColumnTreeItem(objectName, schema, table, entry);
                            break;
                        }
                        case SchemaIndex_1.SchemaItemGroupType.Indexes: {
                            item = new _1.SchemaTableIndexTreeItem(objectName, schema, table, entry);
                            break;
                        }
                        case SchemaIndex_1.SchemaItemGroupType.ForeignKeys: {
                            item = new _1.SchemaTableForeignKeyTreeItem(objectName, schema, table, entry);
                            break;
                        }
                        case SchemaIndex_1.SchemaItemGroupType.Triggers: {
                            item = new _1.SchemaTableTriggerTreeItem(objectName, schema, table, entry);
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                    if (item) {
                        itemList.push(item);
                    }
                });
                resolve(itemList);
            }).catch((reason) => {
                reject("Error while retrieving schema objects: " + String(reason));
            });
        });
    }
    listMrsServices(element) {
        return new Promise((resolve, reject) => {
            if (element.entry.backend) {
                element.entry.backend.mrs.listServices().then((event) => {
                    if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                        if (event.data) {
                            resolve(event.data.result.map((value) => {
                                return new _1.MrsServiceTreeItem(`${value.urlContextRoot}`, value, element.entry);
                            }));
                        }
                        else {
                            resolve([]);
                        }
                    }
                }).catch((errorEvent) => {
                    var _a;
                    reject(`Error during retrieving MRS services: ${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                });
            }
            else {
                resolve([]);
            }
        });
    }
    listMrsSchemas(element) {
        return new Promise((resolve, reject) => {
            if (element.entry.backend) {
                element.entry.backend.mrs.listSchemas(element.value.id).then((event) => {
                    if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                        if (event.data) {
                            resolve(event.data.result.map((value) => {
                                return new _1.MrsSchemaTreeItem(`${value.name} (${value.requestPath})`, value, element.entry);
                            }));
                        }
                        else {
                            resolve([]);
                        }
                    }
                }).catch((errorEvent) => {
                    var _a;
                    reject(`Error during retrieving MRS schemas: ${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                });
            }
            else {
                resolve([]);
            }
        });
    }
    listMrsDbObjects(element) {
        return new Promise((resolve, reject) => {
            if (element.entry.backend) {
                element.entry.backend.mrs.listDbObjects(element.value.id).then((event) => {
                    if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                        if (event.data) {
                            resolve(event.data.result.map((value) => {
                                return new _1.MrsDbObjectTreeItem(`${value.name} (${value.requestPath})`, value, element.entry);
                            }));
                        }
                        else {
                            resolve([]);
                        }
                    }
                }).catch((errorEvent) => {
                    var _a;
                    reject(`Error during retrieving MRS schema objects: ${(_a = errorEvent.message) !== null && _a !== void 0 ? _a : "<unknown>"}`);
                });
            }
            else {
                resolve([]);
            }
        });
    }
    isShellPromptResult(response) {
        const candidate = response;
        return (candidate === null || candidate === void 0 ? void 0 : candidate.password) !== undefined || (candidate === null || candidate === void 0 ? void 0 : candidate.prompt) !== undefined;
    }
}
exports.ConnectionsTreeDataProvider = ConnectionsTreeDataProvider;
ConnectionsTreeDataProvider.nextId = 1;
//# sourceMappingURL=ConnectionsTreeProvider.js.map