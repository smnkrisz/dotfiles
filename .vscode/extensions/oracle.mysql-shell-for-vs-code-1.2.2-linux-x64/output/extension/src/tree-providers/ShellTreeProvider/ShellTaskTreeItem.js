"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellTaskTreeItem = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
class ShellTaskTreeItem extends vscode_1.TreeItem {
    constructor(task, command) {
        super(`${task.caption} (${task.status})`, vscode_1.TreeItemCollapsibleState.None);
        this.task = task;
        this.contextValue = "shellTask";
        let taskIcon;
        switch (task.status) {
            case "running": {
                taskIcon = "shellTaskRunning.svg";
                break;
            }
            case "done": {
                taskIcon = "shellTaskOk.svg";
                break;
            }
            case "error": {
                taskIcon = "shellTaskError.svg";
                break;
            }
            default: {
                taskIcon = "shellTask.svg";
            }
        }
        this.iconPath = {
            light: path.join(__dirname, "..", "..", "..", "..", "..", "images", "light", taskIcon),
            dark: path.join(__dirname, "..", "..", "..", "..", "..", "images", "dark", taskIcon),
        };
        this.command = command;
    }
}
exports.ShellTaskTreeItem = ShellTaskTreeItem;
//# sourceMappingURL=ShellTaskTreeItem.js.map