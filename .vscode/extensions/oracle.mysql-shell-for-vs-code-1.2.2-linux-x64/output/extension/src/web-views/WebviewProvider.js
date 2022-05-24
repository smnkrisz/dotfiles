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
exports.WebviewProvider = void 0;
const vscode_1 = require("vscode");
const Requisitions_1 = require("../../../frontend/src/supplement/Requisitions");
const extension_1 = require("../extension");
class WebviewProvider {
    constructor(url, onDispose) {
        this.url = url;
        this.onDispose = onDispose;
        this.notifyOnDispose = true;
        this.selectConnectionTab = (page) => {
            if (this.panel && page) {
                this.panel.title = page;
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        };
        this.dialogResponse = (response) => {
            if (!response.data) {
                response.data = { view: this };
            }
            else {
                response.data.view = this;
            }
            return Requisitions_1.requisitions.execute("dialogResponse", response);
        };
        this.updateVscodeSettings = (entry) => {
            return new Promise((resolve) => {
                if (entry) {
                    const parts = entry.key.split(".");
                    if (parts.length === 3) {
                        const configuration = vscode_1.workspace.getConfiguration(`msg.${parts[0]}`);
                        void configuration.update(`${parts[1]}.${parts[2]}`, entry.value, true).then(() => {
                            resolve(true);
                        });
                    }
                }
                resolve(false);
            });
        };
        this.prepareEditorGroup = (placement) => __awaiter(this, void 0, void 0, function* () {
            let viewColumn = (!placement || placement === "Active") ? vscode_1.ViewColumn.Active : vscode_1.ViewColumn.Beside;
            if (placement === "Beside Bottom") {
                viewColumn = vscode_1.ViewColumn.Active;
                yield vscode_1.commands.executeCommand("workbench.action.editorLayoutTwoRows");
                yield vscode_1.commands.executeCommand("workbench.action.focusSecondEditorGroup");
            }
            return viewColumn;
        });
    }
    close() {
        if (this.panel) {
            this.notifyOnDispose = false;
            this.panel.dispose();
            this.panel = undefined;
        }
    }
    runCommand(requestType, parameter, caption, settingName = "") {
        return this.runInPanel(() => {
            var _a;
            (_a = this.requisitions) === null || _a === void 0 ? void 0 : _a.executeRemote(requestType, parameter);
            return Promise.resolve(true);
        }, caption, settingName);
    }
    runInPanel(block, caption, settingName) {
        const placement = settingName ? vscode_1.workspace.getConfiguration("msg.tabPosition").get(settingName) : undefined;
        return new Promise((resolve, reject) => {
            if (!this.panel) {
                if (caption) {
                    this.createPanel(caption, placement).then(() => {
                        block().then(() => {
                            resolve(true);
                        }).catch((reason) => {
                            reject(reason);
                        });
                    }).catch((reason) => {
                        reject(reason);
                    });
                }
                else {
                    resolve(false);
                }
            }
            else {
                this.panel.title = caption !== null && caption !== void 0 ? caption : "<missing caption>";
                this.panel.reveal();
                block().then(() => {
                    resolve(true);
                }).catch((reason) => {
                    reject(reason);
                });
            }
        });
    }
    createPanel(caption, placement) {
        return new Promise((resolve) => {
            void this.prepareEditorGroup(placement).then((viewColumn) => {
                this.panel = vscode_1.window.createWebviewPanel("msg-webview", caption, viewColumn, {
                    enableScripts: true,
                    retainContextWhenHidden: true,
                });
                this.panel.onDidDispose(() => { this.handleDispose(); });
                this.requisitions = new Requisitions_1.RequisitionHub("host", this.panel.webview);
                this.requisitions.register("applicationDidStart", () => {
                    resolve(true);
                    (0, extension_1.printChannelOutput)("State: application did start");
                    return Promise.resolve(true);
                });
                this.requisitions.register("settingsChanged", this.updateVscodeSettings);
                this.requisitionsCreated();
                this.panel.webview.onDidReceiveMessage((message) => {
                    var _a;
                    if (message.source === "app") {
                        (_a = this.requisitions) === null || _a === void 0 ? void 0 : _a.handleRemoteMessage(message);
                    }
                });
                this.url.searchParams.set("app", "vscode");
                this.panel.webview.html = `
<!doctype html><html lang="en">
<head>
<meta http-equiv="Content-Security-Policy" content="default-src *; img-src http: https:;
    script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline' http: https: data: *;">
</head>
<body style="margin:0px;padding:0px;overflow:hidden;">
<iframe id="frame:${caption}"
    src="${this.url.toString()}"
    frameborder="0" style="overflow: hidden; overflow-x: hidden; overflow-y: hidden; height:100%;
    width:100%; position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px" height="100%"
    width="100%">
</iframe>
<script>
    let frame;
    let vscode;

    document.addEventListener("paste", (event) => {
        frame.contentWindow.postMessage({
            source: "host",
            command: "paste",
            data: { text: event.clipboardData.getData("text") }
        }, "*");
    });

    window.addEventListener('message', (event) => {
        if (!frame) {
            vscode = acquireVsCodeApi();
            frame = document.getElementById("frame:${caption}");

            // Listen to style changes on the outer iframe.
            const sendThemeMessage = () => {
                frame.contentWindow.postMessage({
                    source: "host",
                    command: "hostThemeChange",
                    data: { css: document.documentElement.style.cssText, themeClass: document.body.className }
                }, "*");
            };

            const observer = new MutationObserver(sendThemeMessage);
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ["style"] });

            // Send initial theme change message.
            sendThemeMessage();
        }

        if (event.data.source === "host") {
            // Forward message from the extension to the iframe.
            frame.contentWindow.postMessage(event.data, "*");
        } else if (event.data.source === "app") {
            // Forward app events either directly or after a conversion to vscode.
            switch (event.data.command) {
                case "keydown": {
                    window.dispatchEvent(new KeyboardEvent("keydown", event.data));
                    break;
                }
                case "keyup": {
                    window.dispatchEvent(new KeyboardEvent("keyup", event.data));
                    break;
                }
                case "writeClipboard": {
                    // This is a special message and can be handled here.
                    window.navigator.clipboard.writeText(event.data.text);
                    break;
                }
                default: {
                    vscode.postMessage(event.data);
                    break;
                }
            }
        }
    });
</script>

</body></html>
                    `;
            });
        });
    }
    handleDispose() {
        this.panel = undefined;
        if (this.notifyOnDispose) {
            this.onDispose(this);
        }
    }
    requisitionsCreated() {
        if (this.requisitions) {
            this.requisitions.register("selectConnectionTab", this.selectConnectionTab);
            this.requisitions.register("dialogResponse", this.dialogResponse);
        }
    }
}
exports.WebviewProvider = WebviewProvider;
//# sourceMappingURL=WebviewProvider.js.map