"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OciComputeInstanceTreeItem = void 0;
const vscode_1 = require("vscode");
const OciBaseTreeItem_1 = require("./OciBaseTreeItem");
class OciComputeInstanceTreeItem extends OciBaseTreeItem_1.OciBaseTreeItem {
    constructor(profile, compartment, compute, shellSession) {
        var _a;
        super((_a = compute.displayName) !== null && _a !== void 0 ? _a : "<unknown>", profile, vscode_1.TreeItemCollapsibleState.None);
        this.compartment = compartment;
        this.compute = compute;
        this.shellSession = shellSession;
        this.contextValue = "mdsComputeInstance";
    }
    get iconName() {
        return "ociCompute.svg";
    }
}
exports.OciComputeInstanceTreeItem = OciComputeInstanceTreeItem;
//# sourceMappingURL=OciComputeInstanceTreeItem.js.map