"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTableForeignKeyTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaTableForeignKeyTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor(name, schema, table, entry) {
        super(name, schema, entry, false);
        this.schema = schema;
        this.table = table;
        this.contextValue = "schemaTableForeignKeyItem";
    }
    get iconName() {
        return "schemaTableForeignKey.svg";
    }
}
exports.SchemaTableForeignKeyTreeItem = SchemaTableForeignKeyTreeItem;
//# sourceMappingURL=SchemaTableForeignKeyTreeItem.js.map