"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MrsServiceTreeItem = void 0;
const MrsTreeBaseItem_1 = require("./MrsTreeBaseItem");
class MrsServiceTreeItem extends MrsTreeBaseItem_1.MrsTreeBaseItem {
    constructor(label, value, details) {
        super(label, details, true, value.isDefault ?
            !value.enabled ? "mrsServiceDefaultDisabled.svg" : "mrsServiceDefault.svg" :
            !value.enabled ? "mrsServiceDisabled.svg" : "mrsService.svg");
        this.value = value;
        this.contextValue = "mrsService";
    }
}
exports.MrsServiceTreeItem = MrsServiceTreeItem;
//# sourceMappingURL=MrsServiceTreeItem.js.map