import { EditorLanguage } from "../../supplement";
export declare enum EntityType {
    Console = 0,
    Script = 1,
    Folder = 2,
    Admin = 3
}
export declare enum SchemaTreeType {
    Document = 0,
    Schema = 1,
    Table = 2,
    StoredFunction = 3,
    StoredProcedure = 4,
    Event = 5,
    Trigger = 6,
    Column = 7,
    View = 8,
    Index = 9,
    ForeignKey = 10,
    GroupNode = 11,
    UserVariable = 12,
    User = 13,
    Engine = 14,
    Plugin = 15,
    Character = 16
}
export interface ISchemaTreeEntry<T = unknown> {
    type: SchemaTreeType;
    expanded: boolean;
    expandedOnce: boolean;
    id: string;
    caption: string;
    qualifiedName: {
        schema: string;
        table?: string;
        name?: string;
    };
    details: T;
    children?: Array<ISchemaTreeEntry<T>>;
}
export interface IEntityBase {
    type: EntityType;
    id: string;
    caption: string;
}
export interface IModuleDataEntry extends IEntityBase {
    moduleDataId: number;
    folderId: number;
}
export interface IFolderEntity extends IModuleDataEntry {
    children: IModuleDataEntry[];
}
export interface IDBEditorScriptState extends IModuleDataEntry {
    language: EditorLanguage;
}
export interface IEditorStatusInfo {
    insertSpaces?: boolean;
    indentSize?: number;
    tabSize?: number;
    line?: number;
    column?: number;
    language?: string;
    eol?: string;
}
export declare const languageMap: Map<EditorLanguage, string>;
