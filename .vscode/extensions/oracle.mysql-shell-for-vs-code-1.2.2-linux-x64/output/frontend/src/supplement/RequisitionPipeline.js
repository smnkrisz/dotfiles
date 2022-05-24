"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequisitionPipeline = void 0;
class RequisitionPipeline {
    constructor(hub) {
        this.hub = hub;
        this.pendingRequests = [];
        this.nextJobId = 0;
        this.addJob = (job) => {
            this.pendingRequests.push(...job.map((request) => {
                return Object.assign(Object.assign({}, request), { jobId: this.nextJobId });
            }));
            ++this.nextJobId;
            if (!this.announceTimer) {
                this.announceTimer = setInterval(this.announceRequest, RequisitionPipeline.announceInterval);
            }
            return Promise.resolve(true);
        };
        this.announceRequest = () => {
            if (this.announcePromise) {
                return;
            }
            if (this.pendingRequests.length > 0) {
                const request = this.pendingRequests[0];
                this.announcePromise = this.hub.execute(request.requestType, request.parameter);
                this.announcePromise.then((value) => {
                    if (value) {
                        this.removeTopRequest();
                    }
                    else {
                        this.announcePromise = undefined;
                    }
                }).catch(() => {
                    this.removeTopRequest();
                });
                this.watchDog = setTimeout(() => {
                    this.cancelCurrentJob();
                }, RequisitionPipeline.offeringTime * 1000);
            }
        };
        this.removeTopRequest = () => {
            if (this.watchDog) {
                clearTimeout(this.watchDog);
                this.watchDog = undefined;
            }
            this.announcePromise = undefined;
            this.pendingRequests.shift();
            if (this.pendingRequests.length === 0 && this.announceTimer) {
                clearInterval(this.announceTimer);
                this.announceTimer = undefined;
            }
        };
        this.cancelCurrentJob = () => {
            if (this.watchDog) {
                clearTimeout(this.watchDog);
                this.watchDog = undefined;
            }
            this.announcePromise = undefined;
            const current = this.pendingRequests.shift();
            if (current) {
                while (this.pendingRequests.length > 0 && this.pendingRequests[0].jobId === current.jobId) {
                    this.pendingRequests.shift();
                }
            }
            if (this.pendingRequests.length === 0 && this.announceTimer) {
                clearInterval(this.announceTimer);
                this.announceTimer = undefined;
            }
        };
        hub.register("job", this.addJob);
    }
}
exports.RequisitionPipeline = RequisitionPipeline;
RequisitionPipeline.offeringTime = 30;
RequisitionPipeline.announceInterval = 100;
//# sourceMappingURL=RequisitionPipeline.js.map