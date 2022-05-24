"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaMySQLTreeItem = void 0;
const SchemaTreeItem_1 = require("./SchemaTreeItem");
class SchemaMySQLTreeItem extends SchemaTreeItem_1.SchemaTreeItem {
    constructor() {
        super(...arguments);
        this.contextValue = "schemaItemMySQL";
    }
    get iconName() {
        return "schemaMySQL.svg";
    }
}
exports.SchemaMySQLTreeItem = SchemaMySQLTreeItem;
//# sourceMappingURL=SchemaMySQLTreeItem.js.map