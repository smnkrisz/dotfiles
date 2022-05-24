import { ValueType } from "..";
export declare class Settings {
    private dirty;
    private values;
    private saveTimer;
    private constructor();
    static get instance(): Settings;
    saveSettings(force?: boolean): void;
    get<T>(key: string, defaultValue: T): ValueType<T>;
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    private objectForKey;
    private validatePath;
    private mergeProfileValues;
    private applicationWillFinish;
    private restartAutoSaveTimeout;
}
export declare const settings: Settings;
