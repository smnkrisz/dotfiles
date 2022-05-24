"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.strictEval = exports.deepEqual = exports.flattenObject = exports.stripAnsiCode = exports.convertTitleToCamelCase = exports.convertCamelToTitleCase = exports.convertSnakeToCamelCase = exports.convertCamelToSnakeCase = exports.waitFor = exports.sleep = exports.binarySearch = exports.uuid = exports.clampValue = exports.saveTextAsFile = exports.selectFile = exports.loadTextFile = void 0;
const lodash_1 = __importDefault(require("lodash"));
const crypto = __importStar(require("crypto"));
const getRandomValues = (buffer) => {
    if (global.window !== undefined) {
        if (window.crypto && window.crypto.getRandomValues) {
            return window.crypto.getRandomValues(buffer);
        }
    }
    if (crypto.randomBytes) {
        const bytes = crypto.randomBytes(buffer.length);
        buffer.set(bytes);
        return buffer;
    }
    else {
        throw new Error("No random number generator available");
    }
};
const loadTextFile = (name, async, callback) => {
    const request = new XMLHttpRequest();
    request.open("GET", name, async);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            callback(request.responseText);
        }
    };
    request.responseType = "text";
    request.setRequestHeader("Accept", "text/plain");
    request.send(null);
};
exports.loadTextFile = loadTextFile;
const selectFile = (contentType, multiple) => {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.id = "fileSelect";
        input.multiple = multiple;
        input.accept = contentType;
        document.body.appendChild(input);
        input.onchange = () => {
            const files = input.files ? Array.from(input.files) : null;
            if (multiple) {
                resolve(files);
            }
            else {
                resolve(files && files.length > 0 ? files[0] : null);
            }
            document.body.removeChild(input);
        };
        input.click();
    });
};
exports.selectFile = selectFile;
const saveTextAsFile = (text, fileName) => {
    const blob = new Blob([text], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL) {
        downloadLink.href = window.webkitURL.createObjectURL(blob);
    }
    else {
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.onclick = (event) => {
            if (event.target) {
                document.body.removeChild(event.target);
            }
        };
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
    if (window.webkitURL) {
        window.webkitURL.revokeObjectURL(downloadLink.href);
    }
    else {
        window.URL.revokeObjectURL(downloadLink.href);
    }
};
exports.saveTextAsFile = saveTextAsFile;
const clampValue = (value, min, max) => {
    if (!lodash_1.default.isNil(min) && value < min) {
        return min;
    }
    if (!lodash_1.default.isNil(max) && value > max) {
        return max;
    }
    return value;
};
exports.clampValue = clampValue;
const uuid = () => {
    const values = new Uint8Array(1);
    return (`${1e7}${-1e3}${-4e3}${-8e3}${-1e11}`).replace(/[018]/g, (c) => {
        const n = parseInt(c, 10);
        return (((n ^ getRandomValues(values)[0]) & 15) >> n / 4).toString(16);
    });
};
exports.uuid = uuid;
const binarySearch = (list, predicate) => {
    let m = 0;
    let n = list.length - 1;
    while (m <= n) {
        const k = (n + m) >> 1;
        const comparison = predicate(list[k]);
        if (comparison > 0) {
            m = k + 1;
        }
        else if (comparison < 0) {
            n = k - 1;
        }
        else {
            return k;
        }
    }
    return -m - 1;
};
exports.binarySearch = binarySearch;
const sleep = (ms) => {
    return new Promise((resolve) => {
        return setTimeout(resolve, ms);
    });
};
exports.sleep = sleep;
const waitFor = (timeout, condition) => __awaiter(void 0, void 0, void 0, function* () {
    while (!condition() && timeout > 0) {
        timeout -= 100;
        yield (0, exports.sleep)(100);
    }
    return timeout > 0 ? true : false;
});
exports.waitFor = waitFor;
const convertCamelToSnakeCase = (o, options) => {
    var _a;
    return lodash_1.default.deepMapKeys(o, (_a = options === null || options === void 0 ? void 0 : options.ignore) !== null && _a !== void 0 ? _a : [], (value, key) => {
        const snakeCased = key.replace(/([a-z])([A-Z])/g, (full, match1, match2) => {
            return `${match1}_${match2.toLowerCase()}`;
        });
        return snakeCased;
    });
};
exports.convertCamelToSnakeCase = convertCamelToSnakeCase;
const convertSnakeToCamelCase = (o, options) => {
    var _a;
    return lodash_1.default.deepMapKeys(o, (_a = options === null || options === void 0 ? void 0 : options.ignore) !== null && _a !== void 0 ? _a : [], (value, key) => {
        return key.replace(/_([a-z0-9])/gi, (full, match) => {
            return match.toUpperCase();
        });
    });
};
exports.convertSnakeToCamelCase = convertSnakeToCamelCase;
const convertCamelToTitleCase = (s) => {
    if (s.length < 1) {
        return "";
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
};
exports.convertCamelToTitleCase = convertCamelToTitleCase;
const convertTitleToCamelCase = (s) => {
    if (s.length < 1) {
        return "";
    }
    return s.charAt(0).toLowerCase() + s.slice(1);
};
exports.convertTitleToCamelCase = convertTitleToCamelCase;
const ansiRegEx = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
const stripAnsiCode = (s) => {
    return s.replace(ansiRegEx, "");
};
exports.stripAnsiCode = stripAnsiCode;
const flattenObject = (o) => {
    for (const [key, value] of Object.entries(o)) {
        if (typeof value === "object") {
            let result = JSON.stringify(value, undefined, " ");
            result = result.replace(/\n/g, " ");
            result = result.replace(/ +/g, " ");
            result = result.replace(/\[ /g, "[");
            result = result.replace(/ ]/g, "]");
            o[key] = result;
        }
    }
    return o;
};
exports.flattenObject = flattenObject;
const extractMarker = (value) => {
    if (value && typeof value !== "object") {
        return undefined;
    }
    const v = value;
    if (typeof v.symbol !== "symbol") {
        return undefined;
    }
    switch (v.symbol.description) {
        case "ignore": {
            return {
                type: "ignore",
            };
        }
        case "regex": {
            return {
                type: "regex",
                parameters: v.parameters,
            };
        }
        case "list": {
            return {
                type: "list",
                parameters: v.parameters,
            };
        }
        default:
    }
};
const deepEqual = (a, b) => {
    if (a === b) {
        return true;
    }
    if (a === undefined || b === undefined) {
        return false;
    }
    const typeOfA = typeof a;
    const typeOfB = typeof b;
    const markerA = extractMarker(a);
    const markerB = extractMarker(b);
    if (markerA || markerB) {
        if (markerA && markerB) {
            return false;
        }
        const value = markerA ? b : a;
        const marker = markerA !== null && markerA !== void 0 ? markerA : markerB;
        switch (marker === null || marker === void 0 ? void 0 : marker.type) {
            case "ignore": {
                return true;
            }
            case "regex": {
                const pattern = new RegExp(marker.parameters);
                return typeof value === "string" && pattern.exec(value) !== null;
            }
            case "list": {
                if (!Array.isArray(value)) {
                    return false;
                }
                const list = marker.parameters.list;
                const full = marker.parameters.full;
                if (full && value.length !== list.length) {
                    return false;
                }
                for (let i = 0; i < list.length; ++i) {
                    if (!(0, exports.deepEqual)(value[i], list[i])) {
                        return false;
                    }
                }
                return true;
            }
            default: {
                return false;
            }
        }
    }
    if ((typeOfA === "object") && (typeOfB === "object")) {
        const objA = a;
        const objB = b;
        if (Object.keys(objA).length !== Object.keys(objB).length) {
            return false;
        }
        for (const key in objA) {
            if (!(key in objB) || !(0, exports.deepEqual)(objA[key], objB[key])) {
                return false;
            }
        }
        return true;
    }
    else if ((typeof a == "object") || (typeof b == "object")) {
        return false;
    }
    else {
        return Object.is(a, b);
    }
};
exports.deepEqual = deepEqual;
const strictEval = (code) => {
    return Function("'use strict';return (" + code + ")")();
};
exports.strictEval = strictEval;
lodash_1.default.mixin({
    deepMapKeys: (o, ignoreList, fn) => {
        const result = {};
        lodash_1.default.forOwn(o, (v, k) => {
            if (!ignoreList.includes(k)) {
                if (lodash_1.default.isPlainObject(v)) {
                    v = lodash_1.default.deepMapKeys(v, ignoreList, fn);
                }
                else if (lodash_1.default.isArray(v)) {
                    v = lodash_1.default.deepMapArray(v, ignoreList, fn);
                }
            }
            result[fn(v, k)] = v;
        });
        return result;
    },
    deepMapArray: (a, ignoreList, fn) => {
        return a.map((v) => {
            if (lodash_1.default.isPlainObject(v)) {
                return lodash_1.default.deepMapKeys(v, ignoreList, fn);
            }
            else if (lodash_1.default.isArray(v)) {
                return lodash_1.default.deepMapArray(v, ignoreList, fn);
            }
            return v;
        });
    },
});
//# sourceMappingURL=helpers.js.map