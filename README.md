****************** APPFRAME by Sunmock Yang *************************

AppFrame is a web application framework designed for running
iteration based applications. AppFrame has four main functions that
the application can be segmented into. initialize, update, draw, exit.

== INSTRUCTIONS ==
* TypeScript specific instructions can be found at the bottom.

- To start, the AppFrame object is set with the number of frames
per second the application should run at (30 fps is recommended).

var app = new AppFrame(30); // AppFrame running at 30fps

- Second, the four main functions are set, and the application can
be run.

app.setFunctions(initialize, update, draw, exit);
// There are other ways to do this step in Typescript

- The initialize function will be the first function to be executed.
Once the initialize function has been completed and the initialized
variable is set to true, the update and draw functions will run
every frame.

app.start();

- If the application is to stop running, the stop function is
executed and the exit function will be run before the application
quits.

app.stop();

== DEBUG ==
AppFrame also has the ability of running a debug mode which will output
the fps value to the debugFps variable. It will show you exactly what fps
the application is running at.

app.debugMode = true;
console.log(app.debugFps); // will return a value around 30.0

== TYPESCRIPT ==
The best way to utilise this framework in your application is to create
a new class which inherits the AppFrame class. You can then set your
own initialize, update, draw, and exit functions within the class.

== NOTES ==
Special help from Jahfer Husain (http://jahfer.com)
AppFrame was based on the application framework that the XNA game
framework provides.
All code written by Sunmock Yang (http://sunmock.com)