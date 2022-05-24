export declare type ShellDictionaryType = string | number | boolean | undefined | unknown | null | IShellDictionary;
export interface IShellDictionary {
    [key: string]: ShellDictionaryType | ShellDictionaryType[];
}
export declare enum ShellPromptResponseType {
    Ok = "OK",
    Cancel = "CANCEL"
}
export interface IShellRequest extends IShellDictionary {
    request_id: string;
    request: string;
    command?: string;
    args?: IShellDictionary;
}
export declare class Protocol {
    static getRequestCommandExecute(command: string, rest: IShellDictionary): IShellRequest;
    static getRequestUsersAuthenticate(username: string, password: string): IShellRequest;
    static getRequestPromptReply(request_id: string, type: ShellPromptResponseType, reply: string, moduleSessionId: string): IShellRequest;
    static getStandardRequest(request: string, rest?: IShellDictionary): IShellRequest;
}
