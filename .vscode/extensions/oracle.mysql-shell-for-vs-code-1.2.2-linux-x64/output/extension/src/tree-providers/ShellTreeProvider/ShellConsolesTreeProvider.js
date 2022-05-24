"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellConsolesTreeDataProvider = void 0;
const vscode_1 = require("vscode");
const Requisitions_1 = require("../../../../frontend/src/supplement/Requisitions");
const ShellConsoleSessionTreeItem_1 = require("./ShellConsoleSessionTreeItem");
class ShellConsolesTreeDataProvider {
    constructor() {
        this.changeEvent = new vscode_1.EventEmitter();
        this.sessions = [];
        this.refreshSessions = (sessions) => {
            this.refresh(sessions);
            return Promise.resolve(true);
        };
        Requisitions_1.requisitions.register("refreshSessions", this.refreshSessions);
    }
    dispose() {
        Requisitions_1.requisitions.unregister("refreshSessions", this.refreshSessions);
    }
    get onDidChangeTreeData() {
        return this.changeEvent.event;
    }
    refresh(sessions) {
        this.sessions = sessions;
        this.changeEvent.fire();
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return this.sessions.map((details) => {
                return new ShellConsoleSessionTreeItem_1.ShellConsoleSessionTreeItem(details, {
                    title: "Open Shell GUI Console",
                    command: "msg.openSession",
                    arguments: [details],
                });
            });
        }
        return Promise.resolve([]);
    }
}
exports.ShellConsolesTreeDataProvider = ShellConsolesTreeDataProvider;
//# sourceMappingURL=ShellConsolesTreeProvider.js.map