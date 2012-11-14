
// APP.JS BY SUNMOCK YANG
function AppFrame(fps){
	var _fps = fps;
	var _sleep = (fps) ? Math.ceil(1000/fps) : 0; // Sets the timeout value based on the desired fps.
	var running = false;
	
	var startFrame = 0;
	var endFrame = 0;
	
	var publicLib = {
		debugFps: 0,
		debugMode: false,
		initialize: function(){}, // Runs once at the start of the application
		update: function(){}, // Runs every frame before the draw method. Use this function to update your objects
		draw: function(){}, // Runs every frame after the update method. Use this function to draw your objects
		exit: function(){}, // Last thing to run before quitting the application.
		
		stop: function(){running = false;}, // Called by the user to stop the update and draw loop and exit the application.
		
		// Called by user to start the application after each method is defined by the methods function
		start: function(){
			if(running === true)return;
			running = true;
			this.initialize();
			
			if(this.debugMode === true)
				debugRun();
			else
				run();
		},
		
		// Called by the user at the start of the application to set each method.
		methods: function(initialize, update, draw, exit)
		{
			this.initialize = (initialize) ? initialize : this.initialize;
			this.update = (update) ? update : this.update;
			this.draw = (draw) ? draw : this.draw;
			this.exit = (exit) ? exit : this.exit;
		},
		
		// Set the FPS value of the application.
		setFps: function(fps)
		{
			_fps = fps;
			_sleep = (fps) ? Math.ceil(1000/fps) : 0;
		},
		
		// Get the FPS value of the application.
		getFps: function()
		{
			return _fps;
		}
	}; // Everything in here the user has access to.
		
	function run()
	{
		if(running)
		{
			publicLib.update();
			publicLib.draw();
			setTimeout(run, _sleep);
		}
		else
			publicLib.exit();
	}; // Main loop that calls the update/draw functions.
	
	function debugRun()
	{
		if(running)
		{
			endFrame = Date.now();
			publicLib.update();
			publicLib.draw();
			
			//publicLib.debugFps = Math.floor(10000/(endFrame - startFrame))/10;
			publicLib.debugFps = (endFrame - startFrame);
			
			startFrame = Date.now();
			setTimeout(debugRun, _sleep);
		}
		else
			publicLib.exit();
	}
	
	return publicLib;
}

// SUNMOCK YANG
