"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerEntry = exports.eventFilterNoRequests = void 0;
const _1 = require(".");
const eventFilterNoRequests = (event) => {
    return event.eventType !== _1.EventType.Request;
};
exports.eventFilterNoRequests = eventFilterNoRequests;
class ListenerEntry {
    constructor(options, errorContext = new Error()) {
        this.id = ListenerEntry.nextListenerId++;
        this.persistent = false;
        this.hasSource = false;
        this.executors = [];
        this.errorContext = errorContext;
        this.filters = [];
        if (options.filters) {
            this.filters = options.filters;
        }
        if (options.persistent) {
            this.persistent = options.persistent;
        }
    }
    static create(options, errorContext = new Error()) {
        const listener = new ListenerEntry(options, errorContext);
        _1.dispatcher.listen(listener);
        return listener;
    }
    static createByID(requestId, options = {}) {
        options.persistent = false;
        if (!options.filters) {
            options.filters = [];
        }
        options.filters.push((event) => {
            return event.id === requestId;
        });
        const listener = ListenerEntry.create(options);
        return listener;
    }
    static createByClass(messageClass, options = {}) {
        if (!options.filters) {
            options.filters = [];
        }
        options.filters.push((event) => {
            return event.context.messageClass === messageClass;
        });
        return ListenerEntry.create(options);
    }
    static all(entries) {
        const listener = new ListenerEntry({});
        const executor = new _1.ListenerExecutor([]);
        const results = [];
        for (const entry of entries) {
            executor.then((event) => {
                return results.push(event);
            });
            entry.then((event) => {
                return executor.execute(event);
            }).catch((error) => {
                return executor.execute(error);
            });
        }
        executor.finally(() => {
        });
        listener.addExecutor(executor);
        return listener;
    }
    static resolve(source) {
        const listener = new ListenerEntry({}, new Error());
        listener.trigger(source);
        return listener;
    }
    filterEvent(event) {
        for (const filter of this.filters) {
            if (!filter(event)) {
                return false;
            }
        }
        return true;
    }
    trigger(source) {
        this.source = source;
        this.hasSource = true;
        const resolved = [];
        for (const executor of this.executors) {
            if (executor.execute(this.source)) {
                resolved.push(executor);
            }
        }
        if (!this.persistent) {
            this.removeExecutors(resolved);
        }
        return this;
    }
    then(callback) {
        return this.addExecutor(new _1.ListenerExecutor([], this.errorContext))
            .then(callback);
    }
    catch(callback) {
        return this.addExecutor(new _1.ListenerExecutor([], this.errorContext))
            .catch(callback);
    }
    finally(callback) {
        return this.addExecutor(new _1.ListenerExecutor([], this.errorContext))
            .finally(callback);
    }
    addExecutor(executor) {
        this.executors.push(executor);
        if (this.hasSource) {
            setImmediate(() => {
                if (executor.execute(this.source) && !this.persistent) {
                    this.removeExecutors([executor]);
                }
            });
        }
        return executor;
    }
    removeExecutors(executorList) {
        this.executors = this.executors.filter((item) => {
            return !executorList.includes(item);
        });
    }
}
exports.ListenerEntry = ListenerEntry;
ListenerEntry.nextListenerId = 1;
//# sourceMappingURL=ListenerEntry.js.map