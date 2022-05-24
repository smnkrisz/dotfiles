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
exports.OciLoadBalancerTreeItem = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const OciBaseTreeItem_1 = require("./OciBaseTreeItem");
class OciLoadBalancerTreeItem extends OciBaseTreeItem_1.OciBaseTreeItem {
    constructor(profile, compartment, loadBalancer) {
        super(loadBalancer.displayName, profile, vscode_1.TreeItemCollapsibleState.None);
        this.compartment = compartment;
        this.loadBalancer = loadBalancer;
        this.contextValue = "mdsLoadBalancer";
        let iconName = "ociLoadBalancer.svg";
        if (loadBalancer.lifecycleState !== "ACTIVE") {
            iconName = "ociLoadBalancerNotActive.svg";
        }
        this.iconPath = {
            light: path.join(__dirname, "..", "..", "..", "..", "..", "images", "light", iconName),
            dark: path.join(__dirname, "..", "..", "..", "..", "..", "images", "dark", iconName),
        };
    }
}
exports.OciLoadBalancerTreeItem = OciLoadBalancerTreeItem;
//# sourceMappingURL=OciLoadBalancerTreeItem.js.map