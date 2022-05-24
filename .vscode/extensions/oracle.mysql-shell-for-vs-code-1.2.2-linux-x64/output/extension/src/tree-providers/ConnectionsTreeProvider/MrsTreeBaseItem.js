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
exports.MrsTreeBaseItem = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
class MrsTreeBaseItem extends vscode_1.TreeItem {
    constructor(label, entry, hasChildren, iconName) {
        super(label, hasChildren ? vscode_1.TreeItemCollapsibleState.Collapsed : vscode_1.TreeItemCollapsibleState.None);
        this.entry = entry;
        if (iconName) {
            this.iconPath = {
                light: path.join(__dirname, "..", "..", "..", "..", "..", "images", "light", iconName),
                dark: path.join(__dirname, "..", "..", "..", "..", "..", "images", "dark", iconName),
            };
        }
        else {
            this.iconPath = {
                light: path.join(__dirname, "..", "..", "..", "..", "..", "images", "light", this.iconName),
                dark: path.join(__dirname, "..", "..", "..", "..", "..", "images", "dark", this.iconName),
            };
        }
    }
    get iconName() {
        return "mrs.svg";
    }
}
exports.MrsTreeBaseItem = MrsTreeBaseItem;
//# sourceMappingURL=MrsTreeBaseItem.js.map