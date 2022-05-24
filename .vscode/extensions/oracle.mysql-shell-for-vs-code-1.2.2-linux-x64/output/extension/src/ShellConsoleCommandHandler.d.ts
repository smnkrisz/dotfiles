import { ExtensionContext } from "vscode";
export declare class ShellConsoleCommandHandler {
    private providers;
    private url?;
    setup(context: ExtensionContext): void;
    closeProviders(): void;
    private get currentProvider();
    private connectedToUrl;
}
