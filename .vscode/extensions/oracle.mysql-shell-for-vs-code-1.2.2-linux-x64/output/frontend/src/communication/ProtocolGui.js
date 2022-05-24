"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolGui = exports.ShellAPIGui = void 0;
const _1 = require(".");
const helpers_1 = require("../utilities/helpers");
var ShellAPIGui;
(function (ShellAPIGui) {
    ShellAPIGui["GuiClusterIsGuiModuleBackend"] = "gui.cluster.is_gui_module_backend";
    ShellAPIGui["GuiClusterGetGuiModuleDisplayInfo"] = "gui.cluster.get_gui_module_display_info";
    ShellAPIGui["GuiCoreSetLogLevel"] = "gui.core.set_log_level";
    ShellAPIGui["GuiCoreGetLogLevel"] = "gui.core.get_log_level";
    ShellAPIGui["GuiCoreListFiles"] = "gui.core.list_files";
    ShellAPIGui["GuiCoreCreateFile"] = "gui.core.create_file";
    ShellAPIGui["GuiCoreValidatePath"] = "gui.core.validate_path";
    ShellAPIGui["GuiCoreGetBackendInformation"] = "gui.core.get_backend_information";
    ShellAPIGui["GuiCoreIsShellWebCertificateInstalled"] = "gui.core.is_shell_web_certificate_installed";
    ShellAPIGui["GuiCoreInstallShellWebCertificate"] = "gui.core.install_shell_web_certificate";
    ShellAPIGui["GuiCoreRemoveShellWebCertificate"] = "gui.core.remove_shell_web_certificate";
    ShellAPIGui["GuiDbconnectionsAddDbConnection"] = "gui.dbconnections.add_db_connection";
    ShellAPIGui["GuiDbconnectionsUpdateDbConnection"] = "gui.dbconnections.update_db_connection";
    ShellAPIGui["GuiDbconnectionsRemoveDbConnection"] = "gui.dbconnections.remove_db_connection";
    ShellAPIGui["GuiDbconnectionsListDbConnections"] = "gui.dbconnections.list_db_connections";
    ShellAPIGui["GuiDbconnectionsGetDbConnection"] = "gui.dbconnections.get_db_connection";
    ShellAPIGui["GuiDbconnectionsGetDbTypes"] = "gui.dbconnections.get_db_types";
    ShellAPIGui["GuiDbconnectionsSetCredential"] = "gui.dbconnections.set_credential";
    ShellAPIGui["GuiDbconnectionsDeleteCredential"] = "gui.dbconnections.delete_credential";
    ShellAPIGui["GuiDbconnectionsListCredentials"] = "gui.dbconnections.list_credentials";
    ShellAPIGui["GuiDbconnectionsTestConnection"] = "gui.dbconnections.test_connection";
    ShellAPIGui["GuiDbconnectionsMoveConnection"] = "gui.dbconnections.move_connection";
    ShellAPIGui["GuiMdsIsGuiModuleBackend"] = "gui.mds.is_gui_module_backend";
    ShellAPIGui["GuiMdsGetGuiModuleDisplayInfo"] = "gui.mds.get_gui_module_display_info";
    ShellAPIGui["GuiModelerIsGuiModuleBackend"] = "gui.modeler.is_gui_module_backend";
    ShellAPIGui["GuiModelerGetGuiModuleDisplayInfo"] = "gui.modeler.get_gui_module_display_info";
    ShellAPIGui["GuiShellIsGuiModuleBackend"] = "gui.shell.is_gui_module_backend";
    ShellAPIGui["GuiShellGetGuiModuleDisplayInfo"] = "gui.shell.get_gui_module_display_info";
    ShellAPIGui["GuiShellStartSession"] = "gui.shell.start_session";
    ShellAPIGui["GuiShellCloseSession"] = "gui.shell.close_session";
    ShellAPIGui["GuiShellExecute"] = "gui.shell.execute";
    ShellAPIGui["GuiShellComplete"] = "gui.shell.complete";
    ShellAPIGui["GuiShellKillTask"] = "gui.shell.kill_task";
    ShellAPIGui["GuiSqleditorIsGuiModuleBackend"] = "gui.sqleditor.is_gui_module_backend";
    ShellAPIGui["GuiSqleditorGetGuiModuleDisplayInfo"] = "gui.sqleditor.get_gui_module_display_info";
    ShellAPIGui["GuiSqleditorStartSession"] = "gui.sqleditor.start_session";
    ShellAPIGui["GuiSqleditorCloseSession"] = "gui.sqleditor.close_session";
    ShellAPIGui["GuiSqleditorOpenConnection"] = "gui.sqleditor.open_connection";
    ShellAPIGui["GuiSqleditorReconnect"] = "gui.sqleditor.reconnect";
    ShellAPIGui["GuiSqleditorExecute"] = "gui.sqleditor.execute";
    ShellAPIGui["GuiSqleditorKillQuery"] = "gui.sqleditor.kill_query";
    ShellAPIGui["GuiSqleditorGetCurrentSchema"] = "gui.sqleditor.get_current_schema";
    ShellAPIGui["GuiSqleditorSetCurrentSchema"] = "gui.sqleditor.set_current_schema";
    ShellAPIGui["GuiSqleditorGetAutoCommit"] = "gui.sqleditor.get_auto_commit";
    ShellAPIGui["GuiSqleditorSetAutoCommit"] = "gui.sqleditor.set_auto_commit";
    ShellAPIGui["GuiUsersCreateUser"] = "gui.users.create_user";
    ShellAPIGui["GuiUsersSetAllowedHosts"] = "gui.users.set_allowed_hosts";
    ShellAPIGui["GuiUsersDeleteUser"] = "gui.users.delete_user";
    ShellAPIGui["GuiUsersGrantRole"] = "gui.users.grant_role";
    ShellAPIGui["GuiUsersGetUserId"] = "gui.users.get_user_id";
    ShellAPIGui["GuiUsersListUsers"] = "gui.users.list_users";
    ShellAPIGui["GuiUsersListUserRoles"] = "gui.users.list_user_roles";
    ShellAPIGui["GuiUsersListRoles"] = "gui.users.list_roles";
    ShellAPIGui["GuiUsersListRolePrivileges"] = "gui.users.list_role_privileges";
    ShellAPIGui["GuiUsersListUserPrivileges"] = "gui.users.list_user_privileges";
    ShellAPIGui["GuiUsersGetGuiModuleList"] = "gui.users.get_gui_module_list";
    ShellAPIGui["GuiUsersListProfiles"] = "gui.users.list_profiles";
    ShellAPIGui["GuiUsersGetProfile"] = "gui.users.get_profile";
    ShellAPIGui["GuiUsersUpdateProfile"] = "gui.users.update_profile";
    ShellAPIGui["GuiUsersAddProfile"] = "gui.users.add_profile";
    ShellAPIGui["GuiUsersDeleteProfile"] = "gui.users.delete_profile";
    ShellAPIGui["GuiUsersGetDefaultProfile"] = "gui.users.get_default_profile";
    ShellAPIGui["GuiUsersSetDefaultProfile"] = "gui.users.set_default_profile";
    ShellAPIGui["GuiUsersSetCurrentProfile"] = "gui.users.set_current_profile";
    ShellAPIGui["GuiUsersListUserGroups"] = "gui.users.list_user_groups";
    ShellAPIGui["GuiUsersCreateUserGroup"] = "gui.users.create_user_group";
    ShellAPIGui["GuiUsersAddUserToGroup"] = "gui.users.add_user_to_group";
    ShellAPIGui["GuiUsersRemoveUserFromGroup"] = "gui.users.remove_user_from_group";
    ShellAPIGui["GuiUsersUpdateUserGroup"] = "gui.users.update_user_group";
    ShellAPIGui["GuiUsersRemoveUserGroup"] = "gui.users.remove_user_group";
    ShellAPIGui["GuiDebuggerIsGuiModuleBackend"] = "gui.debugger.is_gui_module_backend";
    ShellAPIGui["GuiDebuggerGetGuiModuleDisplayInfo"] = "gui.debugger.get_gui_module_display_info";
    ShellAPIGui["GuiDebuggerGetScripts"] = "gui.debugger.get_scripts";
    ShellAPIGui["GuiDebuggerGetScriptContent"] = "gui.debugger.get_script_content";
    ShellAPIGui["GuiModulesAddData"] = "gui.modules.add_data";
    ShellAPIGui["GuiModulesListData"] = "gui.modules.list_data";
    ShellAPIGui["GuiModulesGetDataContent"] = "gui.modules.get_data_content";
    ShellAPIGui["GuiModulesShareDataToUserGroup"] = "gui.modules.share_data_to_user_group";
    ShellAPIGui["GuiModulesAddDataToProfile"] = "gui.modules.add_data_to_profile";
    ShellAPIGui["GuiModulesUpdateData"] = "gui.modules.update_data";
    ShellAPIGui["GuiModulesDeleteData"] = "gui.modules.delete_data";
    ShellAPIGui["GuiModulesListDataCategories"] = "gui.modules.list_data_categories";
    ShellAPIGui["GuiModulesAddDataCategory"] = "gui.modules.add_data_category";
    ShellAPIGui["GuiModulesRemoveDataCategory"] = "gui.modules.remove_data_category";
    ShellAPIGui["GuiModulesGetDataCategoryId"] = "gui.modules.get_data_category_id";
    ShellAPIGui["GuiModulesCreateProfileDataTree"] = "gui.modules.create_profile_data_tree";
    ShellAPIGui["GuiModulesGetProfileDataTree"] = "gui.modules.get_profile_data_tree";
    ShellAPIGui["GuiModulesCreateUserGroupDataTree"] = "gui.modules.create_user_group_data_tree";
    ShellAPIGui["GuiModulesGetUserGroupDataTree"] = "gui.modules.get_user_group_data_tree";
    ShellAPIGui["GuiModulesGetProfileTreeIdentifiers"] = "gui.modules.get_profile_tree_identifiers";
    ShellAPIGui["GuiModulesMoveData"] = "gui.modules.move_data";
    ShellAPIGui["GuiDbGetObjectsTypes"] = "gui.db.get_objects_types";
    ShellAPIGui["GuiDbGetCatalogObjectNames"] = "gui.db.get_catalog_object_names";
    ShellAPIGui["GuiDbGetSchemaObjectNames"] = "gui.db.get_schema_object_names";
    ShellAPIGui["GuiDbGetTableObjectNames"] = "gui.db.get_table_object_names";
    ShellAPIGui["GuiDbGetCatalogObject"] = "gui.db.get_catalog_object";
    ShellAPIGui["GuiDbGetSchemaObject"] = "gui.db.get_schema_object";
    ShellAPIGui["GuiDbGetTableObject"] = "gui.db.get_table_object";
    ShellAPIGui["GuiDbStartSession"] = "gui.db.start_session";
    ShellAPIGui["GuiDbCloseSession"] = "gui.db.close_session";
    ShellAPIGui["GuiDbReconnect"] = "gui.db.reconnect";
    ShellAPIGui["GuiInfo"] = "gui.info";
    ShellAPIGui["GuiVersion"] = "gui.version";
})(ShellAPIGui = exports.ShellAPIGui || (exports.ShellAPIGui = {}));
class ProtocolGui extends _1.Protocol {
    static getRequestClusterIsGuiModuleBackend() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiClusterIsGuiModuleBackend, {
            args: {},
        });
    }
    static getRequestClusterGetGuiModuleDisplayInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiClusterGetGuiModuleDisplayInfo, {
            args: {},
        });
    }
    static getRequestCoreSetLogLevel(logLevel = "INFO") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreSetLogLevel, {
            args: {
                log_level: logLevel,
            },
        });
    }
    static getRequestCoreGetLogLevel() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreGetLogLevel, {
            args: {},
        });
    }
    static getRequestCoreListFiles(path = "") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreListFiles, {
            args: {
                path,
            },
        });
    }
    static getRequestCoreCreateFile(path) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreCreateFile, {
            args: {
                path,
            },
        });
    }
    static getRequestCoreValidatePath(path) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreValidatePath, {
            args: {
                path,
            },
        });
    }
    static getRequestCoreGetBackendInformation() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreGetBackendInformation, {
            args: {},
        });
    }
    static getRequestCoreIsShellWebCertificateInstalled(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                check_keychain: kwargs.checkKeychain,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreIsShellWebCertificateInstalled, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestCoreInstallShellWebCertificate(kwargs) {
        let kwargsToUse;
        if (kwargs) {
            kwargsToUse = {
                keychain: kwargs.keychain,
                replace_existing: kwargs.replaceExisting,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreInstallShellWebCertificate, {
            args: {},
            kwargs: kwargsToUse,
        });
    }
    static getRequestCoreRemoveShellWebCertificate() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiCoreRemoveShellWebCertificate, {
            args: {},
        });
    }
    static getRequestDbconnectionsAddDbConnection(profileId, connection, folderPath = "") {
        const connectionToUse = {
            db_type: connection.dbType,
            caption: connection.caption,
            description: connection.description,
            options: connection.options,
        };
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsAddDbConnection, {
            args: {
                profile_id: profileId,
                connection: connectionToUse,
                folder_path: folderPath,
            },
        });
    }
    static getRequestDbconnectionsUpdateDbConnection(profileId, connectionId, connection, folderPath = "") {
        const connectionToUse = {
            db_type: connection.dbType,
            caption: connection.caption,
            description: connection.description,
            options: connection.options,
        };
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsUpdateDbConnection, {
            args: {
                profile_id: profileId,
                connection_id: connectionId,
                connection: connectionToUse,
                folder_path: folderPath,
            },
        });
    }
    static getRequestDbconnectionsRemoveDbConnection(profileId, connectionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsRemoveDbConnection, {
            args: {
                profile_id: profileId,
                connection_id: connectionId,
            },
        });
    }
    static getRequestDbconnectionsListDbConnections(profileId, folderPath = "") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsListDbConnections, {
            args: {
                profile_id: profileId,
                folder_path: folderPath,
            },
        });
    }
    static getRequestDbconnectionsGetDbConnection(dbConnectionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsGetDbConnection, {
            args: {
                db_connection_id: dbConnectionId,
            },
        });
    }
    static getRequestDbconnectionsGetDbTypes() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsGetDbTypes, {
            args: {},
        });
    }
    static getRequestDbconnectionsSetCredential(url, password) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsSetCredential, {
            args: {
                url,
                password,
            },
        });
    }
    static getRequestDbconnectionsDeleteCredential(url) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsDeleteCredential, {
            args: {
                url,
            },
        });
    }
    static getRequestDbconnectionsListCredentials() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsListCredentials, {
            args: {},
        });
    }
    static getRequestDbconnectionsTestConnection(connection, password) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsTestConnection, {
            args: {
                connection,
                password,
            },
        });
    }
    static getRequestDbconnectionsMoveConnection(profileId, folderPath, connectionIdToMove, connectionIdOffset, before = false) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbconnectionsMoveConnection, {
            args: {
                profile_id: profileId,
                folder_path: folderPath,
                connection_id_to_move: connectionIdToMove,
                connection_id_offset: connectionIdOffset,
                before,
            },
        });
    }
    static getRequestMdsIsGuiModuleBackend() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiMdsIsGuiModuleBackend, {
            args: {},
        });
    }
    static getRequestMdsGetGuiModuleDisplayInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiMdsGetGuiModuleDisplayInfo, {
            args: {},
        });
    }
    static getRequestModelerIsGuiModuleBackend() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModelerIsGuiModuleBackend, {
            args: {},
        });
    }
    static getRequestModelerGetGuiModuleDisplayInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModelerGetGuiModuleDisplayInfo, {
            args: {},
        });
    }
    static getRequestShellIsGuiModuleBackend() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiShellIsGuiModuleBackend, {
            args: {},
        });
    }
    static getRequestShellGetGuiModuleDisplayInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiShellGetGuiModuleDisplayInfo, {
            args: {},
        });
    }
    static getRequestShellStartSession(dbConnectionId, shellArgs) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiShellStartSession, {
            args: {
                db_connection_id: dbConnectionId,
                shell_args: shellArgs,
            },
        });
    }
    static getRequestShellCloseSession(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiShellCloseSession, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestShellExecute(command, moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiShellExecute, {
            args: {
                command,
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestShellComplete(data, offset, moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiShellComplete, {
            args: {
                data,
                offset,
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestShellKillTask(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiShellKillTask, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestSqleditorIsGuiModuleBackend() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorIsGuiModuleBackend, {
            args: {},
        });
    }
    static getRequestSqleditorGetGuiModuleDisplayInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorGetGuiModuleDisplayInfo, {
            args: {},
        });
    }
    static getRequestSqleditorStartSession() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorStartSession, {
            args: {},
        });
    }
    static getRequestSqleditorCloseSession(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorCloseSession, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestSqleditorOpenConnection(dbConnectionId, moduleSessionId, password) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorOpenConnection, {
            args: {
                db_connection_id: dbConnectionId,
                module_session_id: moduleSessionId,
                password,
            },
        });
    }
    static getRequestSqleditorReconnect(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorReconnect, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestSqleditorExecute(sql, moduleSessionId, params, options) {
        let optionsToUse;
        if (options) {
            optionsToUse = {
                row_packet_size: options.rowPacketSize,
            };
        }
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorExecute, {
            args: {
                sql,
                module_session_id: moduleSessionId,
                params,
                options: optionsToUse,
            },
        });
    }
    static getRequestSqleditorKillQuery(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorKillQuery, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestSqleditorGetCurrentSchema(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorGetCurrentSchema, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestSqleditorSetCurrentSchema(moduleSessionId, schemaName) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorSetCurrentSchema, {
            args: {
                module_session_id: moduleSessionId,
                schema_name: schemaName,
            },
        });
    }
    static getRequestSqleditorGetAutoCommit(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorGetAutoCommit, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestSqleditorSetAutoCommit(moduleSessionId, state) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiSqleditorSetAutoCommit, {
            args: {
                module_session_id: moduleSessionId,
                state,
            },
        });
    }
    static getRequestUsersCreateUser(username, password, role, allowedHosts) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersCreateUser, {
            args: {
                username,
                password,
                role,
                allowed_hosts: allowedHosts,
            },
        });
    }
    static getRequestUsersSetAllowedHosts(userId, allowedHosts) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersSetAllowedHosts, {
            args: {
                user_id: userId,
                allowed_hosts: allowedHosts,
            },
        });
    }
    static getRequestUsersDeleteUser(username) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersDeleteUser, {
            args: {
                username,
            },
        });
    }
    static getRequestUsersGrantRole(username, role) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersGrantRole, {
            args: {
                username,
                role,
            },
        });
    }
    static getRequestUsersGetUserId(username) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersGetUserId, {
            args: {
                username,
            },
        });
    }
    static getRequestUsersListUsers() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersListUsers, {
            args: {},
        });
    }
    static getRequestUsersListUserRoles(username) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersListUserRoles, {
            args: {
                username,
            },
        });
    }
    static getRequestUsersListRoles() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersListRoles, {
            args: {},
        });
    }
    static getRequestUsersListRolePrivileges(role) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersListRolePrivileges, {
            args: {
                role,
            },
        });
    }
    static getRequestUsersListUserPrivileges(username) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersListUserPrivileges, {
            args: {
                username,
            },
        });
    }
    static getRequestUsersGetGuiModuleList(userId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersGetGuiModuleList, {
            args: {
                user_id: userId,
            },
        });
    }
    static getRequestUsersListProfiles(userId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersListProfiles, {
            args: {
                user_id: userId,
            },
        });
    }
    static getRequestUsersGetProfile(profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersGetProfile, {
            args: {
                profile_id: profileId,
            },
        });
    }
    static getRequestUsersUpdateProfile(profile) {
        const profileToUse = {
            id: profile.id,
            name: profile.name,
            description: profile.description,
            options: profile.options,
        };
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersUpdateProfile, {
            args: {
                profile: profileToUse,
            },
        });
    }
    static getRequestUsersAddProfile(userId, profile) {
        const profileToUse = {
            name: profile.name,
            description: profile.description,
            options: profile.options,
        };
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersAddProfile, {
            args: {
                user_id: userId,
                profile: profileToUse,
            },
        });
    }
    static getRequestUsersDeleteProfile(userId, profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersDeleteProfile, {
            args: {
                user_id: userId,
                profile_id: profileId,
            },
        });
    }
    static getRequestUsersGetDefaultProfile(userId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersGetDefaultProfile, {
            args: {
                user_id: userId,
            },
        });
    }
    static getRequestUsersSetDefaultProfile(userId, profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersSetDefaultProfile, {
            args: {
                user_id: userId,
                profile_id: profileId,
            },
        });
    }
    static getRequestUsersSetCurrentProfile(profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersSetCurrentProfile, {
            args: {
                profile_id: profileId,
            },
        });
    }
    static getRequestUsersListUserGroups(memberId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersListUserGroups, {
            args: {
                member_id: memberId,
            },
        });
    }
    static getRequestUsersCreateUserGroup(name, description) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersCreateUserGroup, {
            args: {
                name,
                description,
            },
        });
    }
    static getRequestUsersAddUserToGroup(memberId, groupId, owner = 0) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersAddUserToGroup, {
            args: {
                member_id: memberId,
                group_id: groupId,
                owner,
            },
        });
    }
    static getRequestUsersRemoveUserFromGroup(memberId, groupId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersRemoveUserFromGroup, {
            args: {
                member_id: memberId,
                group_id: groupId,
            },
        });
    }
    static getRequestUsersUpdateUserGroup(groupId, name, description) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersUpdateUserGroup, {
            args: {
                group_id: groupId,
                name,
                description,
            },
        });
    }
    static getRequestUsersRemoveUserGroup(groupId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiUsersRemoveUserGroup, {
            args: {
                group_id: groupId,
            },
        });
    }
    static getRequestDebuggerIsGuiModuleBackend() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDebuggerIsGuiModuleBackend, {
            args: {},
        });
    }
    static getRequestDebuggerGetGuiModuleDisplayInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDebuggerGetGuiModuleDisplayInfo, {
            args: {},
        });
    }
    static getRequestDebuggerGetScripts() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDebuggerGetScripts, {
            args: {},
        });
    }
    static getRequestDebuggerGetScriptContent(path) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDebuggerGetScriptContent, {
            args: {
                path,
            },
        });
    }
    static getRequestModulesAddData(caption, content, dataCategoryId, treeIdentifier, folderPath, profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesAddData, {
            args: {
                caption,
                content,
                data_category_id: dataCategoryId,
                tree_identifier: treeIdentifier,
                folder_path: folderPath,
                profile_id: profileId,
            },
        });
    }
    static getRequestModulesListData(folderId, dataCategoryId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesListData, {
            args: {
                folder_id: folderId,
                data_category_id: dataCategoryId,
            },
        });
    }
    static getRequestModulesGetDataContent(id) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesGetDataContent, {
            args: {
                id,
            },
        });
    }
    static getRequestModulesShareDataToUserGroup(id, userGroupId, readOnly, treeIdentifier, folderPath) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesShareDataToUserGroup, {
            args: {
                id,
                user_group_id: userGroupId,
                read_only: readOnly,
                tree_identifier: treeIdentifier,
                folder_path: folderPath,
            },
        });
    }
    static getRequestModulesAddDataToProfile(id, profileId, readOnly, treeIdentifier, folderPath) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesAddDataToProfile, {
            args: {
                id,
                profile_id: profileId,
                read_only: readOnly,
                tree_identifier: treeIdentifier,
                folder_path: folderPath,
            },
        });
    }
    static getRequestModulesUpdateData(id, caption, content) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesUpdateData, {
            args: {
                id,
                caption,
                content,
            },
        });
    }
    static getRequestModulesDeleteData(id, folderId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesDeleteData, {
            args: {
                id,
                folder_id: folderId,
            },
        });
    }
    static getRequestModulesListDataCategories(categoryId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesListDataCategories, {
            args: {
                category_id: categoryId,
            },
        });
    }
    static getRequestModulesAddDataCategory(name, parentCategoryId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesAddDataCategory, {
            args: {
                name,
                parent_category_id: parentCategoryId,
            },
        });
    }
    static getRequestModulesRemoveDataCategory(categoryId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesRemoveDataCategory, {
            args: {
                category_id: categoryId,
            },
        });
    }
    static getRequestModulesGetDataCategoryId(name) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesGetDataCategoryId, {
            args: {
                name,
            },
        });
    }
    static getRequestModulesCreateProfileDataTree(treeIdentifier, profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesCreateProfileDataTree, {
            args: {
                tree_identifier: treeIdentifier,
                profile_id: profileId,
            },
        });
    }
    static getRequestModulesGetProfileDataTree(treeIdentifier, profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesGetProfileDataTree, {
            args: {
                tree_identifier: treeIdentifier,
                profile_id: profileId,
            },
        });
    }
    static getRequestModulesCreateUserGroupDataTree(treeIdentifier, userGroupId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesCreateUserGroupDataTree, {
            args: {
                tree_identifier: treeIdentifier,
                user_group_id: userGroupId,
            },
        });
    }
    static getRequestModulesGetUserGroupDataTree(treeIdentifier, userGroupId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesGetUserGroupDataTree, {
            args: {
                tree_identifier: treeIdentifier,
                user_group_id: userGroupId,
            },
        });
    }
    static getRequestModulesGetProfileTreeIdentifiers(profileId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesGetProfileTreeIdentifiers, {
            args: {
                profile_id: profileId,
            },
        });
    }
    static getRequestModulesMoveData(id, treeIdentifier, linkedTo, linkId, sourcePath, targetPath) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiModulesMoveData, {
            args: {
                id,
                tree_identifier: treeIdentifier,
                linked_to: linkedTo,
                link_id: linkId,
                source_path: sourcePath,
                target_path: targetPath,
            },
        });
    }
    static getRequestDbGetObjectsTypes(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbGetObjectsTypes, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestDbGetCatalogObjectNames(moduleSessionId, type, filter = "%") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbGetCatalogObjectNames, {
            args: {
                module_session_id: moduleSessionId,
                type,
                filter,
            },
        });
    }
    static getRequestDbGetSchemaObjectNames(moduleSessionId, type, schemaName, filter = "%", routineType) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbGetSchemaObjectNames, {
            args: {
                module_session_id: moduleSessionId,
                type,
                schema_name: schemaName,
                filter,
                routine_type: routineType,
            },
        });
    }
    static getRequestDbGetTableObjectNames(moduleSessionId, type, schemaName, tableName, filter = "%") {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbGetTableObjectNames, {
            args: {
                module_session_id: moduleSessionId,
                type,
                schema_name: schemaName,
                table_name: tableName,
                filter,
            },
        });
    }
    static getRequestDbGetCatalogObject(moduleSessionId, type, name) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbGetCatalogObject, {
            args: {
                module_session_id: moduleSessionId,
                type,
                name,
            },
        });
    }
    static getRequestDbGetSchemaObject(moduleSessionId, type, schemaName, name) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbGetSchemaObject, {
            args: {
                module_session_id: moduleSessionId,
                type,
                schema_name: schemaName,
                name,
            },
        });
    }
    static getRequestDbGetTableObject(moduleSessionId, type, schemaName, tableName, name) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbGetTableObject, {
            args: {
                module_session_id: moduleSessionId,
                type,
                schema_name: schemaName,
                table_name: tableName,
                name,
            },
        });
    }
    static getRequestDbStartSession(connection, password) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbStartSession, {
            args: {
                connection: typeof connection === "number" ? connection : (0, helpers_1.convertCamelToSnakeCase)(connection),
                password,
            },
        });
    }
    static getRequestDbCloseSession(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbCloseSession, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestDbReconnect(moduleSessionId) {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiDbReconnect, {
            args: {
                module_session_id: moduleSessionId,
            },
        });
    }
    static getRequestInfo() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiInfo, {
            args: {},
        });
    }
    static getRequestVersion() {
        return _1.Protocol.getRequestCommandExecute(ShellAPIGui.GuiVersion, {
            args: {},
        });
    }
}
exports.ProtocolGui = ProtocolGui;
//# sourceMappingURL=ProtocolGui.js.map