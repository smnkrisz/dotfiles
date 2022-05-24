"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellTasksTreeDataProvider = void 0;
const vscode_1 = require("vscode");
const ShellTaskTreeItem_1 = require("./ShellTaskTreeItem");
class ShellTasksTreeDataProvider {
    constructor(tasks) {
        this.tasks = tasks;
        this.changeEvent = new vscode_1.EventEmitter();
        this.statusCallback = (status, item) => {
            if (status) {
                this.refresh(item);
            }
        };
    }
    get onDidChangeTreeData() {
        return this.changeEvent.event;
    }
    dispose() {
    }
    refresh(item) {
        this.changeEvent.fire(item);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return this.tasks.map((task) => {
                const item = new ShellTaskTreeItem_1.ShellTaskTreeItem(task, { title: "Show Task Output", command: "msg.showTaskOutput" });
                task.setStatusCallback(this.statusCallback.bind(item));
                return item;
            });
        }
        return Promise.resolve([]);
    }
}
exports.ShellTasksTreeDataProvider = ShellTasksTreeDataProvider;
//# sourceMappingURL=ShellTasksTreeProvider.js.map