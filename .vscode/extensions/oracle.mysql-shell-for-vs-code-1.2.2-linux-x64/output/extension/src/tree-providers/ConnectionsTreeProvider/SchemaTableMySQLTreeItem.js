"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTableMySQLTreeItem = void 0;
const SchemaTableTreeItem_1 = require("./SchemaTableTreeItem");
class SchemaTableMySQLTreeItem extends SchemaTableTreeItem_1.SchemaTableTreeItem {
    constructor() {
        super(...arguments);
        this.contextValue = "schemaTableItemMySQL";
    }
    get qualifiedName() {
        return `\`${this.schema}\`.\`${this.name}\``;
    }
    get iconName() {
        return "schemaTable.svg";
    }
    get dbType() {
        return "table";
    }
}
exports.SchemaTableMySQLTreeItem = SchemaTableMySQLTreeItem;
//# sourceMappingURL=SchemaTableMySQLTreeItem.js.map