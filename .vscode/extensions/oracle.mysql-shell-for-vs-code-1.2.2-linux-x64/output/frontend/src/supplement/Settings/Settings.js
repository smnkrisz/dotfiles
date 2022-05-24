"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = exports.Settings = void 0;
const WebSession_1 = require("../WebSession");
const Requisitions_1 = require("../Requisitions");
const SettingsRegistry_1 = require("./SettingsRegistry");
class Settings {
    constructor() {
        this.dirty = false;
        this.values = {
            theming: {
                themes: [],
                currentTheme: "Auto",
            },
        };
        this.mergeProfileValues = () => {
            this.values = Object.assign(this.values, WebSession_1.webSession.profile.options);
            this.restartAutoSaveTimeout();
            return Requisitions_1.requisitions.execute("settingsChanged", undefined);
        };
        this.applicationWillFinish = () => {
            if (this.saveTimer) {
                clearTimeout(this.saveTimer);
            }
            Requisitions_1.requisitions.unregister(undefined, this.mergeProfileValues);
            Requisitions_1.requisitions.unregister(undefined, this.applicationWillFinish);
            this.saveSettings();
            return Promise.resolve(true);
        };
        Requisitions_1.requisitions.register("profileLoaded", this.mergeProfileValues);
        Requisitions_1.requisitions.register("applicationWillFinish", this.applicationWillFinish);
    }
    static get instance() {
        (0, SettingsRegistry_1.registerSettings)();
        return new Settings();
    }
    saveSettings(force = false) {
        if (!this.dirty && !force) {
            return;
        }
        this.dirty = false;
        const profile = WebSession_1.webSession.profile;
        profile.options = this.values;
        WebSession_1.webSession.saveProfile();
        this.restartAutoSaveTimeout();
    }
    get(key, defaultValue) {
        var _a;
        const { target, subKey } = this.objectForKey(key, false);
        if (!target || !subKey) {
            return defaultValue;
        }
        return (_a = target[subKey]) !== null && _a !== void 0 ? _a : defaultValue;
    }
    set(key, value) {
        this.dirty = true;
        const { target, subKey } = this.objectForKey(key, true);
        if (target && subKey) {
            target[subKey] = value;
        }
        void Requisitions_1.requisitions.execute("settingsChanged", { key, value });
        void Requisitions_1.requisitions.executeRemote("settingsChanged", { key, value });
    }
    objectForKey(key, canCreate) {
        let run = this.values;
        const parts = key.split(".");
        this.validatePath(key);
        while (parts.length > 1) {
            if (run[parts[0]]) {
                run = run[parts[0]];
            }
            else if (canCreate) {
                run[parts[0]] = {};
                run = run[parts[0]];
            }
            else {
                return { target: undefined };
            }
            parts.splice(0, 1);
        }
        return { target: run, subKey: parts[0] };
    }
    validatePath(path) {
        const [key, category] = (0, SettingsRegistry_1.categoryFromPath)(path);
        if (!category.values.find((value) => {
            return value.key === key;
        })) {
            throw new Error(`The settings path ${path} addresses an unregistered setting.`);
        }
    }
    restartAutoSaveTimeout() {
        if (this.saveTimer) {
            clearInterval(this.saveTimer);
            this.saveTimer = null;
        }
        this.saveTimer = setTimeout(() => {
            return this.saveSettings();
        }, 3000);
    }
}
exports.Settings = Settings;
exports.settings = Settings.instance;
//# sourceMappingURL=Settings.js.map