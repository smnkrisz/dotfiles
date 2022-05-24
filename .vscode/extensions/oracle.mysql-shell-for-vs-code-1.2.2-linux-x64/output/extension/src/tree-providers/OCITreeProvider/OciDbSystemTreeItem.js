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
exports.OciDbSystemTreeItem = void 0;
const vscode_1 = require("vscode");
const path = __importStar(require("path"));
const OciBaseTreeItem_1 = require("./OciBaseTreeItem");
class OciDbSystemTreeItem extends OciBaseTreeItem_1.OciBaseTreeItem {
    constructor(profile, compartment, dbSystem) {
        super(dbSystem.displayName, profile, vscode_1.TreeItemCollapsibleState.None);
        this.compartment = compartment;
        this.dbSystem = dbSystem;
        this.contextValue = "mdsDbSystem";
        let iconName = "ociDbSystemNotActive.svg";
        if (dbSystem.lifecycleState === "ACTIVE") {
            iconName = "ociDbSystem.svg";
        }
        else if (dbSystem.lifecycleState === "INACTIVE" ||
            dbSystem.lifecycleState === "FAILED") {
            iconName = "ociDbSystemStopped.svg";
        }
        this.iconPath = {
            light: path.join(__dirname, "..", "..", "..", "..", "..", "images", "light", iconName),
            dark: path.join(__dirname, "..", "..", "..", "..", "..", "images", "dark", iconName),
        };
    }
}
exports.OciDbSystemTreeItem = OciDbSystemTreeItem;
//# sourceMappingURL=OciDbSystemTreeItem.js.map