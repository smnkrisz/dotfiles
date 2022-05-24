"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaRoutineTreeItem = void 0;
const ConnectionsTreeBaseItem_1 = require("./ConnectionsTreeBaseItem");
class SchemaRoutineTreeItem extends ConnectionsTreeBaseItem_1.ConnectionsTreeBaseItem {
    constructor(name, schema, type, entry, hasChildren, command) {
        super(name, schema, entry, hasChildren, command);
        this.name = name;
        this.schema = schema;
        this.type = type;
        this.entry = entry;
        this.contextValue = "schemaRoutineItem";
    }
    get qualifiedName() {
        return `\`${this.schema}\`.\`${this.name}\``;
    }
    get iconName() {
        return "schemaRoutine.svg";
    }
    get dbType() {
        return this.type;
    }
    get createScriptResultIndex() {
        return 2;
    }
}
exports.SchemaRoutineTreeItem = SchemaRoutineTreeItem;
//# sourceMappingURL=SchemaRoutineTreeItem.js.map