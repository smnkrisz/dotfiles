"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageMap = exports.SchemaTreeType = exports.EntityType = void 0;
var EntityType;
(function (EntityType) {
    EntityType[EntityType["Console"] = 0] = "Console";
    EntityType[EntityType["Script"] = 1] = "Script";
    EntityType[EntityType["Folder"] = 2] = "Folder";
    EntityType[EntityType["Admin"] = 3] = "Admin";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
var SchemaTreeType;
(function (SchemaTreeType) {
    SchemaTreeType[SchemaTreeType["Document"] = 0] = "Document";
    SchemaTreeType[SchemaTreeType["Schema"] = 1] = "Schema";
    SchemaTreeType[SchemaTreeType["Table"] = 2] = "Table";
    SchemaTreeType[SchemaTreeType["StoredFunction"] = 3] = "StoredFunction";
    SchemaTreeType[SchemaTreeType["StoredProcedure"] = 4] = "StoredProcedure";
    SchemaTreeType[SchemaTreeType["Event"] = 5] = "Event";
    SchemaTreeType[SchemaTreeType["Trigger"] = 6] = "Trigger";
    SchemaTreeType[SchemaTreeType["Column"] = 7] = "Column";
    SchemaTreeType[SchemaTreeType["View"] = 8] = "View";
    SchemaTreeType[SchemaTreeType["Index"] = 9] = "Index";
    SchemaTreeType[SchemaTreeType["ForeignKey"] = 10] = "ForeignKey";
    SchemaTreeType[SchemaTreeType["GroupNode"] = 11] = "GroupNode";
    SchemaTreeType[SchemaTreeType["UserVariable"] = 12] = "UserVariable";
    SchemaTreeType[SchemaTreeType["User"] = 13] = "User";
    SchemaTreeType[SchemaTreeType["Engine"] = 14] = "Engine";
    SchemaTreeType[SchemaTreeType["Plugin"] = 15] = "Plugin";
    SchemaTreeType[SchemaTreeType["Character"] = 16] = "Character";
})(SchemaTreeType = exports.SchemaTreeType || (exports.SchemaTreeType = {}));
exports.languageMap = new Map([
    ["msg", "Combined"],
    ["typescript", "TypeScript"],
    ["javascript", "JavaScript"],
    ["mysql", "MySQL"],
    ["sql", "SQlite"],
]);
//# sourceMappingURL=index.js.map