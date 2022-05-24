"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaViewTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaViewTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor() {
        super(...arguments);
        this.contextValue = "schemaViewItem";
    }
    get qualifiedName() {
        return `\`${this.schema}\`.\`${this.name}\``;
    }
    get iconName() {
        return "schemaView.svg";
    }
    get dbType() {
        return "view";
    }
}
exports.SchemaViewTreeItem = SchemaViewTreeItem;
//# sourceMappingURL=SchemaViewTreeItem.js.map