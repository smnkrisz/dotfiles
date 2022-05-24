"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterInt = exports.formatWithNumber = exports.formatTime = exports.isWhitespaceOnly = exports.convertPropValue = exports.unquote = exports.quote = void 0;
const lodash_1 = require("lodash");
const quotePairs = new Map([
    ["(", ")"],
    ["{", "}"],
    ["[", "]"],
    ["\"", "\""],
    ["'", "'"],
    ["`", "`"],
]);
const quote = (text, quoteChar = "`") => {
    var _a;
    const second = (_a = quotePairs.get(quoteChar)) !== null && _a !== void 0 ? _a : quoteChar;
    if (text.length > 2) {
        const first = text[0];
        const last = text[text.length - 1];
        if (quoteChar === first && second === last) {
            return text;
        }
    }
    return `${quoteChar}${text}${second}`;
};
exports.quote = quote;
const unquote = (text, quotes = "\"'`") => {
    let result = text.trim();
    if (result.length > 1) {
        const first = result[0];
        const last = result[result.length - 1];
        if (quotes.includes(first)) {
            const second = quotePairs.get(first);
            if (second === last) {
                result = result.substring(1, result.length - 1);
            }
        }
    }
    return result;
};
exports.unquote = unquote;
const convertPropValue = (value, numericUnit = "px") => {
    if ((0, lodash_1.isNil)(value)) {
        return;
    }
    if (typeof value === "number") {
        return `${value}${numericUnit}`;
    }
    return value;
};
exports.convertPropValue = convertPropValue;
const isWhitespaceOnly = (str) => {
    return /^\s+$/.test(str);
};
exports.isWhitespaceOnly = isWhitespaceOnly;
const formatTime = (time) => {
    if (time === undefined || time === null || isNaN(time) || !isFinite(time) || time < 0) {
        return "unknown time";
    }
    if (time < 10) {
        if (time < 1) {
            if (time === 0) {
                return "0s";
            }
            return `${Math.floor(time * 1e6) / 1000}ms`;
        }
        const seconds = Math.floor(time);
        if (time - seconds > 0) {
            return `${time}s`;
        }
        return `${seconds}s`;
    }
    else {
        const days = Math.floor(time / 86400);
        const hours = Math.floor(time / 3600) % 24;
        const minutes = Math.floor(time / 60) % 60;
        const seconds = time % 60;
        return (days > 0 ? (`0${days}`).slice(-2) + "d " : "") +
            (hours > 0 ? (`0${hours}`).slice(-2) + ":" : "") +
            (minutes > 0 ? (`0${minutes}`).slice(-2) + ":" : "") +
            (time > 60 ? (`0${seconds}`).slice(-2) : `${seconds}s`);
    }
};
exports.formatTime = formatTime;
const formatWithNumber = (text, value) => {
    return `${value} ${text}${(value === 1 || value === -1) ? "" : "s"}`;
};
exports.formatWithNumber = formatWithNumber;
const filterInt = (value) => {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value);
    }
    else {
        return NaN;
    }
};
exports.filterInt = filterInt;
//# sourceMappingURL=string-helpers.js.map