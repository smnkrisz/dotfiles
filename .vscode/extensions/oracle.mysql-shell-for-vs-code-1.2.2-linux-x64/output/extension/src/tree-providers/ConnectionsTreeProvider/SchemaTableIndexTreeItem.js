"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTableIndexTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaTableIndexTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor(name, schema, table, entry) {
        super(name, schema, entry, false);
        this.schema = schema;
        this.table = table;
        this.contextValue = "schemaTableIndexItem";
    }
    get qualifiedName() {
        return `\`${this.schema}\`.\`${this.table}\`.\`${this.name}\``;
    }
    get iconName() {
        return "schemaTableIndex.svg";
    }
    get dbType() {
        return "index";
    }
}
exports.SchemaTableIndexTreeItem = SchemaTableIndexTreeItem;
//# sourceMappingURL=SchemaTableIndexTreeItem.js.map