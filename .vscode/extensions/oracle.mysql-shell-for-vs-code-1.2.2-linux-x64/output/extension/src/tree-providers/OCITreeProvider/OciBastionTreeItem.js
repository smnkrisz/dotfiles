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
exports.OciBastionTreeItem = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const OciBaseTreeItem_1 = require("./OciBaseTreeItem");
class OciBastionTreeItem extends OciBaseTreeItem_1.OciBaseTreeItem {
    constructor(profile, compartment, bastion) {
        super(bastion.name, profile, vscode_1.TreeItemCollapsibleState.None);
        this.compartment = compartment;
        this.bastion = bastion;
        this.contextValue = "mdsBastion";
        let iconName = bastion.isCurrent ? "ociBastionCurrent.svg" : "ociBastion.svg";
        if (bastion.lifecycleState !== "ACTIVE") {
            iconName = bastion.isCurrent ? "ociBastionCurrentNotActive.svg" : "ociBastionNotActive.svg";
        }
        this.iconPath = {
            light: path.join(__dirname, "..", "..", "..", "..", "..", "images", "light", iconName),
            dark: path.join(__dirname, "..", "..", "..", "..", "..", "images", "dark", iconName),
        };
    }
}
exports.OciBastionTreeItem = OciBastionTreeItem;
//# sourceMappingURL=OciBastionTreeItem.js.map