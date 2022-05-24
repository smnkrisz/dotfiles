import { Protocol, IShellRequest, IShellDictionary } from ".";
export declare enum ShellAPIGui {
    GuiClusterIsGuiModuleBackend = "gui.cluster.is_gui_module_backend",
    GuiClusterGetGuiModuleDisplayInfo = "gui.cluster.get_gui_module_display_info",
    GuiCoreSetLogLevel = "gui.core.set_log_level",
    GuiCoreGetLogLevel = "gui.core.get_log_level",
    GuiCoreListFiles = "gui.core.list_files",
    GuiCoreCreateFile = "gui.core.create_file",
    GuiCoreValidatePath = "gui.core.validate_path",
    GuiCoreGetBackendInformation = "gui.core.get_backend_information",
    GuiCoreIsShellWebCertificateInstalled = "gui.core.is_shell_web_certificate_installed",
    GuiCoreInstallShellWebCertificate = "gui.core.install_shell_web_certificate",
    GuiCoreRemoveShellWebCertificate = "gui.core.remove_shell_web_certificate",
    GuiDbconnectionsAddDbConnection = "gui.dbconnections.add_db_connection",
    GuiDbconnectionsUpdateDbConnection = "gui.dbconnections.update_db_connection",
    GuiDbconnectionsRemoveDbConnection = "gui.dbconnections.remove_db_connection",
    GuiDbconnectionsListDbConnections = "gui.dbconnections.list_db_connections",
    GuiDbconnectionsGetDbConnection = "gui.dbconnections.get_db_connection",
    GuiDbconnectionsGetDbTypes = "gui.dbconnections.get_db_types",
    GuiDbconnectionsSetCredential = "gui.dbconnections.set_credential",
    GuiDbconnectionsDeleteCredential = "gui.dbconnections.delete_credential",
    GuiDbconnectionsListCredentials = "gui.dbconnections.list_credentials",
    GuiDbconnectionsTestConnection = "gui.dbconnections.test_connection",
    GuiDbconnectionsMoveConnection = "gui.dbconnections.move_connection",
    GuiMdsIsGuiModuleBackend = "gui.mds.is_gui_module_backend",
    GuiMdsGetGuiModuleDisplayInfo = "gui.mds.get_gui_module_display_info",
    GuiModelerIsGuiModuleBackend = "gui.modeler.is_gui_module_backend",
    GuiModelerGetGuiModuleDisplayInfo = "gui.modeler.get_gui_module_display_info",
    GuiShellIsGuiModuleBackend = "gui.shell.is_gui_module_backend",
    GuiShellGetGuiModuleDisplayInfo = "gui.shell.get_gui_module_display_info",
    GuiShellStartSession = "gui.shell.start_session",
    GuiShellCloseSession = "gui.shell.close_session",
    GuiShellExecute = "gui.shell.execute",
    GuiShellComplete = "gui.shell.complete",
    GuiShellKillTask = "gui.shell.kill_task",
    GuiSqleditorIsGuiModuleBackend = "gui.sqleditor.is_gui_module_backend",
    GuiSqleditorGetGuiModuleDisplayInfo = "gui.sqleditor.get_gui_module_display_info",
    GuiSqleditorStartSession = "gui.sqleditor.start_session",
    GuiSqleditorCloseSession = "gui.sqleditor.close_session",
    GuiSqleditorOpenConnection = "gui.sqleditor.open_connection",
    GuiSqleditorReconnect = "gui.sqleditor.reconnect",
    GuiSqleditorExecute = "gui.sqleditor.execute",
    GuiSqleditorKillQuery = "gui.sqleditor.kill_query",
    GuiSqleditorGetCurrentSchema = "gui.sqleditor.get_current_schema",
    GuiSqleditorSetCurrentSchema = "gui.sqleditor.set_current_schema",
    GuiSqleditorGetAutoCommit = "gui.sqleditor.get_auto_commit",
    GuiSqleditorSetAutoCommit = "gui.sqleditor.set_auto_commit",
    GuiUsersCreateUser = "gui.users.create_user",
    GuiUsersSetAllowedHosts = "gui.users.set_allowed_hosts",
    GuiUsersDeleteUser = "gui.users.delete_user",
    GuiUsersGrantRole = "gui.users.grant_role",
    GuiUsersGetUserId = "gui.users.get_user_id",
    GuiUsersListUsers = "gui.users.list_users",
    GuiUsersListUserRoles = "gui.users.list_user_roles",
    GuiUsersListRoles = "gui.users.list_roles",
    GuiUsersListRolePrivileges = "gui.users.list_role_privileges",
    GuiUsersListUserPrivileges = "gui.users.list_user_privileges",
    GuiUsersGetGuiModuleList = "gui.users.get_gui_module_list",
    GuiUsersListProfiles = "gui.users.list_profiles",
    GuiUsersGetProfile = "gui.users.get_profile",
    GuiUsersUpdateProfile = "gui.users.update_profile",
    GuiUsersAddProfile = "gui.users.add_profile",
    GuiUsersDeleteProfile = "gui.users.delete_profile",
    GuiUsersGetDefaultProfile = "gui.users.get_default_profile",
    GuiUsersSetDefaultProfile = "gui.users.set_default_profile",
    GuiUsersSetCurrentProfile = "gui.users.set_current_profile",
    GuiUsersListUserGroups = "gui.users.list_user_groups",
    GuiUsersCreateUserGroup = "gui.users.create_user_group",
    GuiUsersAddUserToGroup = "gui.users.add_user_to_group",
    GuiUsersRemoveUserFromGroup = "gui.users.remove_user_from_group",
    GuiUsersUpdateUserGroup = "gui.users.update_user_group",
    GuiUsersRemoveUserGroup = "gui.users.remove_user_group",
    GuiDebuggerIsGuiModuleBackend = "gui.debugger.is_gui_module_backend",
    GuiDebuggerGetGuiModuleDisplayInfo = "gui.debugger.get_gui_module_display_info",
    GuiDebuggerGetScripts = "gui.debugger.get_scripts",
    GuiDebuggerGetScriptContent = "gui.debugger.get_script_content",
    GuiModulesAddData = "gui.modules.add_data",
    GuiModulesListData = "gui.modules.list_data",
    GuiModulesGetDataContent = "gui.modules.get_data_content",
    GuiModulesShareDataToUserGroup = "gui.modules.share_data_to_user_group",
    GuiModulesAddDataToProfile = "gui.modules.add_data_to_profile",
    GuiModulesUpdateData = "gui.modules.update_data",
    GuiModulesDeleteData = "gui.modules.delete_data",
    GuiModulesListDataCategories = "gui.modules.list_data_categories",
    GuiModulesAddDataCategory = "gui.modules.add_data_category",
    GuiModulesRemoveDataCategory = "gui.modules.remove_data_category",
    GuiModulesGetDataCategoryId = "gui.modules.get_data_category_id",
    GuiModulesCreateProfileDataTree = "gui.modules.create_profile_data_tree",
    GuiModulesGetProfileDataTree = "gui.modules.get_profile_data_tree",
    GuiModulesCreateUserGroupDataTree = "gui.modules.create_user_group_data_tree",
    GuiModulesGetUserGroupDataTree = "gui.modules.get_user_group_data_tree",
    GuiModulesGetProfileTreeIdentifiers = "gui.modules.get_profile_tree_identifiers",
    GuiModulesMoveData = "gui.modules.move_data",
    GuiDbGetObjectsTypes = "gui.db.get_objects_types",
    GuiDbGetCatalogObjectNames = "gui.db.get_catalog_object_names",
    GuiDbGetSchemaObjectNames = "gui.db.get_schema_object_names",
    GuiDbGetTableObjectNames = "gui.db.get_table_object_names",
    GuiDbGetCatalogObject = "gui.db.get_catalog_object",
    GuiDbGetSchemaObject = "gui.db.get_schema_object",
    GuiDbGetTableObject = "gui.db.get_table_object",
    GuiDbStartSession = "gui.db.start_session",
    GuiDbCloseSession = "gui.db.close_session",
    GuiDbReconnect = "gui.db.reconnect",
    GuiInfo = "gui.info",
    GuiVersion = "gui.version"
}
export interface IShellCoreIsShellWebCertificateInstalledKwargs {
    checkKeychain?: boolean;
}
export interface IShellCoreInstallShellWebCertificateKwargs {
    keychain?: boolean;
    replaceExisting?: boolean;
}
export interface IShellDbConnection {
    dbType: string;
    caption: string;
    description: string;
    options: IShellDictionary;
}
export interface IShellQueryOptions {
    rowPacketSize?: number;
}
export interface IShellUsersUpdateProfileProfile {
    id: number;
    name: string;
    description: string;
    options: IShellDictionary;
}
export interface IShellUsersAddProfileProfile {
    name: string;
    description: string;
    options: IShellDictionary;
}
export declare class ProtocolGui extends Protocol {
    static getRequestClusterIsGuiModuleBackend(): IShellRequest;
    static getRequestClusterGetGuiModuleDisplayInfo(): IShellRequest;
    static getRequestCoreSetLogLevel(logLevel?: string): IShellRequest;
    static getRequestCoreGetLogLevel(): IShellRequest;
    static getRequestCoreListFiles(path?: string): IShellRequest;
    static getRequestCoreCreateFile(path: string): IShellRequest;
    static getRequestCoreValidatePath(path: string): IShellRequest;
    static getRequestCoreGetBackendInformation(): IShellRequest;
    static getRequestCoreIsShellWebCertificateInstalled(kwargs?: IShellCoreIsShellWebCertificateInstalledKwargs): IShellRequest;
    static getRequestCoreInstallShellWebCertificate(kwargs?: IShellCoreInstallShellWebCertificateKwargs): IShellRequest;
    static getRequestCoreRemoveShellWebCertificate(): IShellRequest;
    static getRequestDbconnectionsAddDbConnection(profileId: number, connection: IShellDbConnection, folderPath?: string): IShellRequest;
    static getRequestDbconnectionsUpdateDbConnection(profileId: number, connectionId: number, connection: IShellDbConnection, folderPath?: string): IShellRequest;
    static getRequestDbconnectionsRemoveDbConnection(profileId: number, connectionId: number): IShellRequest;
    static getRequestDbconnectionsListDbConnections(profileId: number, folderPath?: string): IShellRequest;
    static getRequestDbconnectionsGetDbConnection(dbConnectionId: number): IShellRequest;
    static getRequestDbconnectionsGetDbTypes(): IShellRequest;
    static getRequestDbconnectionsSetCredential(url: string, password: string): IShellRequest;
    static getRequestDbconnectionsDeleteCredential(url: string): IShellRequest;
    static getRequestDbconnectionsListCredentials(): IShellRequest;
    static getRequestDbconnectionsTestConnection(connection: IShellDbConnection | number, password?: string): IShellRequest;
    static getRequestDbconnectionsMoveConnection(profileId: number, folderPath: string, connectionIdToMove: number, connectionIdOffset: number, before?: boolean): IShellRequest;
    static getRequestMdsIsGuiModuleBackend(): IShellRequest;
    static getRequestMdsGetGuiModuleDisplayInfo(): IShellRequest;
    static getRequestModelerIsGuiModuleBackend(): IShellRequest;
    static getRequestModelerGetGuiModuleDisplayInfo(): IShellRequest;
    static getRequestShellIsGuiModuleBackend(): IShellRequest;
    static getRequestShellGetGuiModuleDisplayInfo(): IShellRequest;
    static getRequestShellStartSession(dbConnectionId?: number, shellArgs?: unknown[]): IShellRequest;
    static getRequestShellCloseSession(moduleSessionId: string): IShellRequest;
    static getRequestShellExecute(command: string, moduleSessionId: string): IShellRequest;
    static getRequestShellComplete(data: string, offset: number, moduleSessionId: string): IShellRequest;
    static getRequestShellKillTask(moduleSessionId: string): IShellRequest;
    static getRequestSqleditorIsGuiModuleBackend(): IShellRequest;
    static getRequestSqleditorGetGuiModuleDisplayInfo(): IShellRequest;
    static getRequestSqleditorStartSession(): IShellRequest;
    static getRequestSqleditorCloseSession(moduleSessionId: string): IShellRequest;
    static getRequestSqleditorOpenConnection(dbConnectionId: number, moduleSessionId: string, password?: string): IShellRequest;
    static getRequestSqleditorReconnect(moduleSessionId: string): IShellRequest;
    static getRequestSqleditorExecute(sql: string, moduleSessionId: string, params?: unknown[], options?: IShellQueryOptions): IShellRequest;
    static getRequestSqleditorKillQuery(moduleSessionId: string): IShellRequest;
    static getRequestSqleditorGetCurrentSchema(moduleSessionId: string): IShellRequest;
    static getRequestSqleditorSetCurrentSchema(moduleSessionId: string, schemaName: string): IShellRequest;
    static getRequestSqleditorGetAutoCommit(moduleSessionId: string): IShellRequest;
    static getRequestSqleditorSetAutoCommit(moduleSessionId: string, state: boolean): IShellRequest;
    static getRequestUsersCreateUser(username: string, password: string, role?: string, allowedHosts?: string): IShellRequest;
    static getRequestUsersSetAllowedHosts(userId: number, allowedHosts: string): IShellRequest;
    static getRequestUsersDeleteUser(username: string): IShellRequest;
    static getRequestUsersGrantRole(username: string, role: string): IShellRequest;
    static getRequestUsersGetUserId(username: string): IShellRequest;
    static getRequestUsersListUsers(): IShellRequest;
    static getRequestUsersListUserRoles(username: string): IShellRequest;
    static getRequestUsersListRoles(): IShellRequest;
    static getRequestUsersListRolePrivileges(role: string): IShellRequest;
    static getRequestUsersListUserPrivileges(username: string): IShellRequest;
    static getRequestUsersGetGuiModuleList(userId: number): IShellRequest;
    static getRequestUsersListProfiles(userId: number): IShellRequest;
    static getRequestUsersGetProfile(profileId: number): IShellRequest;
    static getRequestUsersUpdateProfile(profile: IShellUsersUpdateProfileProfile): IShellRequest;
    static getRequestUsersAddProfile(userId: number, profile: IShellUsersAddProfileProfile): IShellRequest;
    static getRequestUsersDeleteProfile(userId: number, profileId: number): IShellRequest;
    static getRequestUsersGetDefaultProfile(userId: number): IShellRequest;
    static getRequestUsersSetDefaultProfile(userId: number, profileId: number): IShellRequest;
    static getRequestUsersSetCurrentProfile(profileId: number): IShellRequest;
    static getRequestUsersListUserGroups(memberId?: number): IShellRequest;
    static getRequestUsersCreateUserGroup(name: string, description: string): IShellRequest;
    static getRequestUsersAddUserToGroup(memberId: number, groupId: number, owner?: number): IShellRequest;
    static getRequestUsersRemoveUserFromGroup(memberId: number, groupId: number): IShellRequest;
    static getRequestUsersUpdateUserGroup(groupId: number, name?: string, description?: string): IShellRequest;
    static getRequestUsersRemoveUserGroup(groupId: number): IShellRequest;
    static getRequestDebuggerIsGuiModuleBackend(): IShellRequest;
    static getRequestDebuggerGetGuiModuleDisplayInfo(): IShellRequest;
    static getRequestDebuggerGetScripts(): IShellRequest;
    static getRequestDebuggerGetScriptContent(path: string): IShellRequest;
    static getRequestModulesAddData(caption: string, content: string, dataCategoryId: number, treeIdentifier: string, folderPath?: string, profileId?: number): IShellRequest;
    static getRequestModulesListData(folderId: number, dataCategoryId?: number): IShellRequest;
    static getRequestModulesGetDataContent(id: number): IShellRequest;
    static getRequestModulesShareDataToUserGroup(id: number, userGroupId: number, readOnly: number, treeIdentifier: string, folderPath?: string): IShellRequest;
    static getRequestModulesAddDataToProfile(id: number, profileId: number, readOnly: number, treeIdentifier: string, folderPath?: string): IShellRequest;
    static getRequestModulesUpdateData(id: number, caption?: string, content?: string): IShellRequest;
    static getRequestModulesDeleteData(id: number, folderId: number): IShellRequest;
    static getRequestModulesListDataCategories(categoryId?: number): IShellRequest;
    static getRequestModulesAddDataCategory(name: string, parentCategoryId?: number): IShellRequest;
    static getRequestModulesRemoveDataCategory(categoryId: number): IShellRequest;
    static getRequestModulesGetDataCategoryId(name: string): IShellRequest;
    static getRequestModulesCreateProfileDataTree(treeIdentifier: string, profileId?: number): IShellRequest;
    static getRequestModulesGetProfileDataTree(treeIdentifier: string, profileId?: number): IShellRequest;
    static getRequestModulesCreateUserGroupDataTree(treeIdentifier: string, userGroupId?: number): IShellRequest;
    static getRequestModulesGetUserGroupDataTree(treeIdentifier: string, userGroupId?: number): IShellRequest;
    static getRequestModulesGetProfileTreeIdentifiers(profileId?: number): IShellRequest;
    static getRequestModulesMoveData(id: number, treeIdentifier: string, linkedTo: string, linkId: number, sourcePath: string, targetPath: string): IShellRequest;
    static getRequestDbGetObjectsTypes(moduleSessionId: string): IShellRequest;
    static getRequestDbGetCatalogObjectNames(moduleSessionId: string, type: string, filter?: string): IShellRequest;
    static getRequestDbGetSchemaObjectNames(moduleSessionId: string, type: string, schemaName: string, filter?: string, routineType?: string): IShellRequest;
    static getRequestDbGetTableObjectNames(moduleSessionId: string, type: string, schemaName: string, tableName: string, filter?: string): IShellRequest;
    static getRequestDbGetCatalogObject(moduleSessionId: string, type: string, name: string): IShellRequest;
    static getRequestDbGetSchemaObject(moduleSessionId: string, type: string, schemaName: string, name: string): IShellRequest;
    static getRequestDbGetTableObject(moduleSessionId: string, type: string, schemaName: string, tableName: string, name: string): IShellRequest;
    static getRequestDbStartSession(connection: IShellDbConnection | number, password?: string): IShellRequest;
    static getRequestDbCloseSession(moduleSessionId: string): IShellRequest;
    static getRequestDbReconnect(moduleSessionId: string): IShellRequest;
    static getRequestInfo(): IShellRequest;
    static getRequestVersion(): IShellRequest;
}
