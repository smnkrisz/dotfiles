import { ICommShellProfile } from "../communication";
export interface IModuleData {
    moduleName: string;
    sessionId: string;
}
export interface IWebSession {
    sessionId?: string;
    userId: number;
    userName: string;
    profileId: number;
    moduleSessionId: {
        [key: string]: string;
    };
}
export declare class WebSession {
    localUserMode: boolean;
    private cookies;
    private shellProfile;
    private sessionData;
    private constructor();
    static get instance(): WebSession;
    get userId(): number;
    set userId(userId: number);
    get userName(): string;
    set userName(name: string);
    get profile(): ICommShellProfile;
    set profile(newProfile: ICommShellProfile);
    get currentProfileId(): number;
    get sessionId(): string | undefined;
    set sessionId(id: string | undefined);
    clearSessionData(): void;
    moduleSessionId(moduleName: string): string | undefined;
    setModuleSessionId(moduleName: string, sessionId?: string): void;
    loadProfile(newProfile: ICommShellProfile): void;
    saveProfile(): void;
    private writeSessionData;
}
export declare const webSession: WebSession;
