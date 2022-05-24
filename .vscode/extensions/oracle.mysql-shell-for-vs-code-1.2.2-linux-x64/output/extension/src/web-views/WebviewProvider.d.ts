import { WebviewPanel } from "vscode";
import { IRequestTypeMap, IRequisitionCallbackValues, RequisitionHub } from "../../../frontend/src/supplement/Requisitions";
export declare class WebviewProvider {
    protected url: URL;
    protected onDispose: (view: WebviewProvider) => void;
    protected panel?: WebviewPanel;
    protected requisitions?: RequisitionHub;
    private notifyOnDispose;
    constructor(url: URL, onDispose: (view: WebviewProvider) => void);
    close(): void;
    runCommand<K extends keyof IRequestTypeMap>(requestType: K, parameter: IRequisitionCallbackValues<K>, caption: string, settingName?: string): Promise<boolean>;
    protected runInPanel(block: () => Promise<boolean>, caption?: string, settingName?: string): Promise<boolean>;
    protected createPanel(caption: string, placement?: string): Promise<boolean>;
    protected handleDispose(): void;
    protected requisitionsCreated(): void;
    private selectConnectionTab;
    private dialogResponse;
    private updateVscodeSettings;
    private prepareEditorGroup;
}
