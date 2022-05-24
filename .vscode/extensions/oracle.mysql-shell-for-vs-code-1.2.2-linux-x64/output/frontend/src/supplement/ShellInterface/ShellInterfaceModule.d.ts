import { ListenerEntry } from "../Dispatch";
import { EditorLanguage } from "..";
import { IShellInterface } from ".";
import { IModuleDataEntry } from "../../modules/SQLNotebook";
export declare enum StandardDataCategories {
    Text = 1,
    Script = 2,
    JSON = 3,
    MySQLScript = 4,
    PythonScript = 5,
    JavaScriptScript = 6,
    TypeScriptScript = 7,
    SQLiteScript = 8
}
export declare class ShellInterfaceModule implements IShellInterface {
    readonly id = "module";
    private scriptCategoryToLanguage;
    private languageToScriptCategory;
    addData(caption: string, content: string, dataCategoryId: number, treeIdentifier: string, folderPath?: string, profileId?: number): ListenerEntry;
    listData(folderId: number, dataCategoryId?: number): ListenerEntry;
    getDataContent(dataId: number): ListenerEntry;
    createProfileDataTree(treeIdentifier: string, profileId?: number): ListenerEntry;
    getProfileDataTree(treeIdentifier: string, profileId?: number): ListenerEntry;
    createUserGroupDataTree(treeIdentifier: string, userGroupId?: number): ListenerEntry;
    getUserGroupDataTree(treeIdentifier: string, userGroupId?: number): ListenerEntry;
    getProfileDataTreeIdentifiers(profileId?: number): ListenerEntry;
    shareDataToUserGroup(id: number, userGroupId: number, readOnly: number, treeIdentifier: string, folderPath?: string): ListenerEntry;
    addDataToProfile(id: number, profileId: number, readOnly: number, treeIdentifier: string, folderPath?: string): ListenerEntry;
    updateData(id: number, caption?: string, content?: string): ListenerEntry;
    deleteData(id: number, folderId: number): ListenerEntry;
    listDataCategories(parentID?: number): ListenerEntry;
    addDataCategory(category: string, parent?: number): ListenerEntry;
    removeDataCategory(categoryId: number): ListenerEntry;
    scriptTypeFromLanguage(language: EditorLanguage): number | undefined;
    loadScriptsTree(profileId?: number): Promise<IModuleDataEntry[]>;
    private loadScriptTreeEntries;
    private loadDataTree;
    private loadScriptStates;
}
