import { IShellSessionDetails } from "../../../frontend/src/supplement/ShellInterface";
import { WebviewProvider } from "./WebviewProvider";
export declare class ShellConsoleViewProvider extends WebviewProvider {
    private openSessions;
    constructor(url: URL, onDispose: (view: WebviewProvider) => void);
    show(caption: string, page: string): Promise<boolean>;
    openSession(caption: string, session: IShellSessionDetails): Promise<boolean>;
    removeSession(caption: string, session: IShellSessionDetails): Promise<boolean>;
    protected requisitionsCreated(): void;
    protected sessionAdded: (session: IShellSessionDetails) => Promise<boolean>;
    protected sessionRemoved: (session: IShellSessionDetails) => Promise<boolean>;
    protected handleDispose(): void;
}
