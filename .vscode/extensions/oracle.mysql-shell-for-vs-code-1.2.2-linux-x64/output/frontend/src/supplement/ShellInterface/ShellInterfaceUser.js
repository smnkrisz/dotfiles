"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellInterfaceUser = void 0;
const communication_1 = require("../../communication");
const WebSession_1 = require("../WebSession");
class ShellInterfaceUser {
    constructor() {
        this.id = "user";
    }
    authenticate(username, password) {
        const request = communication_1.ProtocolGui.getRequestUsersAuthenticate(username, password);
        const listener = communication_1.currentConnection.sendRequest(request, { messageClass: "authenticate" });
        listener.then((event) => {
            WebSession_1.webSession.userName = username;
            if (event.data) {
                WebSession_1.webSession.userId = event.data.activeProfile.userId;
                WebSession_1.webSession.loadProfile(event.data.activeProfile);
            }
        }).catch(() => {
        });
        return listener;
    }
    createUser(user, password, role) {
        const request = communication_1.ProtocolGui.getRequestUsersCreateUser(user, password, role);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "createUser" });
    }
    getDefaultProfile(userId) {
        const request = communication_1.ProtocolGui.getRequestUsersGetDefaultProfile(userId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getDefaultProfile" });
    }
    getGuiModuleList(userId) {
        const request = communication_1.ProtocolGui.getRequestUsersGetGuiModuleList(userId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "getGuiModuleList" });
    }
    getProfile(profileId) {
        const request = communication_1.ProtocolGui.getRequestUsersGetProfile(profileId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiUsersGetProfile });
    }
    updateProfile(profile) {
        const request = communication_1.ProtocolGui.getRequestUsersUpdateProfile(profile);
        return communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiUsersUpdateProfile });
    }
    addProfile(profile) {
        const request = communication_1.ProtocolGui.getRequestUsersAddProfile(profile.userId, profile);
        return communication_1.currentConnection.sendRequest(request, { messageClass: communication_1.ShellAPIGui.GuiUsersAddProfile });
    }
    grantRole(username, role) {
        const request = communication_1.ProtocolGui.getRequestUsersGrantRole(username, role);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "grantRole" });
    }
    listProfiles(userId) {
        const request = communication_1.ProtocolGui.getRequestUsersListProfiles(userId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listProfiles" });
    }
    listRolePrivileges(role) {
        const request = communication_1.ProtocolGui.getRequestUsersListRolePrivileges(role);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listRoleProfiles" });
    }
    listRoles() {
        const request = communication_1.ProtocolGui.getRequestUsersListRoles();
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listRoles" });
    }
    listUserPrivileges(username) {
        const request = communication_1.ProtocolGui.getRequestUsersListUserPrivileges(username);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listUserPrivileges" });
    }
    listUserRoles(username) {
        const request = communication_1.ProtocolGui.getRequestUsersListUserRoles(username);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listUserRoles" });
    }
    listUsers() {
        const request = communication_1.ProtocolGui.getRequestUsersListUsers();
        return communication_1.currentConnection.sendRequest(request, { messageClass: "listUsers" });
    }
    setDefaultProfile(userId, profileId) {
        const request = communication_1.ProtocolGui.getRequestUsersSetDefaultProfile(userId, profileId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "setDefaultProfile" });
    }
    setCurrentProfile(profileId) {
        const request = communication_1.ProtocolGui.getRequestUsersSetCurrentProfile(profileId);
        return communication_1.currentConnection.sendRequest(request, { messageClass: "setCurrentProfile" });
    }
    storePassword(url, password) {
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsSetCredential(url, password), { messageClass: "storePassword" });
    }
    clearPassword(url) {
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsDeleteCredential(url), { messageClass: "clearPassword" });
    }
    listCredentials() {
        return communication_1.currentConnection.sendRequest(communication_1.ProtocolGui.getRequestDbconnectionsListCredentials(), { messageClass: "clearPassword" });
    }
}
exports.ShellInterfaceUser = ShellInterfaceUser;
//# sourceMappingURL=ShellInterfaceUser.js.map