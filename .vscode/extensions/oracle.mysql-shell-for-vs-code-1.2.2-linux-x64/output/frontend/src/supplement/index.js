"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRows = exports.generateColumnInfo = exports.Stack = void 0;
const RdbmsInfo_1 = require("../app-logic/RdbmsInfo");
const Types_1 = require("../app-logic/Types");
const ShellInterface_1 = require("./ShellInterface");
var Stack_1 = require("./Stack");
Object.defineProperty(exports, "Stack", { enumerable: true, get: function () { return Stack_1.Stack; } });
const generateColumnInfo = (dbType, rawColumns) => {
    var _a;
    if (!rawColumns) {
        return [];
    }
    const dataTypes = dbType === ShellInterface_1.DBType.MySQL ? RdbmsInfo_1.mysqlInfo.dataTypes : RdbmsInfo_1.sqliteInfo.dataTypes;
    const colDuplicates = {};
    for (const rawCol of rawColumns) {
        colDuplicates[rawCol.name] = ((_a = colDuplicates[rawCol.name]) !== null && _a !== void 0 ? _a : 0) + 1;
        if (colDuplicates[rawCol.name] > 1) {
            let newColName = rawCol.name + ` (${colDuplicates[rawCol.name]})`;
            let newColNameExists = true;
            while (newColNameExists) {
                newColNameExists = false;
                for (const col of rawColumns) {
                    if (col.name === newColName) {
                        newColNameExists = true;
                        colDuplicates[rawCol.name]++;
                        newColName = rawCol.name + ` (${colDuplicates[rawCol.name]})`;
                        break;
                    }
                }
            }
            rawCol.name = newColName;
        }
    }
    return rawColumns.map((entry) => {
        let type;
        if (entry.type.toLowerCase() === "bytes") {
            if (entry.length < 256) {
                type = Types_1.DBDataType.Binary;
            }
            else {
                type = Types_1.DBDataType.Blob;
            }
        }
        else {
            const foundType = dataTypes.get(entry.type.toLowerCase());
            type = foundType ? foundType.type : Types_1.DBDataType.Unknown;
        }
        return {
            name: entry.name,
            dataType: {
                type,
            },
        };
    });
};
exports.generateColumnInfo = generateColumnInfo;
const convertRows = (columns, rows) => {
    if (!rows || rows.length === 0) {
        return [];
    }
    if (Array.isArray(rows[0])) {
        const convertedRows = [];
        rows.forEach((value) => {
            const row = {};
            const entry = value;
            columns.forEach((column, columnIndex) => {
                row[column.name] = entry[columnIndex];
            });
            convertedRows.push(row);
        });
        return convertedRows;
    }
    return rows;
};
exports.convertRows = convertRows;
//# sourceMappingURL=index.js.map