"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaListTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaListTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor() {
        super(...arguments);
        this.contextValue = "admin";
    }
    get iconName() {
        return "schemas.svg";
    }
}
exports.SchemaListTreeItem = SchemaListTreeItem;
//# sourceMappingURL=SchemaListTreeItem.js.map