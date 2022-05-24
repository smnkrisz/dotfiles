import { ExtensionContext } from "vscode";
export declare class ExtensionHost {
    private context;
    private activeProfile?;
    private updatingSettings;
    private dbEditorCommandHandler;
    private shellConsoleCommandHandler;
    private mrsCommandHandler;
    private mdsCommandHandler;
    private scriptsTreeDataProvider;
    private consoleTreeDataProvider;
    private shellTasksTreeDataProvider;
    private shellTasks;
    private moduleDataCategories;
    private serverResponseListener;
    private sessionListener;
    constructor(context: ExtensionContext);
    closeAllTabs(): void;
    addNewShellTask(caption: string, shellArgs: string[], dbConnectionId?: number): Promise<unknown>;
    private setupEnvironment;
    private onAuthentication;
    private updateProfileSettings;
    private updateVscodeSettings;
    private selectProfile;
    private taskPromptCallback;
    private taskMessageCallback;
}
