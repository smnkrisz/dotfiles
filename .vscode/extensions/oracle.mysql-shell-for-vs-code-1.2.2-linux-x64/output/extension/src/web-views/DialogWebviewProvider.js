"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialogWebviewManager = void 0;
const Requisitions_1 = require("../../../frontend/src/supplement/Requisitions");
const WebviewProvider_1 = require("./WebviewProvider");
class DialogWebviewManager {
    constructor() {
        this.pendingDialogRequests = new Map();
        this.handleDispose = (view) => {
            const resolve = this.pendingDialogRequests.get(view);
            if (resolve) {
                resolve();
                this.pendingDialogRequests.delete(view);
            }
        };
        this.connectedToUrl = (url) => {
            this.url = url;
            this.pendingDialogRequests.clear();
            return Promise.resolve(true);
        };
        this.dialogResponse = (response) => {
            if (response.data) {
                const view = response.data.view;
                view.close();
                const resolve = this.pendingDialogRequests.get(view);
                if (resolve) {
                    this.pendingDialogRequests.delete(view);
                    resolve(response);
                }
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        };
        Requisitions_1.requisitions.register("connectedToUrl", this.connectedToUrl);
        Requisitions_1.requisitions.register("dialogResponse", this.dialogResponse);
    }
    showDialog(request, caption) {
        if (!this.url) {
            return Promise.resolve();
        }
        return new Promise((resolve) => {
            const provider = new WebviewProvider_1.WebviewProvider(this.url, this.handleDispose);
            this.pendingDialogRequests.set(provider, resolve);
            void provider.runCommand("showDialog", request, caption);
        });
    }
}
exports.DialogWebviewManager = DialogWebviewManager;
//# sourceMappingURL=DialogWebviewProvider.js.map