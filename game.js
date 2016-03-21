// 'use strict';

// var game = game || {};
// game.text = game.text || {};
// game.CANVAS_WIDTH = 480;
// game.CANVAS_HEIGHT = 320;
// game.textX = 0;
// game.textY = 0;

// var canvasElement = $("<canvas width='" + game.CANVAS_WIDTH +
//     "' height='" + game.CANVAS_HEIGHT + "'></canvas>");
// game.canvas = canvasElement.get(0).getContext("2d");

// canvasElement.appendTo('body');

// game.update = () => {
//     game.textX += 1;
//     game.textY += 1;
// }

// game.draw = () => {
//     game.canvas.clearRect(0, 0, game.CANVAS_WIDTH, game.CANVAS_HEIGHT);

//     game.canvas.fillStyle = "#000"; // Set color to black
//     game.canvas.fillText("Sup Bro!", game.textX, game.textY);

// }


// game.FPS = 60;

// setInterval(function() {
// 				game.update();
// 				game.draw();
// 			}, 1000 / game.FPS);