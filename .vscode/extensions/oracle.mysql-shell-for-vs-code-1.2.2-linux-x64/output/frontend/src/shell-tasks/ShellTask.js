"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellTask = void 0;
const lodash_1 = require("lodash");
const communication_1 = require("../communication");
const Dispatch_1 = require("../supplement/Dispatch");
const ShellInterface_1 = require("../supplement/ShellInterface");
class ShellTask {
    constructor(caption, promptCallback, messageCallback) {
        this.caption = caption;
        this.promptCallback = promptCallback;
        this.messageCallback = messageCallback;
        this.currentStatus = "pending";
    }
    get status() {
        return this.currentStatus;
    }
    static getCurrentTimeStamp() {
        return new Date().toISOString().replace("T", " ").slice(0, -1);
    }
    setStatusCallback(callback) {
        this.statusCallback = callback;
    }
    runTask(shellArgs, dbConnectionId) {
        return new Promise((resolve) => {
            this.setStatus("running");
            this.sendMessage(`[${ShellTask.getCurrentTimeStamp()}] [INFO] Starting Task: ${this.caption}\n\n`);
            const request = communication_1.ProtocolGui.getRequestShellStartSession(dbConnectionId, shellArgs);
            communication_1.currentConnection.sendRequest(request, { messageClass: "executeShellCommand" })
                .then((event) => {
                if (!event.data) {
                    return;
                }
                const requestId = event.data.requestId;
                const result = event.data.result;
                if (result === null || result === void 0 ? void 0 : result.info) {
                    this.sendMessage(result.info);
                }
                else if (result === null || result === void 0 ? void 0 : result.status) {
                    this.sendMessage(result.status);
                }
                else if (result && Object.keys(result).length !== 0
                    && !(this.isShellPromptResult(event.data.result))
                    && event.eventType === Dispatch_1.EventType.DataResponse) {
                    this.shellResult = result;
                }
                if (event.data.moduleSessionId) {
                    this.shellSession = new ShellInterface_1.ShellInterfaceShellSession(event.data.moduleSessionId);
                }
                else if (result) {
                    if (this.isShellPromptResult(result)) {
                        let text;
                        if (result.password) {
                            text = result.password;
                        }
                        else {
                            text = result.prompt;
                        }
                        void this.promptCallback(text, !(0, lodash_1.isNil)(result.password)).then((value) => {
                            if (this.shellSession) {
                                if (!(0, lodash_1.isNil)(value)) {
                                    this.shellSession.sendReply(requestId, communication_1.ShellPromptResponseType.Ok, value);
                                }
                                else {
                                    this.shellSession.sendReply(requestId, communication_1.ShellPromptResponseType.Cancel, "");
                                }
                            }
                        });
                    }
                }
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    this.setStatus("done");
                    this.sendMessage(`\n[${ShellTask.getCurrentTimeStamp()}] [INFO] ` +
                        `Task '${this.caption}' completed successfully.\n\n`);
                    resolve(this.shellResult);
                }
                else if (event.eventType === Dispatch_1.EventType.ErrorResponse) {
                    this.currentStatus = "error";
                    this.sendMessage(`[${ShellTask.getCurrentTimeStamp()}] [ERROR]:` +
                        `${event.data.result}\n\n`);
                    resolve(undefined);
                }
            }).catch((event) => {
                var _a;
                this.currentStatus = "error";
                this.sendMessage(`[${ShellTask.getCurrentTimeStamp()}] [ERROR]:` +
                    `${event.message} (${(_a = event.data.result) === null || _a === void 0 ? void 0 : _a.exitStatus})\n\n`);
                resolve(undefined);
            });
        });
    }
    setStatus(status) {
        var _a;
        this.currentStatus = status;
        (_a = this.statusCallback) === null || _a === void 0 ? void 0 : _a.call(this, status);
    }
    sendMessage(message) {
        this.messageCallback(message);
    }
    isShellPromptResult(response) {
        const candidate = response;
        return candidate.prompt !== undefined || candidate.password !== undefined;
    }
}
exports.ShellTask = ShellTask;
//# sourceMappingURL=ShellTask.js.map