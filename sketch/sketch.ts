import p5 from 'p5';

import Game from './game';

var app = function (sketch: p5) {
	let game: Game;

	sketch.preload = function () {
		game = new Game(sketch);
	}

	sketch.setup = function () {
		game.setup();
	};

	sketch.draw = function () {
		game.draw();
	}
}

new p5(app);
