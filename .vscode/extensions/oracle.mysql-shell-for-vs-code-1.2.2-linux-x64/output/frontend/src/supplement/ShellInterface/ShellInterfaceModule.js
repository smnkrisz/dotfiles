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
exports.ShellInterfaceModule = exports.StandardDataCategories = void 0;
const communication_1 = require("../../communication");
const Dispatch_1 = require("../Dispatch");
const SQLNotebook_1 = require("../../modules/SQLNotebook");
var StandardDataCategories;
(function (StandardDataCategories) {
    StandardDataCategories[StandardDataCategories["Text"] = 1] = "Text";
    StandardDataCategories[StandardDataCategories["Script"] = 2] = "Script";
    StandardDataCategories[StandardDataCategories["JSON"] = 3] = "JSON";
    StandardDataCategories[StandardDataCategories["MySQLScript"] = 4] = "MySQLScript";
    StandardDataCategories[StandardDataCategories["PythonScript"] = 5] = "PythonScript";
    StandardDataCategories[StandardDataCategories["JavaScriptScript"] = 6] = "JavaScriptScript";
    StandardDataCategories[StandardDataCategories["TypeScriptScript"] = 7] = "TypeScriptScript";
    StandardDataCategories[StandardDataCategories["SQLiteScript"] = 8] = "SQLiteScript";
})(StandardDataCategories = exports.StandardDataCategories || (exports.StandardDataCategories = {}));
class ShellInterfaceModule {
    constructor() {
        this.id = "module";
        this.scriptCategoryToLanguage = new Map([
            [StandardDataCategories.MySQLScript, "mysql"],
            [StandardDataCategories.PythonScript, "python"],
            [StandardDataCategories.JavaScriptScript, "javascript"],
            [StandardDataCategories.TypeScriptScript, "typescript"],
            [StandardDataCategories.SQLiteScript, "sql"],
            [StandardDataCategories.JSON, "json"],
        ]);
        this.languageToScriptCategory = new Map([
            ["mysql", StandardDataCategories.MySQLScript],
            ["python", StandardDataCategories.MySQLScript],
            ["javascript", StandardDataCategories.MySQLScript],
            ["typescript", StandardDataCategories.MySQLScript],
            ["sql", StandardDataCategories.MySQLScript],
            ["json", StandardDataCategories.MySQLScript],
        ]);
        this.loadScriptStates = (folderId, dataCategoryId) => {
            return new Promise((resolve, reject) => {
                const listData = [];
                this.listData(folderId, dataCategoryId).then((scriptEvent) => {
                    if (!scriptEvent.data) {
                        return;
                    }
                    switch (scriptEvent.eventType) {
                        case Dispatch_1.EventType.DataResponse:
                        case Dispatch_1.EventType.FinalResponse: {
                            listData.push(...scriptEvent.data.result.map((entry) => {
                                var _a;
                                const language = (_a = this.scriptCategoryToLanguage.get(entry.dataCategoryId)) !== null && _a !== void 0 ? _a : "mysql";
                                return {
                                    id: `script-${entry.id}`,
                                    folderId,
                                    type: SQLNotebook_1.EntityType.Script,
                                    caption: entry.caption,
                                    language,
                                    moduleDataId: entry.id,
                                };
                            }));
                            if (scriptEvent.eventType === Dispatch_1.EventType.FinalResponse) {
                                resolve(listData);
                            }
                            break;
                        }
                        default: {
                            break;
                        }
                    }
                }).catch((event) => {
                    reject(String(event.message));
                });
            });
        };
    }
    addData(caption, content, dataCategoryId, treeIdentifier, folderPath, profileId) {
        const request = communication_1.ProtocolGui.getRequestModulesAddData(caption, content, dataCategoryId, treeIdentifier, folderPath, profileId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "addData" });
    }
    listData(folderId, dataCategoryId) {
        const request = communication_1.ProtocolGui.getRequestModulesListData(folderId, dataCategoryId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listData" });
    }
    getDataContent(dataId) {
        const request = communication_1.ProtocolGui.getRequestModulesGetDataContent(dataId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getDataContent" });
    }
    createProfileDataTree(treeIdentifier, profileId) {
        const request = communication_1.ProtocolGui.getRequestModulesCreateProfileDataTree(treeIdentifier, profileId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "createProfileDataTree" });
    }
    getProfileDataTree(treeIdentifier, profileId) {
        const request = communication_1.ProtocolGui.getRequestModulesGetProfileDataTree(treeIdentifier, profileId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getProfileDataTree" });
    }
    createUserGroupDataTree(treeIdentifier, userGroupId) {
        const request = communication_1.ProtocolGui.getRequestModulesCreateUserGroupDataTree(treeIdentifier, userGroupId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "createUserGroupDataTree" });
    }
    getUserGroupDataTree(treeIdentifier, userGroupId) {
        const request = communication_1.ProtocolGui.getRequestModulesGetUserGroupDataTree(treeIdentifier, userGroupId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getUserGroupDataTree" });
    }
    getProfileDataTreeIdentifiers(profileId) {
        const request = communication_1.ProtocolGui.getRequestModulesGetProfileTreeIdentifiers(profileId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getProfileDataTreeIdentifiers" });
    }
    shareDataToUserGroup(id, userGroupId, readOnly, treeIdentifier, folderPath) {
        const request = communication_1.ProtocolGui.getRequestModulesShareDataToUserGroup(id, userGroupId, readOnly, treeIdentifier, folderPath);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "shareDataToUserGroup" });
    }
    addDataToProfile(id, profileId, readOnly, treeIdentifier, folderPath) {
        const request = communication_1.ProtocolGui.getRequestModulesAddDataToProfile(id, profileId, readOnly, treeIdentifier, folderPath);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "addDataToProfile" });
    }
    updateData(id, caption, content) {
        const request = communication_1.ProtocolGui.getRequestModulesUpdateData(id, caption, content);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "updateData" });
    }
    deleteData(id, folderId) {
        const request = communication_1.ProtocolGui.getRequestModulesDeleteData(id, folderId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "deleteData" });
    }
    listDataCategories(parentID) {
        const request = communication_1.ProtocolGui.getRequestModulesListDataCategories(parentID);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listDataCategories" });
    }
    addDataCategory(category, parent) {
        const request = communication_1.ProtocolGui.getRequestModulesAddDataCategory(category, parent);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "addDataCategory" });
    }
    removeDataCategory(categoryId) {
        const request = communication_1.ProtocolGui.getRequestModulesRemoveDataCategory(categoryId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "removeDataCategory" });
    }
    scriptTypeFromLanguage(language) {
        return this.languageToScriptCategory.get(language);
    }
    loadScriptsTree(profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.loadScriptTreeEntries(StandardDataCategories.Script, profileId);
        });
    }
    loadScriptTreeEntries(categoryId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataTree = yield this.loadDataTree("scripts", profileId);
            const createTree = (parentId, target) => __awaiter(this, void 0, void 0, function* () {
                var e_1, _a;
                const result = dataTree.filter((entry, index, arr) => {
                    if (entry.parentFolderId === parentId) {
                        arr.splice(index, 1);
                        return true;
                    }
                    return false;
                });
                try {
                    for (var result_1 = __asyncValues(result), result_1_1; result_1_1 = yield result_1.next(), !result_1_1.done;) {
                        const entry = result_1_1.value;
                        const entries = yield this.loadScriptStates(entry.id, categoryId);
                        yield createTree(entry.id, entries);
                        target.push({
                            id: "",
                            folderId: parentId,
                            moduleDataId: entry.id,
                            caption: entry.caption,
                            children: entries,
                            type: SQLNotebook_1.EntityType.Folder,
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (result_1_1 && !result_1_1.done && (_a = result_1.return)) yield _a.call(result_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
            const result = [];
            if (dataTree.length > 0 && dataTree[0].caption === "scripts") {
                const root = dataTree.shift();
                const states = yield this.loadScriptStates(root.id, categoryId);
                result.push(...states);
                yield createTree(root.id, result);
            }
            return result;
        });
    }
    loadDataTree(treeIdentifier, profileId) {
        return new Promise((resolve, reject) => {
            this.getProfileDataTree(treeIdentifier, profileId).then((treeIdentEvent) => {
                var _a;
                const result = (_a = treeIdentEvent.data) === null || _a === void 0 ? void 0 : _a.result;
                const list = [];
                switch (treeIdentEvent.eventType) {
                    case Dispatch_1.EventType.DataResponse: {
                        if (result) {
                            list.push(...result);
                        }
                        break;
                    }
                    case Dispatch_1.EventType.FinalResponse:
                        if (result) {
                            list.push(...result);
                        }
                        resolve(list);
                        break;
                    default:
                }
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
}
exports.ShellInterfaceModule = ShellInterfaceModule;
//# sourceMappingURL=ShellInterfaceModule.js.map