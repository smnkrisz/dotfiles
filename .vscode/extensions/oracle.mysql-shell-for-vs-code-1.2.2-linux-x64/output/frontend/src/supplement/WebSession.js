"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSession = exports.WebSession = void 0;
const Storage_1 = require("./Storage");
const ShellInterface_1 = require("./ShellInterface");
const Requisitions_1 = require("./Requisitions");
class WebSession {
    constructor() {
        this.localUserMode = false;
        this.cookies = new Storage_1.Cookies();
        this.shellProfile = {
            description: "",
            id: -1,
            name: "",
            userId: -1,
            options: {},
        };
        this.clearSessionData();
    }
    static get instance() {
        return new WebSession();
    }
    get userId() {
        return this.sessionData.userId;
    }
    set userId(userId) {
        this.sessionData.userId = userId;
        this.writeSessionData();
    }
    get userName() {
        return this.sessionData.userName;
    }
    set userName(name) {
        this.sessionData.userName = name;
        this.writeSessionData();
    }
    get profile() {
        return this.shellProfile;
    }
    set profile(newProfile) {
        this.loadProfile(newProfile);
        this.saveProfile();
    }
    get currentProfileId() {
        return this.shellProfile.id;
    }
    get sessionId() {
        return this.sessionData.sessionId;
    }
    set sessionId(id) {
        this.cookies.clear();
        this.sessionData.sessionId = id;
        if (id) {
            this.cookies.set("SessionId", id);
        }
        this.cookies.set("SameSite", "None");
        this.cookies.set("Secure");
    }
    clearSessionData() {
        this.sessionData = {
            sessionId: "",
            userName: "",
            profileId: -1,
            userId: -1,
            moduleSessionId: {},
        };
    }
    moduleSessionId(moduleName) {
        return this.sessionData.moduleSessionId[moduleName];
    }
    setModuleSessionId(moduleName, sessionId) {
        if (sessionId) {
            this.sessionData.moduleSessionId[moduleName] = sessionId;
        }
        else {
            delete this.sessionData.moduleSessionId[moduleName];
        }
    }
    loadProfile(newProfile) {
        this.shellProfile = newProfile;
        this.sessionData.profileId = newProfile.id;
        this.writeSessionData();
        void Requisitions_1.requisitions.execute("profileLoaded", undefined);
    }
    saveProfile() {
        ShellInterface_1.ShellInterface.users.updateProfile(this.shellProfile).then(() => {
        }).catch((errorEvent) => {
            void Requisitions_1.requisitions.execute("showError", ["Profile Update Error", String(errorEvent.message)]);
        });
    }
    writeSessionData() {
        if (!process.env.VSCODE_PID) {
        }
    }
}
exports.WebSession = WebSession;
exports.webSession = WebSession.instance;
//# sourceMappingURL=WebSession.js.map