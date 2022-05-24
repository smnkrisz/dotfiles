"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = void 0;
const Requisitions_1 = require("../Requisitions");
class Cookies {
    set(name, value) {
        let cookie = "";
        cookie = `${name}=${value !== null && value !== void 0 ? value : ""}`;
        if (!Requisitions_1.appParameters.inExtension) {
            document.cookie = cookie;
        }
    }
    get(name) {
        if (Requisitions_1.appParameters.inExtension || !document.cookie) {
            return null;
        }
        const cookie = document.cookie.split(";").find((item) => {
            return item.split("=")[0].trim() === name;
        });
        if (cookie) {
            const parts = cookie.split("=");
            if (parts.length === 1) {
                return parts[0];
            }
            return parts[1].trim();
        }
        return null;
    }
    remove(name) {
        if (!Requisitions_1.appParameters.inExtension) {
            document.cookie = name + "=; Max-Age=0;";
        }
    }
    clear() {
        if (!Requisitions_1.appParameters.inExtension) {
            for (const cookie of document.cookie.split(";")) {
                this.remove(cookie.split("=")[0].trim());
            }
        }
    }
}
exports.Cookies = Cookies;
//# sourceMappingURL=Cookies.js.map