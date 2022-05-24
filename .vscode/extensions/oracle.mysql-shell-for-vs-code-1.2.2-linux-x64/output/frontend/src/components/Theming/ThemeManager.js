"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeManager = exports.ThemeManager = void 0;
const color_descriptions_json_1 = __importDefault(require("./assets/color-descriptions.json"));
const default_dark_color_theme_json_1 = __importDefault(require("./assets/default-dark-color-theme.json"));
const default_light_color_theme_json_1 = __importDefault(require("./assets/default-light-color-theme.json"));
const color_1 = __importDefault(require("color"));
const Settings_1 = require("../../supplement/Settings/Settings");
const Requisitions_1 = require("../../supplement/Requisitions");
class ThemeManager {
    constructor() {
        this.themeDefinitions = new Map();
        this.currentTheme = "";
        this.updating = false;
        this.settingsChanged = (entry) => {
            if ((entry === null || entry === void 0 ? void 0 : entry.key) === "theming.currentTheme") {
                this.activeTheme = Settings_1.settings.get("theming.currentTheme", "Auto");
                return Promise.resolve(true);
            }
            if (!entry || entry.key === "" || entry.key.startsWith("theming.")) {
                Settings_1.settings.get("theming.themes", []).forEach((definition) => {
                    this.loadThemeDetails(definition);
                });
                this.activeTheme = Settings_1.settings.get("theming.currentTheme", "Auto");
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        };
        this.hostThemeChange = (data) => {
            switch (data.themeClass) {
                case "vscode-dark": {
                    document.body.setAttribute("theme", "dark");
                    this.loadTheme("Default Dark");
                    this.currentTheme = "Default Dark";
                    this.sendChangeNotification(this.currentTheme);
                    break;
                }
                case "vscode-light": {
                    document.body.setAttribute("theme", "light");
                    this.loadTheme("Default Light");
                    this.currentTheme = "Default Light";
                    this.sendChangeNotification(this.currentTheme);
                    break;
                }
                default: {
                    this.currentTheme = "Auto";
                    break;
                }
            }
            return Promise.resolve(true);
        };
        this.handleOSThemeChange = (event) => {
            if (this.currentTheme === "Auto") {
                let actualTheme = "";
                if (event.matches) {
                    actualTheme = "Default Light";
                }
                else {
                    actualTheme = "Default Dark";
                }
                this.loadTheme(actualTheme);
                this.sendChangeNotification(actualTheme);
                this.currentTheme = "Auto";
            }
        };
        this.iterateColorDescription = (source, callback) => {
            if (Array.isArray(source)) {
                source.forEach((element) => {
                    this.iterateColorDescription(element, callback);
                });
            }
            else if (typeof source === "object") {
                for (const [key, value] of Object.entries(source)) {
                    if (typeof value === "string") {
                        callback(key, value);
                    }
                    else {
                        this.iterateColorDescription(value, callback);
                    }
                }
            }
        };
        this.loadThemeDetails(default_dark_color_theme_json_1.default);
        this.loadThemeDetails(default_light_color_theme_json_1.default);
        this.themeStyleElement = document.createElement("style");
        this.themeStyleElement.id = "theme-colors";
        document.head.prepend(this.themeStyleElement);
        if (!Requisitions_1.appParameters.embedded) {
            this.updating = true;
            this.activeTheme = "Auto";
            this.updating = false;
        }
        if (!Requisitions_1.appParameters.embedded) {
            window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", this.handleOSThemeChange);
        }
        Requisitions_1.requisitions.register("settingsChanged", this.settingsChanged);
        Requisitions_1.requisitions.register("hostThemeChange", this.hostThemeChange);
    }
    get activeThemeValues() {
        var _a;
        return (_a = this.themeDefinitions.get(this.currentTheme)) === null || _a === void 0 ? void 0 : _a.json;
    }
    get activeThemeType() {
        const definitions = this.themeDefinitions.get(this.currentTheme);
        if (definitions) {
            return definitions.type;
        }
        return undefined;
    }
    get installedThemes() {
        return Array.from(this.themeDefinitions.keys());
    }
    get themeStyleNode() {
        var _a;
        return ((_a = this.themeStyleElement) === null || _a === void 0 ? void 0 : _a.sheet).cssRules[0].style;
    }
    get currentThemeAsText() {
        var _a;
        return JSON.stringify((_a = this.themeDefinitions.get(this.currentTheme)) === null || _a === void 0 ? void 0 : _a.json, undefined, 4);
    }
    get activeTheme() {
        return this.currentTheme;
    }
    set activeTheme(theme) {
        if (this.currentTheme !== theme) {
            let actualTheme = theme;
            if (theme === "Auto") {
                if (window.matchMedia("(prefers-color-scheme: light)").matches) {
                    actualTheme = "Default Light";
                }
                else {
                    actualTheme = "Default Dark";
                }
                this.loadTheme(actualTheme);
                this.currentTheme = "Auto";
            }
            else {
                this.loadTheme(theme);
            }
            this.updateSettings();
            this.sendChangeNotification(actualTheme);
        }
    }
    saveTheme() {
        const styleNode = this.themeStyleNode;
        const definitions = this.themeDefinitions.get(this.currentTheme);
        if (definitions) {
            const colors = definitions.json.colors || {};
            this.iterateColorDescription(color_descriptions_json_1.default, (key, value) => {
                if (key === "name" && !value.startsWith("#")) {
                    const variable = this.themeValueNameToCssVariable(value);
                    const color = new color_1.default(styleNode.getPropertyValue(variable).trim());
                    colors[value] = color.hexa();
                }
            });
            this.loadThemeDetails(definitions.json);
            definitions.json.colors = colors;
        }
        this.updateSettings();
        this.sendChangeNotification(this.currentTheme);
    }
    loadThemeDetails(values, consolidate = false) {
        let type;
        if (values.type) {
            type = values.type === "dark" ? "dark" : "light";
        }
        else {
            if (values.name.toLowerCase().includes("dark")) {
                type = "dark";
            }
            else {
                type = "light";
            }
        }
        let css = ":root {\n";
        if (!values.colors) {
            if (type === "dark") {
                values.colors = Object.assign({}, default_dark_color_theme_json_1.default.colors);
            }
            else {
                values.colors = Object.assign({}, default_light_color_theme_json_1.default.colors);
            }
        }
        Object.keys(values.colors).forEach((key) => {
            css += "\t" + this.themeValueNameToCssVariable(key) + ": " + values.colors[key] + ";\n";
        });
        css += "}\n";
        const definition = this.themeDefinitions.get(values.name);
        if (definition) {
            definition.css = css;
        }
        else {
            if (!values.tokenColors && values.settings) {
                values.tokenColors = values.settings;
                delete values.settings;
            }
            if (values.include || typeof values.tokenColors === "string") {
                throw new Error("This theme contains references to local files, which cannot be loaded automatically.");
            }
            if (consolidate) {
                this.uiColorSanityCheck(values.colors);
            }
            if (!values.tokenColors) {
                values.tokenColors = [];
            }
            if (consolidate) {
                this.tokenColorSanityCheck(values.tokenColors);
            }
            this.themeDefinitions.set(values.name, { type, css, json: values });
        }
        return values.name;
    }
    themeValueNameToCssVariable(name) {
        return "--" + name.replace(/\./g, "-");
    }
    duplicateCurrentTheme(newName) {
        const data = this.themeDefinitions.get(this.currentTheme);
        if (data) {
            data.json.name = newName;
            this.themeDefinitions.set(newName, Object.assign({}, data));
        }
        this.updateSettings();
        return false;
    }
    removeCurrentTheme() {
        this.themeDefinitions.delete(this.currentTheme);
        if (this.themeDefinitions.size > 0) {
            this.updating = true;
            this.activeTheme = this.themeDefinitions.keys().next().value;
            this.updating = false;
        }
        this.updateSettings();
    }
    sendChangeNotification(theme) {
        const definitions = this.themeDefinitions.get(theme);
        if (definitions) {
            const data = {
                name: this.currentTheme,
                type: definitions.type,
                values: definitions.json,
            };
            void Requisitions_1.requisitions.execute("themeChanged", data);
        }
    }
    loadTheme(name) {
        const values = this.themeDefinitions.get(name);
        if (values) {
            document.body.setAttribute("theme", values.type);
            if (this.themeStyleElement) {
                this.themeStyleElement.innerHTML = values.css;
            }
            this.currentTheme = name;
        }
    }
    uiColorSanityCheck(colors) {
        this.iterateColorDescription(color_descriptions_json_1.default, (key, value) => {
            if (key === "name" && !value.startsWith("#") && !colors[value]) {
                colors[value] = "";
            }
        });
        for (const [key, value] of Object.entries(colors)) {
            colors[key] = this.checkColor(value);
        }
        this.setDefaultValue(colors, "background", "button.background");
        this.setDefaultValue(colors, "list.gridColor", "list.hoverForeground");
        this.setDefaultValue(colors, "list.columnResizerForeground", "list.hoverForeground");
        this.matchAndAssignDefault(/.*[bB]ackground$/, colors, colors.background);
        this.matchAndAssignDefault(/.*[fF]oreground$/, colors, colors.foreground);
        this.matchAndAssignDefault(/.*[bB]order$/, colors, colors["button.border"]);
        for (const [key, value] of Object.entries(colors)) {
            if (value.length === 0) {
                colors[key] = "orangered";
            }
        }
        if (!colors["list.gridColor"]) {
            colors["list.gridColor"] = colors["tree.indentGuidesStroke"];
        }
    }
    tokenColorSanityCheck(entries) {
        entries.forEach((value) => {
            if (value.settings.foreground) {
                value.settings.foreground = this.checkColor(value.settings.foreground);
            }
            if (value.settings.background) {
                value.settings.background = this.checkColor(value.settings.background);
            }
        });
    }
    checkColor(color) {
        let colorString = color.trim();
        if (colorString.length > 0) {
            try {
                const t = new color_1.default(colorString);
            }
            catch (e) {
                colorString = "orangered";
            }
        }
        return colorString;
    }
    matchAndAssignDefault(pattern, colors, defaultValue) {
        if (!defaultValue || defaultValue.length === 0) {
            defaultValue = "";
            this.iterateColorDescription(color_descriptions_json_1.default, (key, value) => {
                if (key === "name" && defaultValue.length === 0 && key.match(pattern) && colors[value].length > 0) {
                    defaultValue = colors[value];
                }
            });
        }
        if (defaultValue.length > 0) {
            for (const [key, value] of Object.entries(colors)) {
                if (key.match(pattern) && value.length === 0) {
                    colors[key] = defaultValue;
                }
            }
        }
    }
    setDefaultValue(colors, target, defaultEntry) {
        if (!colors[target]) {
            colors[target] = colors[defaultEntry];
        }
    }
    updateSettings() {
        if (this.updating) {
            return;
        }
        Settings_1.settings.set("theming.currentTheme", this.currentTheme);
        const themes = [];
        this.themeDefinitions.forEach((definition, key) => {
            if (key !== "Default Dark" && key !== "Default Light") {
                themes.push(definition.json);
            }
        });
        Settings_1.settings.set("theming.themes", themes);
        Settings_1.settings.saveSettings();
    }
}
exports.ThemeManager = ThemeManager;
class SingletonThemeManager extends ThemeManager {
    constructor() {
        super();
    }
}
exports.themeManager = new SingletonThemeManager();
//# sourceMappingURL=ThemeManager.js.map