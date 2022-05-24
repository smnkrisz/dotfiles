"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatcher = exports.Dispatcher = exports.EventType = void 0;
const _1 = require(".");
var EventType;
(function (EventType) {
    EventType[EventType["Request"] = -1] = "Request";
    EventType[EventType["ErrorResponse"] = -2] = "ErrorResponse";
    EventType[EventType["StartResponse"] = 1] = "StartResponse";
    EventType[EventType["DataResponse"] = 2] = "DataResponse";
    EventType[EventType["FinalResponse"] = 3] = "FinalResponse";
    EventType[EventType["Notification"] = 4] = "Notification";
    EventType[EventType["Unknown"] = 0] = "Unknown";
})(EventType = exports.EventType || (exports.EventType = {}));
class Dispatcher {
    constructor() {
        this.listeners = [];
        this.messageContext = new Map();
    }
    mapMessageContext(requestId, context) {
        this.messageContext.set(requestId, context);
    }
    listen(listener) {
        this.listeners.push(listener);
    }
    remove(id) {
        const index = this.listeners.findIndex((candidate) => {
            return candidate.id === id;
        });
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    }
    triggerNotification(messageClass) {
        this.triggerEvent(_1.DispatchEvents.notification(messageClass));
    }
    triggerEvent(event, debugging = false) {
        const context = this.messageContext.get(event.id);
        if (context) {
            event.context = context;
        }
        if (event.context === undefined) {
            event.context = { messageClass: "" };
        }
        else if (debugging && !event.context.messageClass.startsWith("debugger")) {
            return;
        }
        const toTrigger = [];
        for (let index = this.listeners.length - 1; index >= 0; --index) {
            const listener = this.listeners[index];
            if (!listener.filterEvent(event)) {
                continue;
            }
            toTrigger.unshift(listener);
            if ([EventType.FinalResponse, EventType.ErrorResponse, EventType.Notification].includes(event.eventType)) {
                if (!listener.persistent) {
                    this.listeners.splice(index, 1);
                }
                this.messageContext.delete(event.id);
            }
        }
        for (const listener of toTrigger) {
            listener.trigger(event);
        }
    }
}
exports.Dispatcher = Dispatcher;
class DispatcherSingleton extends Dispatcher {
    constructor() {
        super();
    }
}
exports.dispatcher = new DispatcherSingleton();
//# sourceMappingURL=Dispatch.js.map