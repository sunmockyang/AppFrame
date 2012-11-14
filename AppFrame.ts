// Since the setTimeout function does not utilise the correct scope this is a quick temporary fix.
var _AppFrame: AppFrame = null;


// APPFRAME.TS BY SUNMOCK YANG
class AppFrame {
    public running: bool;

    private fps: number;
    private sleep: number;

    //USER DEFINED RUN METHODS
    private initialize() { console.log("INITIALIZE METHOD"); } // Runs once at the start of the application
    private update() { console.log("UPDATE METHOD"); } // Runs every frame before the draw method. Use this function to update your objects
    private draw() { console.log("DRAW METHOD"); } // Runs every frame after the update method. Use this function to draw your objects
    private exit() { console.log("EXIT METHOD"); } // Last thing to run before quitting the application.

    // FOR DEBUGGING
    public debugMode: bool;
    
    public debugFps: number;
    public startFrame: number = 0;
    public endFrame: number = 0;
    
    constructor (frames: number) {
		_AppFrame = this;
        this.running = false;
        this.setFps(frames); // Sets the timeout value based on the desired fps.
    }

    // Called by user to start the application after each method is defined by the methods function
    public start() {
		if(this.running === true)return;
		this.running = true;
		this.initialize();

		if (this.debugMode === true) {
		    console.log("DEBUG MODE STARTED");
		    this.debugRun();
		}
		else
		    this.run();
    }

    public stop() { this.running = false; }

    // Set the FPS value of the application.
    public setFps(fps:number) {
        this.fps = fps;
        this.sleep = (fps) ? Math.ceil(1000/fps) : 0;
    }

    // Get the FPS value of the application.
    public getFps() { return this.fps; }

    // Debug Functions
    public getDebugFps() {
        return this.debugFps;
    }

    // Main loop that calls the update/draw functions.
    private run() {
        if (_AppFrame.running) {
            _AppFrame.update();
            _AppFrame.draw();
            setTimeout(_AppFrame.run, _AppFrame.sleep);
        }
        //else
            //this.exit();
    }

    private debugRun() {
        if (_AppFrame.running) {
            _AppFrame.endFrame = Date.now();
            _AppFrame.update();
            _AppFrame.draw();
            
            _AppFrame.debugFps = (_AppFrame.endFrame - _AppFrame.startFrame);
            
            _AppFrame.startFrame = Date.now();

            setTimeout(_AppFrame.debugRun, _AppFrame.sleep);
    }

    // DEBUG FUNCTIONS

}

// SUNMOCK YANG