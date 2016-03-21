'use strict';
const Bullet = require('./Bullet');

module.exports = {
    color: '#00A',
    x: 20,
    y: 70,
    width: 32,
    height: 32,
    draw: function(canvas) {
        canvas.fillStyle = this.color;
        canvas.fillRect(this.x, this.y, this.width, this.height);
    },
    shoot: function(direction, opt) {
        var bulletPosition = this.midpoint();

        return Bullet({
            speed: 10,
            x: bulletPosition.x,
            y: bulletPosition.y,
            dir: direction
        }, opt);
        
    },
    midpoint: function() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        };
    }
    
    
};