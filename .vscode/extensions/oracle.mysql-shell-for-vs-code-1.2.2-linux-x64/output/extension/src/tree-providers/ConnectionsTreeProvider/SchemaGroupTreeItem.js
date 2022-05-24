"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaGroupTreeItem = void 0;
const SchemaIndex_1 = require("./SchemaIndex");
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaGroupTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor(schema, entry, type) {
        super(type, schema, entry, true);
        this.contextValue = `${String(this.label)}GroupItem`;
    }
    get iconName() {
        switch (this.label) {
            case SchemaIndex_1.SchemaItemGroupType.Tables: {
                return "schemaTables.svg";
            }
            case SchemaIndex_1.SchemaItemGroupType.Views: {
                return "schemaViews.svg";
            }
            case SchemaIndex_1.SchemaItemGroupType.Routines: {
                return "schemaRoutines.svg";
            }
            case SchemaIndex_1.SchemaItemGroupType.Events: {
                return "schemaEvents.svg";
            }
            default: {
                return "";
            }
        }
    }
}
exports.SchemaGroupTreeItem = SchemaGroupTreeItem;
//# sourceMappingURL=SchemaGroupTreeItem.js.map