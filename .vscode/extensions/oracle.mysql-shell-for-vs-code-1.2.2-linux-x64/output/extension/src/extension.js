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
exports.showStatusText = exports.deactivate = exports.activate = exports.printChannelOutput = exports.statusBarItem = exports.taskOutputChannel = void 0;
const vscode_1 = require("vscode");
const child_process = __importStar(require("child_process"));
const fs_1 = require("fs");
const path_1 = require("path");
const os_1 = require("os");
const Requisitions_1 = require("../../frontend/src/supplement/Requisitions");
const MySQLShellLauncher_1 = require("../../frontend/src/utilities/MySQLShellLauncher");
const communication_1 = require("../../frontend/src/communication");
const ExtensionHost_1 = require("./ExtensionHost");
const WebSession_1 = require("../../frontend/src/supplement/WebSession");
const WelcomeWebviewProvider_1 = require("./web-views/WelcomeWebviewProvider");
const helpers_1 = require("../../frontend/src/utilities/helpers");
let outputChannel;
let host;
let startupCompleted = false;
const restartMessage = "This will close all MySQL Shell tabs and restart the underlying process. " +
    "After that a new connection will automatically be established.";
const resetMessage = "This will completely reset the MySQL Shell for VS Code extension by deleting the " +
    "web certificate and user settings directory.";
const resetRestartMessage = "The MySQL Shell for VS Code extension has been reset. Please restart VS Code " +
    "to initialize the extension again or press [Cancel] and remove the Extension from the Extensions View Container.";
