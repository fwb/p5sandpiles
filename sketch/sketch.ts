import p5 from 'p5';

import Game from './game';

var app = function (sketch: p5) {
	var game: Game;

	sketch.preload = function () {
		game = new Game(sketch);
		game.preload();
	}

	sketch.setup = function () {
		let cnv = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
		cnv.style('display', 'block');
		cnv.parent('canvas-container');
		game.setup();
	};

	sketch.draw = function () {
		game.draw();
	}

	sketch.keyPressed = function () {
		return game.keyPressed();
	}

	sketch.touchEnded = function () {
		game.touchEnded();
		return false;
	}

	sketch.touchMoved = function () {
		game.touchMoved();
		return false;
	}

	sketch.windowResized = function () {
		game.windowResized();
	}
}

new p5(app);
