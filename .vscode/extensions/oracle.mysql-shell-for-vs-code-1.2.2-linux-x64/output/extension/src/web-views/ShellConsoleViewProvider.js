"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellConsoleViewProvider = void 0;
const Requisitions_1 = require("../../../frontend/src/supplement/Requisitions");
const ModuleInfo_1 = require("../../../frontend/src/modules/ModuleInfo");
const WebviewProvider_1 = require("./WebviewProvider");
class ShellConsoleViewProvider extends WebviewProvider_1.WebviewProvider {
    constructor(url, onDispose) {
        super(url, onDispose);
        this.openSessions = [];
        this.sessionAdded = (session) => {
            this.openSessions.push(session);
            return Requisitions_1.requisitions.execute("refreshSessions", this.openSessions);
        };
        this.sessionRemoved = (session) => {
            const index = this.openSessions.findIndex((candidate) => {
                return candidate.sessionId === session.sessionId;
            });
            if (index > -1) {
                this.openSessions.splice(index, 1);
            }
            return Requisitions_1.requisitions.execute("refreshSessions", this.openSessions);
        };
    }
    show(caption, page) {
        return this.runCommand("showPage", { module: ModuleInfo_1.ShellModuleId, page }, caption, "newShellConsole");
    }
    openSession(caption, session) {
        if (session.sessionId === -1) {
            return this.runCommand("newSession", session, caption, "newShellConsole");
        }
        else {
            return this.runCommand("openSession", session, caption, "newShellConsole");
        }
    }
    removeSession(caption, session) {
        return this.runCommand("removeSession", session, caption, "newShellConsole");
    }
    requisitionsCreated() {
        super.requisitionsCreated();
        if (this.requisitions) {
            this.requisitions.register("sessionAdded", this.sessionAdded);
            this.requisitions.register("sessionRemoved", this.sessionRemoved);
        }
    }
    handleDispose() {
        super.handleDispose();
        this.openSessions = [];
        void Requisitions_1.requisitions.execute("refreshSessions", []);
    }
}
exports.ShellConsoleViewProvider = ShellConsoleViewProvider;
//# sourceMappingURL=ShellConsoleViewProvider.js.map