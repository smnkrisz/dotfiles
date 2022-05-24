"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellConsoleCommandHandler = void 0;
const vscode_1 = require("vscode");
const Requisitions_1 = require("../../frontend/src/supplement/Requisitions");
const ShellConsoleViewProvider_1 = require("./web-views/ShellConsoleViewProvider");
class ShellConsoleCommandHandler {
    constructor() {
        this.providers = [];
        this.connectedToUrl = (url) => {
            this.url = url;
            this.closeProviders();
            return Promise.resolve(true);
        };
    }
    setup(context) {
        Requisitions_1.requisitions.register("connectedToUrl", this.connectedToUrl);
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.openSessionBrowser", () => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.show("MySQL Shell Consoles", "sessions"));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.newSession", () => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.openSession("MySQL Shell Consoles", { sessionId: -1 }));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.openSession", (details) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.openSession("MySQL Shell Consoles", details));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.newSessionUsingConnection", (item) => {
            const provider = this.currentProvider;
            const details = {
                sessionId: -1,
                caption: `Session to ${item.entry.details.caption}`,
                dbConnectionId: item.entry.details.id,
            };
            void (provider === null || provider === void 0 ? void 0 : provider.openSession("MySQL Shell Consoles", details));
        }));
        context.subscriptions.push(vscode_1.commands.registerCommand("msg.removeSession", (item) => {
            const provider = this.currentProvider;
            void (provider === null || provider === void 0 ? void 0 : provider.removeSession("MySQL Shell Consoles", item.details));
        }));
    }
    closeProviders() {
        this.providers.forEach((provider) => {
            provider.close();
        });
        this.providers = [];
    }
    get currentProvider() {
        if (this.providers.length > 0) {
            return this.providers[this.providers.length - 1];
        }
        else if (this.url) {
            const provider = new ShellConsoleViewProvider_1.ShellConsoleViewProvider(this.url, (view) => {
                const index = this.providers.findIndex((candidate) => { return candidate === view; });
                if (index > -1) {
                    this.providers.splice(index, 1);
                }
            });
            this.providers.push(provider);
            return provider;
        }
        return undefined;
    }
}
exports.ShellConsoleCommandHandler = ShellConsoleCommandHandler;
//# sourceMappingURL=ShellConsoleCommandHandler.js.map