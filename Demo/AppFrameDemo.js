var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ExampleApplication = (function (_super) {
    __extends(ExampleApplication, _super);
    function ExampleApplication(fps, url, canvas) {
        _super.call(this, fps, false);
        this.imageAttr = {
            x: 0,
            y: 0,
            w: 0,
            h: 0
        };
        this.sprites = new Array();
        this.image = new Image();
        this.width = canvas.width;
        this.height = canvas.height;
        this.context = canvas.getContext("2d");
        this.src = url;
        this.start();
    }
    ExampleApplication.prototype.initialize = function () {
        if(this.initialized == false) {
            var _this = this;
            this.image.onload = function () {
                _this.initialized = true;
                _this.sprites.push(new BounceSprite(_this.context, _this.image, _this.width, _this.height));
                _this.sprites.push(new BounceSprite(_this.context, _this.image, _this.width, _this.height));
            };
            this.image.src = this.src;
        } else {
            this.sprites.push(new BounceSprite(this.context, this.image, this.width, this.height));
            this.sprites.push(new BounceSprite(this.context, this.image, this.width, this.height));
        }
        this.context.fillStyle = "rgba(255,255,255,0.05)";
        this.context.fillRect(0, 0, this.width, this.height);
    };
    ExampleApplication.prototype.update = function () {
        for(var i in this.sprites) {
            this.sprites[i].update();
        }
    };
    ExampleApplication.prototype.draw = function () {
        this.context.fillStyle = "rgba(255,255,255,0.05)";
        this.context.fillRect(0, 0, this.width, this.height);
        for(var i in this.sprites) {
            this.sprites[i].draw();
        }
    };
    ExampleApplication.prototype.exit = function () {
        this.sprites.length = 0;
        alert("Stopped");
    };
    ExampleApplication.prototype.addImage = function (src) {
        var image = new Image();
        var _this = this;
        image.onload = function () {
            _this.sprites.push(new BounceSprite(_this.context, image, _this.width, _this.height));
        };
        image.src = src;
    };
    return ExampleApplication;
})(AppFrame);
var BounceSprite = (function () {
    function BounceSprite(context, image, cWidth, cHeight) {
        this.time = 0;
        this.cWidth = 0;
        this.cHeight = 0;
        this.amp = 1;
        this.decay = 0.1;
        this.speed = 1;
        this.x = 0;
        this.y = 0;
        this.w = 10;
        this.h = 10;
        this.cWidth = cWidth;
        this.cHeight = cHeight;
        this.image = image;
        this.reset();
        this.context = context;
        this.speed = Math.random() * 4 + 1;
    }
    BounceSprite.prototype.setImage = function (image) {
        this.image = image;
    };
    BounceSprite.prototype.update = function () {
        if(this.time > this.cWidth || this.amp < 1) {
            this.reset();
        }
        var temp = Math.cos(this.time / (10 * this.speed)) * this.amp;
        this.x = this.time;
        this.y = this.cHeight - Math.abs(temp) - this.h;
        if(this.y > this.cHeight - this.h - this.amp / 10) {
            this.amp *= this.decay;
        }
        this.time += this.speed;
    };
    BounceSprite.prototype.draw = function () {
        this.context.drawImage(this.image, this.x, this.y, this.w, this.h);
    };
    BounceSprite.prototype.reset = function () {
        this.time = 0;
        this.amp = Math.random() * this.cHeight;
        this.decay = 0.9 + Math.random() * 0.1;
        this.h = Math.random() * 30 + 20;
        this.w = this.image.width * this.h / this.image.height;
        return;
    };
    return BounceSprite;
})();
//@ sourceMappingURL=AppFrameDemo.js.map
