(function (Fancy) {
    function Q() {
        this.running = false;
        this.queue = [];
        this.add = function (fn) {
            var SELF = this;
            this.queue.push(function () {
                var resolved = fn();
                if (typeof resolved === "undefined" || resolved) {
                    SELF.next();
                }
            });
            if (!SELF.running) {
                SELF.next();
            }
        };
        this.next = function () {
            this.running = false;
            var fn = this.queue.shift();
            if (fn) {
                this.running = true;
                fn();
            }
        };
        return this;
    }

    var GQ = new Q(),
        logged = false,
        NAME = "FancyQueue",
        VERSION = "0.0.1";

    Fancy.queue = function (callback) {
        if (callback) {
            GQ.add(callback);
        } else {
            if (!logged) {
                logged = true;
                Fancy.version(Fancy.queue);
            }
            return new Q();
        }
    };
    Fancy.queue.prototype = {
        name: NAME,
        version: VERSION
    };
    Fancy.queue.next = function () {
        GQ.next();
    };
})(Fancy);