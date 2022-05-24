"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor() {
        super(...arguments);
        this.contextValue = "schemaItem";
    }
    get qualifiedName() {
        return `\`${this.name}\``;
    }
    get iconName() {
        return "schemaSqlite.svg";
    }
    get dbType() {
        return "schema";
    }
}
exports.SchemaTreeItem = SchemaTreeItem;
//# sourceMappingURL=SchemaTreeItem.js.map