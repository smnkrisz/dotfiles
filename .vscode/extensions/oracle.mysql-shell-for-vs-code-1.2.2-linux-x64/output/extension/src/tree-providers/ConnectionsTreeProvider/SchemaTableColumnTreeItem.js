"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTableColumnTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaTableColumnTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor(name, schema, table, entry) {
        super(name, schema, entry, false);
        this.schema = schema;
        this.table = table;
        this.contextValue = "schemaTableColumnItem";
    }
    get qualifiedName() {
        return `\`${this.schema}\`.\`${this.table}\`.\`${this.name}\``;
    }
    get iconName() {
        return "schemaTableColumn.svg";
    }
    get dbType() {
        return "column";
    }
}
exports.SchemaTableColumnTreeItem = SchemaTableColumnTreeItem;
//# sourceMappingURL=SchemaTableColumnTreeItem.js.map