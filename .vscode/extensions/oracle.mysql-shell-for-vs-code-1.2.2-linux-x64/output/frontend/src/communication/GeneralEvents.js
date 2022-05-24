"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommunicationEvents = void 0;
const Dispatch_1 = require("../supplement/Dispatch");
class CommunicationEvents {
    static generateWebSessionEvent(data) {
        const result = Dispatch_1.DispatchEvents.okEvent(data, "webSession");
        result.message = data.requestState.msg;
        return result;
    }
    static generateResponseEvent(messageClass, data) {
        let eventType;
        switch (data.requestState.type) {
            case "ERROR": {
                eventType = Dispatch_1.EventType.ErrorResponse;
                break;
            }
            case "PENDING": {
                if (data.requestState.msg === "Execution started...") {
                    eventType = Dispatch_1.EventType.StartResponse;
                }
                else {
                    eventType = Dispatch_1.EventType.DataResponse;
                }
                break;
            }
            case "OK": {
                eventType = Dispatch_1.EventType.FinalResponse;
                break;
            }
            default: {
                eventType = Dispatch_1.EventType.Unknown;
                break;
            }
        }
        const result = Dispatch_1.DispatchEvents.baseEvent(eventType, data, data.requestId, messageClass);
        result.message = data.requestState.msg;
        return result;
    }
    static generateRequestEvent(data) {
        const result = Dispatch_1.DispatchEvents.baseEvent(Dispatch_1.EventType.Request, data, data.request_id);
        return result;
    }
}
exports.CommunicationEvents = CommunicationEvents;
//# sourceMappingURL=GeneralEvents.js.map