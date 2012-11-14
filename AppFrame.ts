// APPFRAME.TS BY SUNMOCK YANG
class AppFrame {
    public running: bool;

    private fps: number;
    private sleep: number;

    public initialized: bool = false;

    //USER DEFINED RUN METHODS
    private initialize() { console.log("INITIALIZE METHOD"); } // Runs once at the start of the application
    private update() { console.log("UPDATE METHOD"); } // Runs every frame before the draw method. Use this function to update your objects
    private draw() { console.log("DRAW METHOD"); } // Runs every frame after the update method. Use this function to draw your objects
    private exit() { console.log("EXIT METHOD"); } // Last thing to run before quitting the application.

    //USED TO PRESERVE SCOPE DURING SETTIMEOUT
    //private runFunc(): Function = (function (that: AppFrame) { that.run(); });

    // FOR DEBUGGING
    public debugMode: bool;
    
    public debugFps: number;
    public startFrame: number = 0;
    public endFrame: number = 0;
    

    public delegate: Function;
    constructor (frames: number) {
		//_AppFrame = this;
        this.running = false;
        this.setFps(frames); // Sets the timeout value based on the desired fps.
    }

    // Not recommended to use. But rather inherit the AppFrame class and define the functions
    public setFunctions(initialize, update, draw, exit) {
        if (initialize !== undefined) { this.initialize = initialize; }
        if (update !== undefined) { this.update = update; }
        if (draw !== undefined) { this.draw = draw; }
        if (exit !== undefined) { this.exit = exit; }
    }

    // Called by user to start the application after each method is defined by the methods function
    public start() {
		if(this.running === true)return;

		this.running = true;
		this.initialize();

		if (this.debugMode === true) {
		    console.log("DEBUG MODE STARTED");

		    this.delegate = (function(that: AppFrame) {
		        return function () {
		            that.debugRun(that);
		        }
		    } (this));

		    this.debugRun(this);
		}
		else {
		    this.delegate = (function(that: AppFrame) {
		        return function () {
		            that.run(that);
		        }
		    } (this));
		    
            this.run(this);
		}
    }

    public stop() { this.running = false; }

    // Set the FPS value of the application.
    public setFps(fps:number) {
        this.fps = fps;
        this.sleep = (fps) ? Math.ceil(1000/fps) : 0;
    }

    // Get the FPS value of the application.
    public getFps() { return this.fps; }

    // Main loop that calls the update/draw functions.
    private run(that:AppFrame) {
        if (that.running) {
            if (that.initialized) {
                that.update();
                that.draw();
            }
            setTimeout(that.delegate, that.sleep);
        }
        else
            this.exit();
    }

    // DEBUG FUNCTIONS
    private debugRun(that:AppFrame) {
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

    public getDebugFps() {
        return this.debugFps;
    }

}

// SUNMOCK YANG