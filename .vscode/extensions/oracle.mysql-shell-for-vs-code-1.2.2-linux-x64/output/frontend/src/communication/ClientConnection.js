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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentConnection = exports.ClientConnection = exports.ConnectionEventType = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const ws_1 = __importDefault(require("ws"));
const _1 = require(".");
const Requisitions_1 = require("../supplement/Requisitions");
const Dispatch_1 = require("../supplement/Dispatch");
const helpers_1 = require("../utilities/helpers");
var ConnectionEventType;
(function (ConnectionEventType) {
    ConnectionEventType[ConnectionEventType["Open"] = 1] = "Open";
    ConnectionEventType[ConnectionEventType["Close"] = 2] = "Close";
    ConnectionEventType[ConnectionEventType["Error"] = 3] = "Error";
    ConnectionEventType[ConnectionEventType["Message"] = 4] = "Message";
})(ConnectionEventType = exports.ConnectionEventType || (exports.ConnectionEventType = {}));
class ClientConnection {
    constructor() {
        this.debugging = false;
        this.connectionEstablished = false;
        this.autoReconnecting = false;
        this.disconnecting = false;
        this.onOpen = (resolve) => {
            if (this.autoReconnecting) {
                this.autoReconnecting = false;
                void Requisitions_1.requisitions.execute("showError", [
                    "Connection Recovering",
                    "The connection was automatically re-establish after a failure.",
                ]);
            }
            if (this.reconnectTimer) {
                clearTimeout(this.reconnectTimer);
                this.reconnectTimer = null;
            }
            this.connectionEstablished = true;
            Dispatch_1.dispatcher.triggerNotification("socketOpened");
            resolve();
        };
        this.onClose = () => {
            const wasConnected = this.connectionEstablished;
            this.connectionEstablished = false;
            this.autoReconnecting = false;
            Dispatch_1.dispatcher.triggerNotification("socketClosed");
            if (!this.disconnecting && !this.debugging) {
                if (wasConnected) {
                    if (this.reconnectTimer) {
                        clearTimeout(this.reconnectTimer);
                    }
                    this.reconnectTimer = setTimeout(() => {
                        this.reconnectTimer = null;
                        void Requisitions_1.requisitions.execute("showError", [
                            "Browser Connection Error",
                            "The connection was interrupted unexpectedly. An automatic reconnection failed, but the " +
                                "application will continue trying to reconnect.",
                        ]);
                    }, 3000);
                }
            }
        };
        this.onMessage = (event) => {
            if (event.data) {
                const data = JSON.parse(event.data);
                const serverData = (0, helpers_1.convertSnakeToCamelCase)(data, { ignore: ["rows"] });
                if (serverData.sessionUuid) {
                    Dispatch_1.dispatcher.triggerEvent(_1.CommunicationEvents.generateWebSessionEvent(serverData), this.debugging);
                }
                else {
                    Dispatch_1.dispatcher.triggerEvent(_1.CommunicationEvents.generateResponseEvent("serverResponse", serverData), this.debugging);
                }
            }
        };
        this.onError = (reject, event) => {
            if (event.message) {
                reject(event.message);
            }
            else {
                reject(String(event));
            }
            void Requisitions_1.requisitions.execute("showError", [
                "Communication Error",
                "Could not establish a connection to the backend.",
            ]);
        };
    }
    get isConnected() {
        if (this.socket) {
            return this.connectionEstablished && this.socket.readyState === this.socket.OPEN;
        }
        return false;
    }
    set scripts(map) {
        this.loadedScripts = map;
    }
    connect(url, shellConfigDir) {
        this.disconnecting = false;
        return new Promise((resolve, reject) => {
            if (this.socket && (this.socket.readyState === this.socket.OPEN ||
                this.socket.readyState === this.socket.CONNECTING)) {
                resolve();
            }
            else {
                url.protocol = url.protocol.replace("http", "ws");
                url.pathname = "ws1.ws";
                if (Requisitions_1.appParameters.inDevelopment) {
                    url.port = "8000";
                }
                if (typeof WebSocket !== "undefined") {
                    const socket = new WebSocket(url.toString());
                    socket.addEventListener("close", this.onClose);
                    socket.addEventListener("message", this.onMessage);
                    socket.addEventListener("open", this.onOpen.bind(this, resolve));
                    socket.addEventListener("error", this.onError.bind(this, reject));
                    this.socket = socket;
                }
                else {
                    const caFile = (0, path_1.join)(shellConfigDir, "plugin_data/gui_plugin/web_certs/rootCA.crt");
                    let ca;
                    if ((0, fs_1.existsSync)(caFile)) {
                        ca = (0, fs_1.readFileSync)(caFile);
                    }
                    const socket = new ws_1.default(url.toString(), { ca });
                    socket.addEventListener("close", this.onClose);
                    socket.addEventListener("message", this.onMessage);
                    socket.addEventListener("open", this.onOpen.bind(this, resolve));
                    socket.addEventListener("error", this.onError.bind(this, reject));
                    this.socket = socket;
                }
            }
        });
    }
    disconnect() {
        if (this.socket) {
            try {
                this.disconnecting = true;
                this.socket.close();
                delete this.socket;
            }
            catch (e) {
                console.error("Internal error while closing websocket: " + String(e));
            }
        }
    }
    sendRequest(request, context) {
        var _a;
        Dispatch_1.dispatcher.mapMessageContext(request.request_id, context);
        const listener = Dispatch_1.ListenerEntry.createByID(request.request_id, { filters: [Dispatch_1.eventFilterNoRequests] });
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(request));
        if (!this.debugging) {
            Dispatch_1.dispatcher.triggerEvent(_1.CommunicationEvents.generateRequestEvent(request));
        }
        return listener;
    }
    clearState() {
    }
}
exports.ClientConnection = ClientConnection;
class ClientConnectionSingleton extends ClientConnection {
    constructor() {
        super(...arguments);
        this.tokens = {};
    }
    get lastGeneratedRequestId() {
        return this.lastGeneratedId;
    }
    get lastModuleSessionId() {
        return this.lastReceivedModuleSessionId;
    }
    get lastResponse() {
        return this.lastReceivedResponse;
    }
    clearState() {
        this.tokens = {};
        this.lastGeneratedId = "";
        this.lastReceivedModuleSessionId = "";
        this.lastReceivedResponse = undefined;
    }
    doSend(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const request = _1.Protocol.getStandardRequest(data.request, data);
                let timedOut = false;
                const timer = setTimeout(() => {
                    timedOut = true;
                    resolve({
                        requestId: data.request_id,
                        requestState: { type: "error", msg: "No response from backend in 3 seconds" },
                    });
                }, 3000);
                const setLastResponse = (event) => {
                    clearTimeout(timer);
                    if (!timedOut) {
                        this.lastReceivedResponse = (0, helpers_1.convertCamelToSnakeCase)(event.data);
                        if (event.data.moduleSessionId) {
                            this.lastReceivedModuleSessionId = event.data.moduleSessionId;
                        }
                        resolve(this.lastReceivedResponse);
                    }
                };
                this.sendRequest(request, { messageClass: "debugger" }).then((event) => {
                    setLastResponse(event);
                }).catch((event) => {
                    setLastResponse(event);
                });
            });
        });
    }
    send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            try {
                this.debugging = true;
                result = yield this.doSend(data);
            }
            finally {
                this.debugging = false;
            }
            return result;
        });
    }
    generateRequestId() {
        this.lastGeneratedId = (0, helpers_1.uuid)();
        return this.lastGeneratedId;
    }
    log(output) {
        const event = Dispatch_1.DispatchEvents.baseEvent(Dispatch_1.EventType.Notification, { output }, undefined, "debugger");
        Dispatch_1.dispatcher.triggerEvent(event);
    }
    validateResponse(actual, expected, responseIndex) {
        const result = (0, helpers_1.deepEqual)(expected, actual);
        const indexText = responseIndex !== undefined ? ` (response ${responseIndex})` : "";
        if (result) {
            this.log(`/* Validation successful${indexText}. */`);
            return true;
        }
        else {
            this.log(`/* WARNING: values differ${indexText}.\nActual:
${JSON.stringify(actual, undefined, 4)}
Expected:\n${JSON.stringify(expected, undefined, 4)}\n*/`);
            return false;
        }
    }
    validateLastResponse(expected, responseIndex) {
        return this.validateResponse(this.lastReceivedResponse, expected, responseIndex);
    }
    sendAndValidate(data, expected) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expected.length === 0) {
                this.log("/* WARNING: No expectations found. */");
            }
            this.debugging = true;
            try {
                const request = _1.Protocol.getStandardRequest(data.request, data);
                let currentIndex = 0;
                this.lastReceivedResponse = undefined;
                let failed = false;
                this.sendRequest(request, { messageClass: "debuggerValidate" }).then((event) => {
                    if (currentIndex < expected.length) {
                        this.lastReceivedResponse = (0, helpers_1.convertCamelToSnakeCase)(event.data);
                        failed = failed ||
                            !this.validateResponse(this.lastReceivedResponse, expected[currentIndex], currentIndex++);
                        if (event.data.moduleSessionId) {
                            this.lastReceivedModuleSessionId = event.data.moduleSessionId;
                        }
                    }
                }).catch((event) => {
                    this.lastReceivedResponse = (0, helpers_1.convertCamelToSnakeCase)(event.data);
                    failed = true;
                });
                let attempt = 0;
                while (attempt++ < 10 && !failed && currentIndex < expected.length) {
                    yield (0, helpers_1.sleep)(300);
                }
                if (failed) {
                    this.log("/* WARNING: At least one validation failed. */");
                }
                else if (currentIndex < expected.length) {
                    this.log("/* WARNING: Validation incomplete. Not enough responses came in during the timeout of 3 " +
                        "seconds. */");
                }
                else {
                    this.log("/* All validations succeeded. */");
                }
            }
            finally {
                this.debugging = false;
            }
        });
    }
    execute(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = this.loadedScripts.get(path);
            if (!code) {
                this.log("/* ERROR: Code of " + path + " not found. */");
                return;
            }
            try {
                yield (0, helpers_1.strictEval)("(async () => {" + code + "})()");
            }
            catch (e) {
                throw new Error(String(e) + " (" + path + ")");
            }
        });
    }
    get ignore() {
        return {
            symbol: Symbol("ignore"),
        };
    }
    matchRegexp(pattern) {
        return {
            symbol: Symbol("regex"),
            parameters: pattern,
        };
    }
    matchList(list, full = true) {
        return {
            symbol: Symbol("list"),
            parameters: { list, full },
        };
    }
}
exports.currentConnection = new ClientConnectionSingleton();
//# sourceMappingURL=ClientConnection.js.map