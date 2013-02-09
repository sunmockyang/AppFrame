// APPFRAME.TS DEBUG EXTENSION BY SUNMOCK YANG
/// <reference path="AppFrame.ts" />

/*
ADDS DEBUGGING INFORMATION TO APPFRAME

getDebugFps() - returns the number of frames per second (fps) of last loop
getDebugSleep() - returns the number of milliseconds between each iteration
*/

class DebugFrame extends AppFrame {
    private sleep: number;

    //USER DEFINED RUN METHODS
    private initialize() { console.log("INITIALIZE METHOD"); }
    private update() { console.log("UPDATE METHOD"); }
    private draw() { console.log("DRAW METHOD"); }
    private exit() { console.log("EXIT METHOD"); }

    // FOR DEBUGGING
    public debugFps: number;
    public startFrame: number = 0;
    public endFrame: number = 0;

    public start() {
		console.log("DEBUG MODE STARTED");

		super.start();
    }

    // Debug Functions
    public getDebugFps() { return this.debugFps; }
    public getDebugSleep() { return this.sleep; }

    private run(that:DebugFrame) {
        if (that.running) {
            if (that.initialized) {
                that.endFrame = Date.now();
                that.update();
                that.draw();
                that.debugFps = Math.floor(10000/(that.endFrame - that.startFrame))/10;
                that.startFrame = Date.now();
            }
            setTimeout(that.delegate, that.sleep);
        }
        else
            this.exit();
    }

}

// SUNMOCK YANG