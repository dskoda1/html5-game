	/*global keydown*/
	'use strict';
	const player = require('./Player');
	const $ = require('jquery');
	require('./jqueryHotKeys');
	Number.prototype.clamp = function(min, max) {
		return Math.min(Math.max(this, min), max);
	};
	$(function() {
		window.keydown = {};
		window.lastKeyDown = '';

		function keyName(event) {
			return $.hotkeys.specialKeys[event.which] ||
				String.fromCharCode(event.which).toLowerCase();
		}
		$(document).bind('keydown', function(event) {
			keydown[keyName(event)] = true;
		});

		$(document).bind('keyup', function(event) {
			keydown[keyName(event)] = false;
		});
	});
	var CANVAS_WIDTH = document.documentElement.clientWidth - 50;
	var CANVAS_HEIGHT = document.documentElement.clientHeight - 50;

	var canvasElement = $('<canvas width=\'' + CANVAS_WIDTH +
		'\' height=\'' + CANVAS_HEIGHT + '\'></canvas>');
	var canvas = canvasElement.get(0).getContext('2d');
	canvasElement.appendTo('body');
	var FPS = 30;
	setInterval(function() {
		update();
		draw();
	}, 1000 / FPS);


	var playerBullets = [];



	var canvasData = {
		canvas: canvas,
		width: CANVAS_WIDTH,
		height: CANVAS_HEIGHT
	};

	function update() {
		if (keydown.a) {
			player.x -= 5;
		}

		if (keydown.d) {
			player.x += 5;
		}

		if (keydown.s) {
			player.y += 5;
		}

		if (keydown.w) {
			player.y -= 5;
		}
		if (keydown.left) {
			playerBullets.push(player.shoot('left', canvasData));

		}
		if (keydown.right) {
			playerBullets.push(player.shoot('right', canvasData));
		}
		if (keydown.down) {
			playerBullets.push(player.shoot('down', canvasData));
		}
		if (keydown.up) {
			playerBullets.push(player.shoot('up', canvasData));
		}

		playerBullets.forEach(function(bullet) {
			bullet.update(canvasData);
		});

		playerBullets = playerBullets.filter(function(bullet) {
			return bullet.active;
		});

		player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
		player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);
	}

	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		player.draw(canvas);

		playerBullets.forEach(function(bullet) {
			bullet.draw(canvas);
		});
	}