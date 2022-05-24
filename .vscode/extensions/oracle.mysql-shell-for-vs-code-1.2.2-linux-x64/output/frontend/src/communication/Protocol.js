"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Protocol = exports.ShellPromptResponseType = void 0;
const helpers_1 = require("../utilities/helpers");
var ShellPromptResponseType;
(function (ShellPromptResponseType) {
    ShellPromptResponseType["Ok"] = "OK";
    ShellPromptResponseType["Cancel"] = "CANCEL";
})(ShellPromptResponseType = exports.ShellPromptResponseType || (exports.ShellPromptResponseType = {}));
class Protocol {
    static getRequestCommandExecute(command, rest) {
        return Protocol.getStandardRequest("execute", Object.assign({ command }, rest));
    }
    static getRequestUsersAuthenticate(username, password) {
        return Protocol.getStandardRequest("authenticate", {
            username,
            password,
        });
    }
    static getRequestPromptReply(request_id, type, reply, moduleSessionId) {
        const result = Protocol.getStandardRequest("prompt_reply", {
            request_id,
            type,
            reply,
            module_session_id: moduleSessionId,
        });
        return result;
    }
    static getStandardRequest(request, rest) {
        return Object.assign({ request_id: (0, helpers_1.uuid)(), request }, rest);
    }
}
exports.Protocol = Protocol;
//# sourceMappingURL=Protocol.js.map