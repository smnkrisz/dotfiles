"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerExecutor = void 0;
const _1 = require("./");
var CallbackType;
(function (CallbackType) {
    CallbackType[CallbackType["Then"] = 1] = "Then";
    CallbackType[CallbackType["Catch"] = 2] = "Catch";
    CallbackType[CallbackType["Finally"] = 3] = "Finally";
})(CallbackType || (CallbackType = {}));
class ListenerExecutor {
    constructor(callbackChain, errorContext = new Error()) {
        this.execute = (source) => {
            var _a;
            const types = this.callBackTypesForSource(source);
            const nextExecutor = this.clone(types);
            if (nextExecutor === undefined) {
                if (types.has(CallbackType.Catch)) {
                    let error = this.errorContext;
                    if (source instanceof Error) {
                        error = source;
                    }
                    error.message = `"Chain without a catch block - ${(_a = source === null || source === void 0 ? void 0 : source.message) !== null && _a !== void 0 ? _a : ""}`;
                    throw error;
                }
                return false;
            }
            let isIntermediate = false;
            if (source && !(source instanceof Error)) {
                if (source.eventType === _1.EventType.StartResponse || source.eventType === _1.EventType.DataResponse) {
                    isIntermediate = true;
                }
            }
            const callbackResult = nextExecutor.triggerHeadCallback(source);
            if (callbackResult instanceof _1.ListenerEntry) {
                callbackResult.addExecutor(nextExecutor);
            }
            else {
                return nextExecutor.execute(callbackResult);
            }
            return !isIntermediate;
        };
        this.callbackChain = callbackChain;
        this.errorContext = errorContext;
    }
    then(callback, errorContext = new Error()) {
        if (this.findFirstCallbackIndex(new Set()) > -1) {
            throw new Error("It's not possible to add executors after a 'finally' block");
        }
        this.callbackChain.push({ callback, callbackType: CallbackType.Then, errorContext });
        return this;
    }
    catch(callback, errorContext = new Error()) {
        if (this.findFirstCallbackIndex(new Set()) > -1) {
            throw new Error("It's not possible to add executors after a 'finally' block");
        }
        this.callbackChain.push({ callback, callbackType: CallbackType.Catch, errorContext });
        return this;
    }
    finally(callback, errorContext = new Error()) {
        if (this.findFirstCallbackIndex(new Set()) > -1) {
            throw new Error("It's not possible to add executors after a 'finally' block");
        }
        this.callbackChain.push({ callback, callbackType: CallbackType.Finally, errorContext });
        return this;
    }
    findFirstCallbackIndex(callbackTypes) {
        callbackTypes.add(CallbackType.Finally);
        for (let index = 0; index < this.callbackChain.length; ++index) {
            const capsule = this.callbackChain[index];
            if (callbackTypes.has(capsule.callbackType)) {
                return index;
            }
        }
        return -1;
    }
    callBackTypesForSource(source) {
        if (!source) {
            return new Set();
        }
        if (source instanceof Error || (source && source.eventType === _1.EventType.ErrorResponse)) {
            return new Set([CallbackType.Catch]);
        }
        return new Set([CallbackType.Then, CallbackType.Finally]);
    }
    triggerHeadCallback(source) {
        const capsule = this.callbackChain.shift();
        if (!capsule) {
            return undefined;
        }
        try {
            return capsule.callback(source);
        }
        catch (error) {
            capsule.errorContext.message = String(error);
            return this.execute(capsule.errorContext);
        }
    }
    clone(callbackTypes) {
        const index = this.findFirstCallbackIndex(callbackTypes);
        if (index === -1) {
            return undefined;
        }
        return new ListenerExecutor(this.callbackChain.slice(index), this.errorContext);
    }
}
exports.ListenerExecutor = ListenerExecutor;
//# sourceMappingURL=ListenerExecutor.js.map