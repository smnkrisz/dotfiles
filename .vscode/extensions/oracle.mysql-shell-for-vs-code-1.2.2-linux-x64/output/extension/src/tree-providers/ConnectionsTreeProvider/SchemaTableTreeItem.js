"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTableTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaTableTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor() {
        super(...arguments);
        this.contextValue = "schemaTableItem";
    }
    get iconName() {
        return "schemaTable.svg";
    }
}
exports.SchemaTableTreeItem = SchemaTableTreeItem;
//# sourceMappingURL=SchemaTableTreeItem.js.map