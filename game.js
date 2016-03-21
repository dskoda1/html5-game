	/*global keydown */
	Number.prototype.clamp = function(min, max) {
		return Math.min(Math.max(this, min), max);
	};
	$(function() {
		window.keydown = {};
		window.lastKeyDown = '';

		function keyName(event) {
			return jQuery.hotkeys.specialKeys[event.which] ||
				String.fromCharCode(event.which).toLowerCase();
		}

		$(document).bind("keydown", function(event) {
			console.log(keyName(event));
			keydown[keyName(event)] = true;
		});

		$(document).bind("keyup", function(event) {
			keydown[keyName(event)] = false;
		});
	});


	var player = {
		color: "#00A",
		x: 20,
		y: 70,
		width: 32,
		height: 32,
		draw: function() {
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
		},
		shoot: function(direction) {
			var bulletPosition = this.midpoint();

			playerBullets.push(Bullet({
				speed: 10,
				x: bulletPosition.x,
				y: bulletPosition.y,
				dir: direction
			}));
		},
		midpoint: function() {
			return {
				x: this.x + this.width / 2,
				y: this.y + this.height / 2
			};
		}
	};

	var playerBullets = [];

	function Bullet(I) {
		I.active = true;
		console.log(I.dir);
		switch (I.dir) {
			case 'left':
				I.xVelocity = -I.speed;
				I.yVelocity = 0;
				break;
			case 'right':
				I.xVelocity = I.speed;
				I.yVelocity = 0;
				break;
			case 'up':
				I.xVelocity = 0;
				I.yVelocity = -I.speed;
				break;
			case 'down':
				I.xVelocity = 0;
				I.yVelocity = I.speed;
				break;
		}

		I.width = 3;
		I.height = 3;
		I.color = "#000";

		I.inBounds = function() {
			return I.x >= 0 && I.x <= CANVAS_WIDTH &&
				I.y >= 0 && I.y <= CANVAS_HEIGHT;
		};

		I.draw = function() {
			canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
		};

		I.update = function() {
			I.x += I.xVelocity;
			I.y += I.yVelocity;

			I.active = I.active && I.inBounds();
		};

		return I;
	}

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
			player.shoot('left');
		}
		if (keydown.right) {
			player.shoot('right');
		}
		if (keydown.down) {
			player.shoot('down');
		}
		if (keydown.up) {
			player.shoot('up');
		}

		playerBullets.forEach(function(bullet) {
			bullet.update();
		});

		playerBullets = playerBullets.filter(function(bullet) {
			return bullet.active;
		});

		player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
		player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);
	};

	function draw() {
		canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		player.draw();

		playerBullets.forEach(function(bullet) {
			bullet.draw();
		});
	};

	var CANVAS_WIDTH = document.documentElement.clientWidth - 50;
	var CANVAS_HEIGHT = document.documentElement.clientHeight - 50;

	var canvasElement = $("<canvas width='" + CANVAS_WIDTH +
		"' height='" + CANVAS_HEIGHT + "'></canvas>");
	var canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');



	var textX = 50;
	var textY = 50;
	var FPS = 30;
	setInterval(function() {
		update();
		draw();
	}, 1000 / FPS);