"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLShellLauncher = void 0;
const child_process = __importStar(require("child_process"));
const fs_1 = require("fs");
const path_1 = require("path");
const net = __importStar(require("net"));
const os_1 = require("os");
const communication_1 = require("../communication");
const Requisitions_1 = require("../supplement/Requisitions");
const helpers_1 = require("./helpers");
class MySQLShellLauncher {
    constructor(onOutput, onError, onExit) {
        this.onOutput = onOutput;
        this.onError = onError;
        this.onExit = onExit;
        this.launchDetails = { port: 0, singleUserToken: "" };
        this.startShellAndConnect = (rootPath, secure, logLevel = "INFO", target) => {
            if (target) {
                const url = new URL(target);
                try {
                    communication_1.currentConnection.connect(new URL(target), "").then(() => {
                        var _a;
                        this.launchDetails.port = Number(url.port);
                        this.launchDetails.singleUserToken = (_a = url.searchParams.get("token")) !== null && _a !== void 0 ? _a : "";
                        void Requisitions_1.requisitions.execute("connectedToUrl", url);
                    }).catch((reason) => {
                        this.onOutput(`Could not establish websocket connection: ${String(reason)}`);
                        void Requisitions_1.requisitions.execute("connectedToUrl", undefined);
                    });
                }
                catch (e) {
                    this.onOutput("Error while parsing the external URL string: " + String(e));
                    void Requisitions_1.requisitions.execute("connectedToUrl", undefined);
                }
            }
            else {
                MySQLShellLauncher.findFreePort().then((port) => {
                    this.launchDetails.singleUserToken = (0, helpers_1.uuid)();
                    this.launchDetails.port = port;
                    const secureString = secure ? "secure={}, " : "";
                    const parameters = [
                        "--py",
                        "-e",
                        `gui.start.web_server(port=${this.launchDetails.port}, ${secureString}read_token_on_stdin=True)`,
                    ];
                    const onOutput = (output) => {
                        if (output.includes("Mode: Single user")) {
                            const protocol = secure ? "https" : "http";
                            const url = new URL(`${protocol}://localhost:${port}/` +
                                `?token=${this.launchDetails.singleUserToken}`);
                            communication_1.currentConnection.connect(new URL(url.href), MySQLShellLauncher.getShellUserConfigDir(rootPath))
                                .then(() => {
                                void Requisitions_1.requisitions.execute("connectedToUrl", url);
                            }).catch((reason) => {
                                this.onError(new Error(`Could not establish websocket connection: ${String(reason)}`));
                                void Requisitions_1.requisitions.execute("connectedToUrl", undefined);
                            });
                        }
                        this.onOutput(output);
                    };
                    this.shellProcess = MySQLShellLauncher.runMysqlShell({
                        rootPath,
                        logLevel,
                        parameters,
                        onStdOutData: onOutput,
                        onError: this.onError,
                        onExit: this.onExit,
                        processInput: this.launchDetails.singleUserToken,
                    });
                }).catch((error) => {
                    if (error instanceof Error) {
                        this.onError(error);
                    }
                    else {
                        this.onError(new Error(String(error)));
                    }
                });
            }
        };
    }
    exitProcess() {
        return new Promise((resolve) => {
            var _a;
            if ((_a = this.shellProcess) === null || _a === void 0 ? void 0 : _a.pid) {
                this.shellProcess.on("close", resolve);
                this.shellProcess.kill();
            }
            else {
                this.shellProcess = undefined;
                this.launchDetails = { port: 0, singleUserToken: "" };
                resolve();
            }
        });
    }
}
exports.MySQLShellLauncher = MySQLShellLauncher;
MySQLShellLauncher.extensionShellUserConfigFolderBaseName = "mysqlsh-gui";
MySQLShellLauncher.getShellUserConfigDir = (rootPath) => {
    var _a;
    const shellPath = MySQLShellLauncher.getShellPath(rootPath);
    let shellUserConfigDir;
    if (shellPath !== "mysqlsh" && (0, fs_1.existsSync)(shellPath)) {
        if ((0, os_1.platform)() === "win32") {
            shellUserConfigDir = (0, path_1.join)((0, os_1.homedir)(), "AppData", "Roaming", "MySQL", MySQLShellLauncher.extensionShellUserConfigFolderBaseName);
        }
        else {
            shellUserConfigDir = (0, path_1.join)((0, os_1.homedir)(), `.${MySQLShellLauncher.extensionShellUserConfigFolderBaseName}`);
        }
    }
    else {
        shellUserConfigDir = (_a = Requisitions_1.appParameters.get("shellUserConfigDir")) !== null && _a !== void 0 ? _a : "";
        if (shellUserConfigDir.length === 0 || !(0, fs_1.existsSync)(shellUserConfigDir)) {
            if ((0, os_1.platform)() === "win32") {
                shellUserConfigDir = (0, path_1.join)((0, os_1.homedir)(), "AppData", "Roaming", "MySQL", "mysqlsh");
            }
            else {
                shellUserConfigDir = (0, path_1.join)((0, os_1.homedir)(), ".mysqlsh");
            }
        }
    }
    return shellUserConfigDir;
};
MySQLShellLauncher.runMysqlShell = (config) => {
    var _a, _b;
    const shellPath = MySQLShellLauncher.getShellPath(config.rootPath);
    const shellUserConfigDir = MySQLShellLauncher.getShellUserConfigDir(config.rootPath);
    const embedded = shellPath.startsWith(config.rootPath) ? "embedded " : "";
    config.onStdOutData(`Starting ${embedded}MySQL Shell, using config dir '${shellUserConfigDir}' ...`);
    if (!(0, fs_1.existsSync)(shellUserConfigDir)) {
        (0, fs_1.mkdirSync)(shellUserConfigDir, { recursive: true });
    }
    const shellProcess = child_process.spawn(shellPath, config.parameters, {
        env: Object.assign(Object.assign({}, process.env), { LOG_LEVEL: config.logLevel, MYSQLSH_USER_CONFIG_HOME: shellUserConfigDir, MYSQLSH_TERM_COLOR_MODE: "nocolor" }),
    });
    if (shellProcess.stdin && config.processInput) {
        shellProcess.stdin.setDefaultEncoding("utf-8");
        shellProcess.stdin.write(`${config.processInput}\n`);
        shellProcess.stdin.end();
    }
    const stdDataOut = (data) => {
        config.onStdOutData(data.toString());
    };
    (_a = shellProcess.stdout) === null || _a === void 0 ? void 0 : _a.on("data", stdDataOut);
    const onError = (error) => {
        var _a;
        (_a = config.onError) === null || _a === void 0 ? void 0 : _a.call(config, new Error(`Error while starting MySQL Shell: ${error.message}`));
    };
    shellProcess.on("error", onError);
    if (config.onStdErrData) {
        const stdErrorDataOut = (data) => {
            var _a;
            (_a = config.onStdErrData) === null || _a === void 0 ? void 0 : _a.call(config, data.toString());
        };
        shellProcess.stderr.on("data", stdErrorDataOut);
    }
    else {
        (_b = shellProcess.stderr) === null || _b === void 0 ? void 0 : _b.on("data", stdDataOut);
    }
    if (config.onExit) {
        shellProcess.on("exit", config.onExit);
    }
    return shellProcess;
};
MySQLShellLauncher.getShellPath = (rootPath) => {
    let shellPath = (0, path_1.join)(rootPath, "shell", "bin", "mysqlsh");
    if ((0, os_1.platform)() === "win32") {
        shellPath += ".exe";
    }
    if (!(0, fs_1.existsSync)(shellPath)) {
        shellPath = "mysqlsh";
    }
    return shellPath;
};
MySQLShellLauncher.findFreePort = () => {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        let errorEncountered = false;
        server.on("error", (err) => {
            server.close();
            if (!errorEncountered) {
                errorEncountered = true;
                reject(err);
            }
        });
        server.listen(0, () => {
            const address = server.address();
            if (!address || typeof address === "string" || address.port === 0) {
                reject(new Error("Unable to get a port for the backend"));
            }
            else {
                server.close();
                if (!errorEncountered) {
                    errorEncountered = true;
                    resolve(address.port);
                }
            }
        });
    });
};
//# sourceMappingURL=MySQLShellLauncher.js.map