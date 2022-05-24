import { IColumnInfo, IDictionary } from "../app-logic/Types";
import { DBType } from "./ShellInterface";
export declare type EditorLanguage = ("text" | "typescript" | "javascript" | "mysql" | "sql" | "python" | "json" | "markdown" | "msg" | "xml" | "ini");
export interface ITextRange {
    readonly startLine: number;
    readonly startColumn: number;
    readonly endLine: number;
    readonly endColumn: number;
}
export interface IExecutionContext {
    id: string;
    code: string;
    codeLength: number;
    language: EditorLanguage;
    isSQLLike: boolean;
    linkId?: number;
}
export interface ISqlPageRequest {
    context: IExecutionContext;
    oldRequestId: string;
    page: number;
    sql: string;
}
export interface IRunQueryRequest {
    data: IDictionary;
    query: string;
    parameters: Array<[string, string]>;
    linkId: number;
}
export interface IRunScriptRequest {
    content: string;
}
export { Stack } from "./Stack";
export declare type WorkerExecutorType<T> = (onResult?: ((taskId: number, value: T) => void), onError?: ((taskId: number, reason?: unknown) => void)) => void;
export interface IThenableCallback<T> {
    then: (onResult?: ((taskId: number, value: T) => void)) => IThenableCallback<T>;
    catch: (onError?: ((taskId: number, reason?: unknown) => void)) => void;
}
export declare type ValueType<T> = T extends string ? string : T extends number ? number : T extends boolean ? boolean : T extends undefined ? undefined : [T] extends [unknown] ? T : object;
export declare const generateColumnInfo: (dbType: DBType, rawColumns?: {
    name: string;
    type: string;
    length: number;
}[] | undefined) => IColumnInfo[];
export declare const convertRows: (columns: IColumnInfo[], rows?: unknown[] | undefined) => IDictionary[];
