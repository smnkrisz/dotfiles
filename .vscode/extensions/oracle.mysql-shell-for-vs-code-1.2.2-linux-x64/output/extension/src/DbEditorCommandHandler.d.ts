import { ExtensionContext } from "vscode";
export declare class DbEditorCommandHandler {
    private connectionsProvider;
    private providers;
    private url?;
    private codeBlocks;
    setup(context: ExtensionContext): void;
    refreshConnectionTree(): void;
    closeProviders(): void;
    private get currentProvider();
    private get newProvider();
    private connectedToUrl;
    private editorRunQuery;
    private determineConnection;
}
