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
exports.ConnectionsTreeBaseItem = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const Dispatch_1 = require("../../../../frontend/src/supplement/Dispatch");
const utilities_1 = require("../../utilities");
class ConnectionsTreeBaseItem extends vscode_1.TreeItem {
    constructor(name, schema, entry, hasChildren, command) {
        super(name, hasChildren ? vscode_1.TreeItemCollapsibleState.Collapsed : vscode_1.TreeItemCollapsibleState.None);
        this.name = name;
        this.schema = schema;
        this.entry = entry;
        this.iconPath = {
            light: path.join(__dirname, "..", "..", "..", "..", "..", "images", "light", this.iconName),
            dark: path.join(__dirname, "..", "..", "..", "..", "..", "images", "dark", this.iconName),
        };
        this.command = command;
    }
    copyNameToClipboard() {
        void vscode_1.env.clipboard.writeText(this.name).then(() => {
            (0, utilities_1.showMessageWithTimeout)("The name was copied to the system clipboard");
        });
    }
    copyCreateScriptToClipboard() {
        var _a;
        (_a = this.entry.backend) === null || _a === void 0 ? void 0 : _a.execute(`show create ${this.dbType} ${this.qualifiedName}`).then((event) => {
            var _a;
            if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.rows) && event.data.rows.length > 0) {
                const row = event.data.rows[0];
                const index = this.createScriptResultIndex;
                if (row.length > index) {
                    void vscode_1.env.clipboard.writeText(row[index]).then(() => {
                        (0, utilities_1.showMessageWithTimeout)("The create script was copied to the system clipboard");
                    });
                }
            }
        }).catch((event) => {
            void vscode_1.window.showErrorMessage("Error while getting create script: " + event.message);
        });
    }
    dropItem() {
        const message = `Do you want to drop the ${this.dbType} ${this.name}?`;
        const okText = `Drop ${this.name}`;
        void (0, utilities_1.showModalDialog)(message, okText, "This operation cannot be reverted!").then((accepted) => {
            var _a;
            if (accepted) {
                const query = `drop ${this.dbType} ${this.qualifiedName}`;
                (_a = this.entry.backend) === null || _a === void 0 ? void 0 : _a.execute(query).then((event) => {
                    switch (event.eventType) {
                        case Dispatch_1.EventType.FinalResponse: {
                            void vscode_1.commands.executeCommand("msg.refreshConnections");
                            (0, utilities_1.showMessageWithTimeout)(`The object ${this.name} has been dropped successfully.`);
                            break;
                        }
                        default:
                    }
                }).catch((errorEvent) => {
                    void vscode_1.window.showErrorMessage(`Error dropping the object: ${errorEvent.message}`);
                });
            }
        });
    }
    get qualifiedName() {
        return "";
    }
    get iconName() {
        return "";
    }
    get dbType() {
        return "";
    }
    get createScriptResultIndex() {
        return 1;
    }
}
exports.ConnectionsTreeBaseItem = ConnectionsTreeBaseItem;
//# sourceMappingURL=ConnectionsTreeBaseItem.js.map