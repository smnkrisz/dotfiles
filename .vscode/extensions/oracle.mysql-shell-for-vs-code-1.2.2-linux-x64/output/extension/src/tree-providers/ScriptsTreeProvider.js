"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptsTreeDataProvider = void 0;
const vscode_1 = require("vscode");
const ShellInterface_1 = require("../../../frontend/src/supplement/ShellInterface");
const ScriptTreeItem_1 = require("./ScriptTreeItem");
class ScriptsTreeDataProvider {
    constructor(scriptTypeId) {
        this.scriptTypeId = scriptTypeId;
        this.changeEvent = new vscode_1.EventEmitter();
        this.tree = [];
    }
    get onDidChangeTreeData() {
        return this.changeEvent.event;
    }
    refresh() {
        this.changeEvent.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return new Promise((resolve, reject) => {
            if (!element) {
                ShellInterface_1.ShellInterface.modules.loadScriptsTree().then((tree) => {
                    this.tree = tree;
                    const entries = [];
                    this.tree.forEach((entry) => {
                        entries.push(new ScriptTreeItem_1.ScriptTreeItem(entry));
                    });
                    resolve(entries);
                }).catch((reason) => {
                    reject(reason);
                });
            }
            else {
                resolve([]);
            }
        });
    }
}
exports.ScriptsTreeDataProvider = ScriptsTreeDataProvider;
//# sourceMappingURL=ScriptsTreeProvider.js.map