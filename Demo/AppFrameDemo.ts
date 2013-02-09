// EXAMPLE TYPESCRIPT CLASS FOR APPFRAME.TS by SUNMOCK YANG

/*
THIS APPLICATION WILL LOAD AN IMAGE AND MAKE SURE THAT IT IS LOADED BEFORE DRAWING A SPRITE
*/

/// <reference path="../AppFrame.ts" />

class ExampleApplication extends AppFrame{
    public image: HTMLImageElement;
    public src: string;
    public width: number;
    public height:number;
    public context: CanvasRenderingContext2D;
    public imageAttr = {x: 0, y: 0, w: 0, h: 0};
    public sprites: BounceSprite[] = new BounceSprite[]();

    constructor(fps: number, url:string, canvas: HTMLCanvasElement) { // Pass in the framerate, an image url, and a canvas element
        super(fps, false); // If second arg is false, the main loop will not run until this.initialized is set to true.
        
        this.image = new Image();
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.src = url;
        
        this.start();
    }
    
    // Runs once after this.start()
    public initialize() {
        if (this.initialized == false) {
            var _this = this;

            // Callback function to run after image has been loaded
            this.image.onload = function () {
                _this.initialized = true; // Once this is set to true, main loop will start to run.

                _this.sprites.push(new BounceSprite(_this.context, _this.image, _this.width, _this.height));
                _this.sprites.push(new BounceSprite(_this.context, _this.image, _this.width, _this.height));
            };

            this.image.src = this.src;
        }
        else{
            this.sprites.push(new BounceSprite(this.context, this.image, this.width, this.height));
            this.sprites.push(new BounceSprite(this.context, this.image, this.width, this.height));
        }
        this.context.fillStyle = "rgba(255,255,255,0.05)";
        this.context.fillRect(0, 0, this.width, this.height);
    }
    
    // Runs each iteration of the main loop
    public update() {
        for(var i in this.sprites){
            this.sprites[i].update();
        }
    }

    public draw() { // Runs each iteration of the main loop after the update function
        this.context.fillStyle = "rgba(255,255,255,0.05)";
        this.context.fillRect(0, 0, this.width, this.height);

        for(var i in this.sprites){
            this.sprites[i].draw();
        }
    }
    
    public exit() { // Runs after main loop has stopped
        this.sprites.length = 0;
        alert("Stopped");
    }

    public addImage(src:string) {
        var image = new Image();
        var _this = this;
        image.onload = function () {_this.sprites.push(new BounceSprite(_this.context, image, _this.width, _this.height));};

        image.src = src;
    }
}

// Small sprite class
class BounceSprite{
    private time: number = 0;
    private cWidth: number = 0;
    private cHeight: number = 0;

    private amp: number = 1;
    private decay: number = 0.1;
    private speed: number = 1;

    private image: HTMLImageElement;
    private context: CanvasRenderingContext2D;
    
    private x: number = 0;
    private y: number = 0;
    private w: number = 10;
    private h: number = 10;

    constructor (context: CanvasRenderingContext2D, image:HTMLImageElement, cWidth: number, cHeight:number){
        this.cWidth = cWidth;
        this.cHeight = cHeight;
        this.image = image;
        this.reset();
        this.context = context;
        this.speed = Math.random() * 4 + 1;
    }

    public setImage(image:HTMLImageElement){
        this.image = image;
    }

    public update(){
        if(this.time > this.cWidth || this.amp < 1){
            this.reset();
        }
        var temp = Math.cos(this.time/(10*this.speed))*this.amp;
        this.x = this.time;
        this.y = this.cHeight - Math.abs(temp) - this.h;

        if (this.y > this.cHeight -this.h - this.amp/10) {
            this.amp *= this.decay;
        }

        this.time += this.speed;
    }

    public draw(){
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    private reset() {
        this.time = 0;
        this.amp = Math.random() * this.cHeight;
        this.decay = 0.9 + Math.random()*0.1;
        this.h = Math.random()*30+20;
        this.w = this.image.width * this.h/this.image.height;
        return;
    }
}