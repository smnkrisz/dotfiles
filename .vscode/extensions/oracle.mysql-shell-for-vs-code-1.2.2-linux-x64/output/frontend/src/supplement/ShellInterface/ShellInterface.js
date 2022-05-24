"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterface = void 0;
const ShellInterfaceCore_1 = require("./ShellInterfaceCore");
const ShellInterfaceDbConnection_1 = require("./ShellInterfaceDbConnection");
const ShellInterfaceModule_1 = require("./ShellInterfaceModule");
const ShellInterfaceUser_1 = require("./ShellInterfaceUser");
class ShellInterface {
    static get core() {
        if (ShellInterface.interfaces.core === undefined) {
            ShellInterface.interfaces.core = new ShellInterfaceCore_1.ShellInterfaceCore();
        }
        return ShellInterface.interfaces.core;
    }
    static get users() {
        if (ShellInterface.interfaces.users === undefined) {
            ShellInterface.interfaces.users = new ShellInterfaceUser_1.ShellInterfaceUser();
        }
        return ShellInterface.interfaces.users;
    }
    static get modules() {
        if (ShellInterface.interfaces.modules === undefined) {
            ShellInterface.interfaces.modules = new ShellInterfaceModule_1.ShellInterfaceModule();
        }
        return ShellInterface.interfaces.modules;
    }
    static get dbConnections() {
        if (ShellInterface.interfaces.dbConnections === undefined) {
            ShellInterface.interfaces.dbConnections = new ShellInterfaceDbConnection_1.ShellInterfaceDbConnection();
        }
        return ShellInterface.interfaces.dbConnections;
    }
}
exports.ShellInterface = ShellInterface;
ShellInterface.interfaces = {};
//# sourceMappingURL=ShellInterface.js.map