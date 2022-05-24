"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MrsSchemaTreeItem = void 0;
const MrsTreeBaseItem_1 = require("./MrsTreeBaseItem");
class MrsSchemaTreeItem extends MrsTreeBaseItem_1.MrsTreeBaseItem {
    constructor(label, value, entry) {
        super(label, entry, true, value.enabled === 1 ? "schemaEnabled.svg" : "schemaDisabled.svg");
        this.value = value;
        this.contextValue = "mrsSchema";
    }
}
exports.MrsSchemaTreeItem = MrsSchemaTreeItem;
//# sourceMappingURL=MrsSchemaTreeItem.js.map