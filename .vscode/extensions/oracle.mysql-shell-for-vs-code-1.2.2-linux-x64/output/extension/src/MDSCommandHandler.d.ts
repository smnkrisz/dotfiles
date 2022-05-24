import { ExtensionContext } from "vscode";
import { ExtensionHost } from "./ExtensionHost";
export declare class MDSCommandHandler {
    private shellSession;
    private ociTreeDataProvider;
    setup: (context: ExtensionContext, host: ExtensionHost) => void;
    private showNewJsonDocument;
}