const printChannelOutput = (content, reveal = false) => {
    outputChannel.appendLine(content);
    if (reveal) {
        outputChannel.show(true);
    }
};
exports.printChannelOutput = printChannelOutput;
const handleShellOutput = (output) => {
    if (!startupCompleted && output.includes("Sending session response...")) {
        startupCompleted = true;
    }
    if (!startupCompleted) {
        if (output.includes("Certificate is not installed.")) {
            void vscode_1.window.showInformationMessage("The MySQL Shell for VSCode extension cannot run because the web certificate is " +
                "not installed. Do you want to run the Welcome Wizard to install it?", "Run Welcome Wizard", "Cancel")
                .then((answer) => {
                if (answer !== "Cancel") {
                    void vscode_1.commands.executeCommand("msg.runWelcomeWizard");
                }
            });
        }
        else if (output.includes("Certificate is not correctly installed.")) {
            void vscode_1.window.showInformationMessage("The MySQL Shell for VSCode extension cannot run because the web certificate is " +
                "incorrectly installed. Do you want to run the Welcome Wizard to fix it?", "Run Welcome Wizard", "Cancel")
                .then((answer) => {
                if (answer !== "Cancel") {
                    void vscode_1.commands.executeCommand("msg.runWelcomeWizard");
                }
            });
        }
    }
    (0, exports.printChannelOutput)(output);
};
const shellLauncher = new MySQLShellLauncher_1.MySQLShellLauncher(handleShellOutput, (error) => {
    (0, exports.printChannelOutput)(error.message, true);
});
const activate = (context) => {
    outputChannel = vscode_1.window.createOutputChannel("MySQL Shell for VS Code");
    exports.taskOutputChannel = vscode_1.window.createOutputChannel("MySQL Shell - Tasks");
    exports.statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
    exports.statusBarItem.hide();
    exports.statusBarItem.tooltip = "MySQL Task Process";
    host = new ExtensionHost_1.ExtensionHost(context);
    (0, WelcomeWebviewProvider_1.setupInitialWelcomeWebview)(context);
    context.subscriptions.push(vscode_1.commands.registerCommand("msg.restartShell", () => {
        void vscode_1.window.showWarningMessage(restartMessage, "Restart MySQL Shell", "Cancel").then((choice) => __awaiter(void 0, void 0, void 0, function* () {
            if (choice === "Restart MySQL Shell") {
                host.closeAllTabs();
                communication_1.currentConnection.disconnect();
                yield shellLauncher.exitProcess();
                WebSession_1.webSession.clearSessionData();
                shellLauncher.startShellAndConnect(context.extensionPath, true);
            }
        }));
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand("msg.connectToShell", () => {
        const externalUrl = vscode_1.workspace.getConfiguration("msg.shell").get("externalUrl");
        void vscode_1.window.showInputBox({
            title: "Connect to a MySQL Instance",
            value: externalUrl,
            prompt: "Enter the address of a MySQL Shell instance to connect to. Leave the field empty to start and " +
                "connect to a local MySQL Shell",
        }).then((value) => __awaiter(void 0, void 0, void 0, function* () {
            host.closeAllTabs();
            communication_1.currentConnection.disconnect();
            yield shellLauncher.exitProcess();
            WebSession_1.webSession.clearSessionData();
            const configuration = vscode_1.workspace.getConfiguration(`msg.debugLog`);
            const level = configuration.get("level", "INFO");
            shellLauncher.startShellAndConnect(context.extensionPath, true, level, value);
        }));
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand("msg.resetExtension", () => {
        void vscode_1.window.showWarningMessage(resetMessage, "Reset Extension", "Cancel").then((choice) => {
            if (choice === "Reset Extension") {
                void context.globalState.update("MySQLShellInitialRun", "");
                const configuration = vscode_1.workspace.getConfiguration(`msg.debugLog`);
                const logLevel = configuration.get("level", "INFO");
                const config = {
                    rootPath: context.extensionPath,
                    parameters: [
                        "--", "gui", "core", "remove-shell-web-certificate",
                    ],
                    logLevel,
                    onStdOutData: (output) => {
                        if (output.includes("true")) {
                            const shellUserConfigDir = MySQLShellLauncher_1.MySQLShellLauncher.getShellUserConfigDir(context.extensionPath);
                            if (shellUserConfigDir
                                .endsWith(MySQLShellLauncher_1.MySQLShellLauncher.extensionShellUserConfigFolderBaseName)) {
                                (0, fs_1.rmSync)(shellUserConfigDir, { recursive: true, force: true });
                            }
                            void vscode_1.window.showWarningMessage(resetRestartMessage, "Restart VS Code", "Cancel")
                                .then((choice) => {
                                if (choice === "Restart VS Code") {
                                    void vscode_1.commands.executeCommand("workbench.action.reloadWindow");
                                }
                            });
                        }
                        else if (!output.startsWith("Starting embedded MySQL Shell") && !output.includes("DEBUG")) {
                            void vscode_1.window.showInformationMessage(`The following error occurred while deleting the certificate: ${output} ` +
                                "Cancelled reset operation.");
                        }
                    },
                };
                MySQLShellLauncher_1.MySQLShellLauncher.runMysqlShell(config);
            }
        });
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand("msg.fileBugReport", () => {
        const currentVersion = vscode_1.extensions.getExtension("Oracle.mysql-shell-for-vs-code").packageJSON.version || "1.0.0";
        let platformId;
        let cpuArch;
        switch ((0, os_1.platform)()) {
            case "darwin": {
                platformId = "6";
                break;
            }
            case "win32": {
                platformId = "7";
                break;
            }
            default: {
                platformId = "5";
                break;
            }
        }
        switch ((0, os_1.arch)()) {
            case "arm":
            case "arm64": {
                cpuArch = "3";
                break;
            }
            case "x86": {
                cpuArch = "2";
                break;
            }
            default: {
                cpuArch = "1";
                break;
            }
        }
        void vscode_1.env.openExternal(vscode_1.Uri.parse("https://bugs.mysql.com/report.php?category=Shell%20VSCode%20Extension" +
            `&version=${currentVersion}&os=${platformId}&cpu_arch=${cpuArch}`));
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand("msg.hasLaunchedSuccessfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, helpers_1.waitFor)(5000, () => { return startupCompleted; });
        return startupCompleted;
    })));
    const currentVersion = vscode_1.extensions.getExtension("Oracle.mysql-shell-for-vs-code").packageJSON.version || "1.0.0";
    const lastRunVersion = context.globalState.get("MySQLShellLastRunVersion");
    if (!lastRunVersion || lastRunVersion === "" || lastRunVersion !== currentVersion) {
        void context.globalState.update("MySQLShellLastRunVersion", currentVersion);
        if ((0, os_1.platform)() === "darwin") {
            const shellDir = (0, path_1.join)(context.extensionPath, "shell");
            if ((0, fs_1.existsSync)(shellDir)) {
                void child_process.execSync(`xattr -rc ${shellDir}`);
            }
        }
    }
    const initialRun = context.globalState.get("MySQLShellInitialRun");
    if ((!initialRun || initialRun === "") && !process.env.extensionTestsRunning) {
        void context.globalState.update("MySQLShellInitialRun", currentVersion);
        void vscode_1.commands.executeCommand("msg.runWelcomeWizard");
    }
    else {
        const useExternalUrl = vscode_1.workspace.getConfiguration("msg.shell").get("useExternal");
        let externalUrl;
        if (useExternalUrl) {
            externalUrl = vscode_1.workspace.getConfiguration("msg.shell").get("externalUrl");
        }
        const configuration = vscode_1.workspace.getConfiguration(`msg.debugLog`);
        const level = configuration.get("level", "INFO");
        shellLauncher.startShellAndConnect(context.extensionPath, true, level, externalUrl);
    }
};
exports.activate = activate;
const deactivate = () => {
    Requisitions_1.requisitions.unregister();
    communication_1.currentConnection.disconnect();
    void shellLauncher.exitProcess();
};
exports.deactivate = deactivate;
let statusBarTimer;
const showStatusText = (text) => {
    clearTimeout(statusBarTimer);
    exports.statusBarItem.text = `MySQL Shell: ${text}`;
    exports.statusBarItem.show();
    setTimeout(() => {
        exports.statusBarItem.hide();
    }, 15000);
};
exports.showStatusText = showStatusText;
//# sourceMappingURL=extension.js.map