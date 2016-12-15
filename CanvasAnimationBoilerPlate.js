/* Hurray! More stuff that doesn't belong here! o.O */

const CanvasAnimationBoilerPlate = function(drawCallback, initCallback, fps, canvas) {
    var self = this;

    self.init = function(drawCallback, initCallback, fps, canvas) {
        self.initCallback = initCallback || function(c) {};
        self.drawCallback = drawCallback || function(c) {
            self.demo(c)
        };
        self.fps = fps || 24;
        self.canvas = canvas || document.getElementsByTagName('canvas')[0];

        self.w = self.canvas.width;
        self.h = self.canvas.height;
        self.context = self.canvas.getContext('2d');

        self.initCallback(self);

        self.drawWrapper = function() {
            self.drawCallback(self);
            setTimeout(
                function() {
                    requestAnimationFrame(self.drawWrapper);
                }, 1000 / self.fps
            );
        }
        self.drawWrapper();
    };

    self.random = function(n) {
        return Math.random() * n;
    };

    self.demo = function(c) {
        var max = parseInt('FFFFFF', 16);
        var color = Math.floor(c.random(max));
        c.context.fillStyle = '#' + color.toString(16);
        c.context.fillRect(c.random(c.w), c.random(c.h), 33, 44);
    };

    self.init(drawCallback, initCallback, fps, canvas);
};
