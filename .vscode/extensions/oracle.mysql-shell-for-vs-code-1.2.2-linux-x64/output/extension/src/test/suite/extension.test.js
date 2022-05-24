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
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const extension_1 = require("../../extension");
suite("Extension Test Suite", () => {
    test("wait for extension", () => __awaiter(void 0, void 0, void 0, function* () {
        const ext = vscode.extensions.getExtension("Oracle.mysql-shell-for-vs-code");
        assert.notStrictEqual(ext, undefined);
        yield (ext === null || ext === void 0 ? void 0 : ext.activate());
    }));
    test("launch success test", () => __awaiter(void 0, void 0, void 0, function* () {
        const state = yield vscode.commands.executeCommand("msg.hasLaunchedSuccessfully");
        assert.strictEqual(state, true);
    }));
    test("showStatusText test", () => {
        (0, extension_1.showStatusText)("Test");
        assert.strictEqual(extension_1.statusBarItem.text, "MySQL Shell: Test");
    });
});
//# sourceMappingURL=extension.test.js.map