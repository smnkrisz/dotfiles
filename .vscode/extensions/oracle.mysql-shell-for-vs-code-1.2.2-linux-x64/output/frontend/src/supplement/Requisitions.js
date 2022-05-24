"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requisitions = exports.RequisitionHub = exports.appParameters = void 0;
const RequisitionPipeline_1 = require("./RequisitionPipeline");
exports.appParameters = new Map();
class AppParameters extends Map {
}
const parseAppParameters = () => {
    if (typeof window !== "undefined") {
        const queryParts = window.location.search.substring(1).split("&");
        queryParts.forEach((part) => {
            const elements = part.split("=");
            if (elements.length > 1) {
                exports.appParameters.set(elements[0], elements[1]);
                if (elements[0] === "app") {
                    exports.appParameters.embedded = true;
                }
            }
        });
    }
    if (process.env.NODE_ENV === "test") {
        exports.appParameters.testsRunning = true;
    }
    else if (process.env.NODE_ENV === "development") {
        exports.appParameters.inDevelopment = true;
    }
    else if (process.env.VSCODE_PID ||
        (process.env.WSLENV && process.env.WSLENV.indexOf("ELECTRON_RUN_AS_NODE") >= 0)) {
        exports.appParameters.inExtension = true;
    }
};
class RequisitionHub {
    constructor(source = "app", target) {
        this.registry = new Map();
        this.register = (requestType, callback) => {
            if (!this.registry.has(requestType)) {
                this.registry.set(requestType, [callback]);
            }
            else {
                const list = this.registry.get(requestType);
                const index = list.findIndex((entry) => {
                    return entry === callback;
                });
                if (index === -1) {
                    list.push(callback);
                }
            }
        };
        this.unregister = (requestType, callback) => {
            if (!requestType) {
                this.registry.clear();
                return;
            }
            const list = this.registry.get(requestType);
            if (list) {
                const newList = list.filter((candidate) => {
                    return candidate !== callback;
                });
                if (newList.length > 0) {
                    this.registry.set(requestType, newList);
                }
                else {
                    this.registry.delete(requestType);
                }
            }
        };
        this.registrations = (requestType) => {
            var _a;
            const list = this.registry.get(requestType);
            return (_a = list === null || list === void 0 ? void 0 : list.length) !== null && _a !== void 0 ? _a : 0;
        };
        this.execute = (requestType, parameter) => __awaiter(this, void 0, void 0, function* () {
            const list = this.registry.get(requestType);
            if (list) {
                const promises = [];
                list.forEach((callback) => {
                    promises.push(callback(parameter));
                });
                const results = yield Promise.all(promises);
                return Promise.resolve(results.some((value) => {
                    return value;
                }));
            }
            return Promise.resolve(false);
        });
        this.executeRemote = (requestType, parameter) => {
            if (this.remoteTarget) {
                const message = {
                    source: this.source,
                    command: requestType,
                    data: parameter,
                };
                this.remoteTarget.postMessage(message, "*");
            }
        };
        this.source = source;
        this.requestPipeline = new RequisitionPipeline_1.RequisitionPipeline(this);
        if (target) {
            this.remoteTarget = target;
        }
        else if (typeof window !== "undefined") {
            if (window.webkit) {
                this.remoteTarget = window.webkit.messageHandlers.hostChannel;
            }
            else {
                const chrome = window.chrome;
                if (chrome && chrome.webview) {
                    this.remoteTarget = chrome.webview;
                }
            }
            if (this.remoteTarget) {
                window.onNativeMessage = (message) => {
                    this.handleRemoteMessage(message);
                };
            }
            else {
                this.remoteTarget = window.parent;
                window.addEventListener("message", (message) => {
                    if (message.data.source !== "app") {
                        this.handleRemoteMessage(message.data);
                    }
                });
                if (exports.appParameters.embedded) {
                    document.addEventListener("keydown", (e) => {
                        var _a, _b;
                        const obj = {
                            source: this.source,
                            command: "keydown",
                            altKey: e.altKey,
                            code: e.code,
                            ctrlKey: e.ctrlKey,
                            isComposing: e.isComposing,
                            key: e.key,
                            location: e.location,
                            metaKey: e.metaKey,
                            repeat: e.repeat,
                            shiftKey: e.shiftKey,
                        };
                        window.parent.postMessage(obj, "*");
                        if (e.metaKey && (e.key === "c" || e.key === "x")) {
                            const selection = window.getSelection();
                            if (selection) {
                                this.writeToClipboard(selection.toString());
                                const element = document.activeElement;
                                if (e.key === "x" && (element instanceof HTMLInputElement
                                    || element instanceof HTMLTextAreaElement)) {
                                    if (element.selectionStart !== null) {
                                        const oldValue = element.value;
                                        const caret = Math.min(element.selectionStart, (_a = element.selectionEnd) !== null && _a !== void 0 ? _a : 1000);
                                        element.value = oldValue.substring(0, element.selectionStart) + oldValue
                                            .substring((_b = element.selectionEnd) !== null && _b !== void 0 ? _b : element.selectionStart);
                                        element.selectionStart = caret;
                                        element.selectionEnd = caret;
                                    }
                                }
                            }
                        }
                    });
                    document.addEventListener("keyup", (e) => {
                        const obj = {
                            type: "keyup",
                            altKey: e.altKey,
                            code: e.code,
                            ctrlKey: e.ctrlKey,
                            isComposing: e.isComposing,
                            key: e.key,
                            location: e.location,
                            metaKey: e.metaKey,
                            repeat: e.repeat,
                            shiftKey: e.shiftKey,
                        };
                        window.parent.postMessage(obj, "*");
                    });
                }
            }
        }
    }
    static get instance() {
        return new RequisitionHub();
    }
    handleRemoteMessage(message) {
        var _a, _b;
        if (message.command === "paste" && message.data) {
            const element = document.activeElement;
            const text = message.data.text;
            if (element && (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) {
                const oldValue = element.value;
                const start = (_a = element.selectionStart) !== null && _a !== void 0 ? _a : oldValue.length;
                element.value = oldValue.substring(0, start) + text +
                    oldValue.substring((_b = element.selectionEnd) !== null && _b !== void 0 ? _b : start);
                element.selectionStart = start + text.length;
                element.selectionEnd = start + text.length;
                const event = new Event("input", { bubbles: true });
                element.dispatchEvent(event);
            }
            return;
        }
        const requestType = message.command;
        const parameter = message.data;
        const list = this.registry.get(requestType);
        if (list) {
            list.forEach((callback) => {
                void callback(parameter);
            });
        }
    }
    writeToClipboard(text) {
        var _a;
        if (exports.appParameters.embedded) {
            const message = {
                source: this.source,
                command: "writeClipboard",
                text,
            };
            (_a = this.remoteTarget) === null || _a === void 0 ? void 0 : _a.postMessage(message, "*");
        }
        else {
            void navigator.clipboard.writeText(text);
        }
    }
}
exports.RequisitionHub = RequisitionHub;
parseAppParameters();
exports.requisitions = RequisitionHub.instance;
//# sourceMappingURL=Requisitions.js.map