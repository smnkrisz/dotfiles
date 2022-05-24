"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaEventTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaEventTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor() {
        super(...arguments);
        this.contextValue = "schemaEventItem";
    }
    get qualifiedName() {
        return `\`${this.schema}\`.\`${this.name}\``;
    }
    get iconName() {
        return "schemaEvent.svg";
    }
    get dbType() {
        return "event";
    }
}
exports.SchemaEventTreeItem = SchemaEventTreeItem;
//# sourceMappingURL=SchemaEventTreeItem.js.map