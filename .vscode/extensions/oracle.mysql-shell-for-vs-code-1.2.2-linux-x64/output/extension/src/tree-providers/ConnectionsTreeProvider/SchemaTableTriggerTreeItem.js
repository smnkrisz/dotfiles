"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTableTriggerTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaTableTriggerTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor(name, schema, table, entry) {
        super(name, schema, entry, false);
        this.schema = schema;
        this.table = table;
        this.contextValue = "schemaTableTriggerItem";
    }
    get qualifiedName() {
        return `\`${this.schema}\`.\`${this.name}\``;
    }
    get iconName() {
        return "schemaTableTrigger.svg";
    }
    get dbType() {
        return "trigger";
    }
}
exports.SchemaTableTriggerTreeItem = SchemaTableTriggerTreeItem;
//# sourceMappingURL=SchemaTableTriggerTreeItem.js.map