var AppFrame = (function () {
    function AppFrame(frames, initialized) {
        this.initialized = true;
        this.running = false;
        this.initialized = (typeof initialized != undefined) ? initialized : this.initialized;
        this.setFps(frames);
    }
    AppFrame.blank = function () {
    };
    AppFrame.prototype.initialize = function () {
    };
    AppFrame.prototype.update = function () {
    };
    AppFrame.prototype.draw = function () {
    };
    AppFrame.prototype.exit = function () {
    };
    AppFrame.prototype.setFunctions = function (initialize, update, draw, exit) {
        if(initialize !== undefined) {
            this.initialize = initialize;
        }
        if(update !== undefined) {
            this.update = update;
        }
        if(draw !== undefined) {
            this.draw = draw;
        }
        if(exit !== undefined) {
            this.exit = exit;
        }
    };
    AppFrame.prototype.start = function () {
        if(this.running === true) {
            return;
        }
        this.running = true;
        this.initialize();
        this.delegate = ((function (that) {
            return function () {
                that.run(that);
            }
        })(this));
        this.run(this);
    };
    AppFrame.prototype.stop = function () {
        this.running = false;
    };
    AppFrame.prototype.setFps = function (fps) {
        this.fps = fps;
        this.sleep = (fps) ? Math.ceil(1000 / fps) : 0;
    };
    AppFrame.prototype.getFps = function () {
        return this.fps;
    };
    AppFrame.prototype.run = function (that) {
        if(that.running) {
            if(that.initialized) {
                that.update();
                that.draw();
            }
            setTimeout(that.delegate, that.sleep);
        } else {
            this.exit();
        }
    };
    return AppFrame;
})();
//@ sourceMappingURL=AppFrame.js.map
