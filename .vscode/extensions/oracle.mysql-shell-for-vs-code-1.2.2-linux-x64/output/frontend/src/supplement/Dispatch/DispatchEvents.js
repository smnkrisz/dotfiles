"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchEvents = void 0;
const helpers_1 = require("../../utilities/helpers");
const Dispatch_1 = require("./Dispatch");
class DispatchEvents {
    static baseEvent(eventType, data, id, messageClass) {
        if (!id) {
            id = (0, helpers_1.uuid)();
        }
        if (messageClass === undefined) {
            messageClass = "";
        }
        return {
            id,
            context: {
                messageClass,
            },
            eventType,
            message: "",
            data,
        };
    }
    static classEvent(data, messageClass) {
        const result = DispatchEvents.baseEvent(Dispatch_1.EventType.Notification, data, undefined, messageClass);
        return result;
    }
    static okEvent(data, messageClass, id) {
        const result = DispatchEvents.baseEvent(Dispatch_1.EventType.Notification, data, id, messageClass);
        result.message = "ok";
        return result;
    }
    static errorEvent(data, message, messageClass, id) {
        const result = DispatchEvents.baseEvent(Dispatch_1.EventType.ErrorResponse, data, id, messageClass);
        result.message = message;
        return result;
    }
    static okErrorEvent(data, errorMessage, messageClass, id) {
        if (data) {
            return DispatchEvents.okEvent(data, messageClass, id);
        }
        return DispatchEvents.errorEvent(data, errorMessage, messageClass, id);
    }
    static notification(messageClass, message = "") {
        const result = DispatchEvents.baseEvent(Dispatch_1.EventType.Notification, {}, undefined, messageClass);
        result.message = message;
        return result;
    }
}
exports.DispatchEvents = DispatchEvents;
//# sourceMappingURL=DispatchEvents.js.map