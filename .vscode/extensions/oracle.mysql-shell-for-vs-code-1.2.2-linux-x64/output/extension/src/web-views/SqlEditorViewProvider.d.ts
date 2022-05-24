import { IMySQLDbSystem } from "../../../frontend/src/communication";
import { IDBEditorScriptState } from "../../../frontend/src/modules/SQLNotebook";
import { WebviewProvider } from "./WebviewProvider";
import { IRunQueryRequest, IRunScriptRequest } from "../../../frontend/src/supplement";
export declare class SqlEditorViewProvider extends WebviewProvider {
    constructor(url: URL, onDispose: (view: WebviewProvider) => void);
    show(caption: string, page: string): Promise<boolean>;
    showPageSection(caption: string, page: string, section: string): Promise<boolean>;
    runQuery(caption: string, page: string, details: IRunQueryRequest): Promise<boolean>;
    runScript(caption: string, page: string, details: IRunScriptRequest): Promise<boolean>;
    insertScriptData(state: IDBEditorScriptState): Promise<boolean>;
    addConnection(caption: string, mdsData?: IMySQLDbSystem, profileName?: String): Promise<boolean>;
    removeConnection(caption: string, connectionId: number): Promise<boolean>;
    editConnection(caption: string, connectionId: number): Promise<boolean>;
    duplicateConnection(caption: string, connectionId: number): Promise<boolean>;
    protected requisitionsCreated(): void;
    protected refreshConnections: () => Promise<boolean>;
    protected refreshOciTree: () => Promise<boolean>;
    protected updateCodeBlock: (data: {
        linkId: number;
        code: string;
    }) => Promise<boolean>;
    private showOpenDialog;
}
