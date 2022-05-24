"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MrsDbObjectTreeItem = void 0;
const MrsTreeBaseItem_1 = require("./MrsTreeBaseItem");
class MrsDbObjectTreeItem extends MrsTreeBaseItem_1.MrsTreeBaseItem {
    constructor(label, value, details) {
        super(label, details, false);
        this.value = value;
        this.contextValue = "mrsDbObject";
    }
    get iconName() {
        return "schemaTable.svg";
    }
}
exports.MrsDbObjectTreeItem = MrsDbObjectTreeItem;
//# sourceMappingURL=MrsDbObjectTreeItem.js.map