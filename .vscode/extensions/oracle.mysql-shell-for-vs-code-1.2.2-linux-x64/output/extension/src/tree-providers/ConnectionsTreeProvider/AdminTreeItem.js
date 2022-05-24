"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class AdminTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor() {
        super(...arguments);
        this.contextValue = "admin";
    }
    get iconName() {
        return "adminDashboard.svg";
    }
}
exports.AdminTreeItem = AdminTreeItem;
//# sourceMappingURL=AdminTreeItem.js.map