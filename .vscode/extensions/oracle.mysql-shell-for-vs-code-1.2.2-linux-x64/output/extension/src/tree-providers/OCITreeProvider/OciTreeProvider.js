"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OciTreeDataProvider = void 0;
const vscode_1 = require("vscode");
const Requisitions_1 = require("../../../../frontend/src/supplement/Requisitions");
const communication_1 = require("../../../../frontend/src/communication");
const Dispatch_1 = require("../../../../frontend/src/supplement/Dispatch");
const ShellInterface_1 = require("../../../../frontend/src/supplement/ShellInterface");
const _1 = require(".");
class OciTreeDataProvider {
    constructor() {
        this.changeEvent = new vscode_1.EventEmitter();
        this.shellSession = new ShellInterface_1.ShellInterfaceShellSession();
        this.compartmentCache = {};
        this.refreshOciTree = () => {
            this.refresh();
            return Promise.resolve(true);
        };
        Requisitions_1.requisitions.register("refreshOciTree", this.refreshOciTree);
    }
    dispose() {
        Requisitions_1.requisitions.unregister("refreshOciTree", this.refreshOciTree);
    }
    get onDidChangeTreeData() {
        return this.changeEvent.event;
    }
    refresh(item) {
        this.compartmentCache = {};
        void this.listConfigProfiles().then(() => {
            this.changeEvent.fire(item);
        });
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (communication_1.currentConnection.isConnected) {
            if (!element) {
                return this.listConfigProfiles();
            }
            if (element instanceof _1.OciConfigProfileTreeItem) {
                return this.listCompartments(element.profile, true, element.profile.tenancy);
            }
            if (element instanceof _1.OciCompartmentTreeItem) {
                return new Promise((resolve, reject) => {
                    Promise.all([
                        this.listCompartments(element.profile, false, element.compartment.id),
                        this.listDatabases(element.profile, element.compartment),
                        this.listComputeInstances(element.profile, element.compartment),
                        this.listBastionHosts(element.profile, element.compartment),
                        this.listLoadBalancers(element.profile, element.compartment),
                    ]).then(([compartmentItems, databaseItems, computeInstanceItems, bastionHostItems, loadBalancerItems]) => {
                        resolve([...compartmentItems, ...databaseItems, ...computeInstanceItems,
                            ...bastionHostItems, ...loadBalancerItems]);
                    }).catch((reason) => {
                        reject(reason);
                    });
                });
            }
        }
    }
    listConfigProfiles() {
        return new Promise((resolve, reject) => {
            this.shellSession.mds.getMdsConfigProfiles().then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    if (event.data) {
                        const items = event.data.result.map((profile) => {
                            return new _1.OciConfigProfileTreeItem(profile);
                        });
                        resolve(items);
                    }
                    resolve([]);
                }
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
    addOciCompartmentTreeItem(items, profile, compartment, startWithCurrent, parentId) {
        if (startWithCurrent && compartment.isCurrent) {
            items.unshift(new _1.OciCompartmentTreeItem(profile, compartment));
        }
        else if ((startWithCurrent && compartment.id === parentId) ||
            (!startWithCurrent && parentId && compartment.compartmentId === parentId) ||
            (!startWithCurrent && !parentId)) {
            items.push(new _1.OciCompartmentTreeItem(profile, compartment));
        }
    }
    listCompartments(profile, startWithCurrent, compartmentId) {
        return new Promise((resolve) => {
            const items = [];
            if (this.compartmentCache[profile.profile]) {
                this.compartmentCache[profile.profile].forEach((subCompartment) => {
                    this.addOciCompartmentTreeItem(items, profile, subCompartment, startWithCurrent, compartmentId);
                });
                resolve(items);
            }
            else {
                this.shellSession.mds.getMdsCompartments(profile.profile).then((event) => {
                    if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                        if (event.data) {
                            this.compartmentCache[profile.profile] = event.data.result;
                            this.compartmentCache[profile.profile].forEach((subCompartment) => {
                                this.addOciCompartmentTreeItem(items, profile, subCompartment, startWithCurrent, compartmentId);
                            });
                        }
                        resolve(items);
                    }
                }).catch((reason) => {
                    var _a, _b;
                    const msg = (_b = (_a = reason === null || reason === void 0 ? void 0 : reason.data) === null || _a === void 0 ? void 0 : _a.requestState) === null || _b === void 0 ? void 0 : _b.msg;
                    if (msg && msg.includes("NotAuthorizedOrNotFound")) {
                        vscode_1.window.setStatusBarMessage("Not authorized to list the sub-compartment of this compartment.", 5000);
                    }
                    resolve(items);
                });
            }
        });
    }
    listDatabases(profile, compartment) {
        return new Promise((resolve) => {
            const items = [];
            this.shellSession.mds.getMdsMySQLDbSystems(profile.profile, compartment.id)
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    if (event.data) {
                        event.data.result.forEach((dbSystem) => {
                            items.push(new _1.OciDbSystemTreeItem(profile, compartment, dbSystem));
                        });
                    }
                    resolve(items);
                }
            }).catch((reason) => {
                var _a, _b;
                const msg = (_b = (_a = reason === null || reason === void 0 ? void 0 : reason.data) === null || _a === void 0 ? void 0 : _a.requestState) === null || _b === void 0 ? void 0 : _b.msg;
                if (msg && msg.includes("NotAuthorizedOrNotFound")) {
                    vscode_1.window.setStatusBarMessage("Not authorized to list the MySQL DB Systems in this compartment.", 5000);
                }
                resolve(items);
            });
        });
    }
    listComputeInstances(profile, compartment) {
        return new Promise((resolve) => {
            const items = [];
            this.shellSession.mds.getMdsComputeInstances(profile.profile, compartment.id)
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    if (event.data) {
                        event.data.result.forEach((compute) => {
                            items.push(new _1.OciComputeInstanceTreeItem(profile, compartment, compute, this.shellSession));
                        });
                    }
                    resolve(items);
                }
            }).catch((reason) => {
                var _a, _b;
                const msg = (_b = (_a = reason === null || reason === void 0 ? void 0 : reason.data) === null || _a === void 0 ? void 0 : _a.requestState) === null || _b === void 0 ? void 0 : _b.msg;
                if (msg && msg.includes("NotAuthorizedOrNotFound")) {
                    vscode_1.window.setStatusBarMessage("Not authorized to list the compute instances in this compartment.", 5000);
                }
                resolve(items);
            });
        });
    }
    listBastionHosts(profile, compartment) {
        return new Promise((resolve) => {
            const items = [];
            this.shellSession.mds.getMdsBastions(profile.profile, compartment.id)
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    if (event.data) {
                        event.data.result.forEach((bastion) => {
                            items.push(new _1.OciBastionTreeItem(profile, compartment, bastion));
                        });
                    }
                    resolve(items);
                }
            }).catch((reason) => {
                var _a, _b;
                const msg = (_b = (_a = reason === null || reason === void 0 ? void 0 : reason.data) === null || _a === void 0 ? void 0 : _a.requestState) === null || _b === void 0 ? void 0 : _b.msg;
                if (msg && msg.includes("NotAuthorizedOrNotFound")) {
                    vscode_1.window.setStatusBarMessage("Not authorized to list the bastions in this compartment.", 5000);
                }
                resolve(items);
            });
        });
    }
    listLoadBalancers(profile, compartment) {
        return new Promise((resolve) => {
            const items = [];
            this.shellSession.mds.listLoadBalancers(profile.profile, compartment.id)
                .then((event) => {
                if (event.eventType === Dispatch_1.EventType.FinalResponse) {
                    if (event.data) {
                        event.data.result.forEach((loadBalancer) => {
                            items.push(new _1.OciLoadBalancerTreeItem(profile, compartment, loadBalancer));
                        });
                    }
                    resolve(items);
                }
            }).catch((reason) => {
                var _a, _b;
                const msg = (_b = (_a = reason === null || reason === void 0 ? void 0 : reason.data) === null || _a === void 0 ? void 0 : _a.requestState) === null || _b === void 0 ? void 0 : _b.msg;
                if (msg && msg.includes("NotAuthorizedOrNotFound")) {
                    vscode_1.window.setStatusBarMessage("Not authorized to list the load balancers in this compartment.", 5000);
                }
                resolve(items);
            });
        });
    }
}
exports.OciTreeDataProvider = OciTreeDataProvider;
//# sourceMappingURL=OciTreeProvider.js.map