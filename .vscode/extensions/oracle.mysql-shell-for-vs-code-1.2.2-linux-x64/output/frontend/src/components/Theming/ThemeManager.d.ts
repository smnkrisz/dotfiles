export interface IColors {
    [key: string]: string;
}
export interface ITokenEntry {
    name?: string;
    scope: string[] | string;
    settings: {
        foreground?: string;
        background?: string;
        fontStyle?: string;
    };
}
export interface IThemeObject {
    name: string;
    type?: string;
    include?: string;
    colors?: IColors;
    settings?: ITokenEntry[];
    tokenColors?: ITokenEntry[];
}
export interface IThemeChangeData {
    name: string;
    type: "dark" | "light";
    values: IThemeObject;
}
export declare class ThemeManager {
    private themeDefinitions;
    private themeStyleElement?;
    private currentTheme;
    private updating;
    protected constructor();
    get activeThemeValues(): IThemeObject | undefined;
    get activeThemeType(): "dark" | "light" | undefined;
    get installedThemes(): string[];
    get themeStyleNode(): CSSStyleDeclaration;
    get currentThemeAsText(): string;
    get activeTheme(): string;
    set activeTheme(theme: string);
    saveTheme(): void;
    loadThemeDetails(values: IThemeObject, consolidate?: boolean): string;
    themeValueNameToCssVariable(name: string): string;
    duplicateCurrentTheme(newName: string): boolean;
    removeCurrentTheme(): void;
    private sendChangeNotification;
    private settingsChanged;
    private hostThemeChange;
    private handleOSThemeChange;
    private loadTheme;
    private uiColorSanityCheck;
    private tokenColorSanityCheck;
    private checkColor;
    private matchAndAssignDefault;
    private setDefaultValue;
    private iterateColorDescription;
    private updateSettings;
}
declare class SingletonThemeManager extends ThemeManager {
    constructor();
}
export declare const themeManager: SingletonThemeManager;
export {};
