"use strict";
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
exports.showModalDialog = exports.showMessageWithTimeout = exports.switchVsCodeContext = void 0;
const vscode_1 = require("vscode");
const helpers_1 = require("../../frontend/src/utilities/helpers");
const switchVsCodeContext = (key, enable) => {
    return vscode_1.commands.executeCommand("setContext", key, enable);
};
exports.switchVsCodeContext = switchVsCodeContext;
const showMessageWithTimeout = (message, timeout = 3000) => {
    void vscode_1.window.withProgress({
        location: vscode_1.ProgressLocation.Notification,
        title: message,
        cancellable: false,
    }, (progress) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, helpers_1.waitFor)(timeout, () => { return false; });
        progress.report({ increment: 100 });
    }));
};
exports.showMessageWithTimeout = showMessageWithTimeout;
const showModalDialog = (message, okText = "OK", detail) => {
    return new Promise((resolve) => {
        (0, exports.switchVsCodeContext)("showsModalDialog", true);
        const options = { detail, modal: true };
        void vscode_1.window.showInformationMessage(message, options, okText).then((answer) => {
            (0, exports.switchVsCodeContext)("showsModalDialog", false);
            resolve(answer === okText);
        });
    });
};
exports.showModalDialog = showModalDialog;
//# sourceMappingURL=utilities.js.map