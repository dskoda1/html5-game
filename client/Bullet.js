'use strict';

module.exports = (opt, data) => {
    opt.data = data;
    opt.active = true;
    switch (opt.dir) {
        case 'left':
            opt.xVelocity = -opt.speed;
            opt.yVelocity = 0;
            break;
        case 'right':
            opt.xVelocity = opt.speed;
            opt.yVelocity = 0;
            break;
        case 'up':
            opt.xVelocity = 0;
            opt.yVelocity = -opt.speed;
            break;
        case 'down':
            opt.xVelocity = 0;
            opt.yVelocity = opt.speed;
            break;
    }

    opt.width = 3;
    opt.height = 3;
    opt.color = '#000';

    opt.inBounds = function(data) {
        return this.x >= 0 && this.x <= data.width &&
            this.y >= 0 && this.y <= data.height;
    };

    opt.draw = function(canvas) {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    };

    opt.update = function(data) {
        
        this.x += opt.xVelocity;
        this.y += opt.yVelocity;
        this.active = this.active && this.inBounds(data);
    };

    return opt;
};