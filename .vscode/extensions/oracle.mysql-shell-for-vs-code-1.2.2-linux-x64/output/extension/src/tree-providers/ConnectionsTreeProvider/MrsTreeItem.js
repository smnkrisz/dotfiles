"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MrsTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class MrsTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor() {
        super(...arguments);
        this.contextValue = "mrs";
    }
    get iconName() {
        return "mrs.svg";
    }
}
exports.MrsTreeItem = MrsTreeItem;
//# sourceMappingURL=MrsTreeItem.js.map