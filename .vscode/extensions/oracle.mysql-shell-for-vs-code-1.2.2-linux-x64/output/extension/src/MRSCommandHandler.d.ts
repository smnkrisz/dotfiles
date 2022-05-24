import { ExtensionContext } from "vscode";
import { ExtensionHost } from "./ExtensionHost";
export declare class MRSCommandHandler {
    private dialogManager;
    setup: (context: ExtensionContext, host: ExtensionHost) => void;
    private showMrsServiceDialog;
    private showMrsSchemaDialog;
}
