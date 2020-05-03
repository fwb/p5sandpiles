import { DEngine } from './dengine';
import { Particle } from './particle';
import { Player } from './player';
import { Timer } from './timer';
import { Debris } from './debris';

class Game {
    de: DEngine;
    img: p5.Image;
    particles: Particle[];
    player: Player;
    timer: Timer;
    debris: Debris;

    constructor(sketch: p5) {
        this.de = new DEngine(sketch);
    }

    preload() {
        this.de.preload();
        this.img = this.de.sketch.loadImage('images/wapurr.jpg');
    }

    setup() {
        this.de.sketch.background(DEngine.DefaultBackground);
        this.de.sketch.frameRate(DEngine.FrameRate);

        this.de.setup();
        this.de.world.gravity.y = 0;

        this.particles = new Array<Particle>();
        for (let i = 0; i < 10; i++) {
            let p = new Particle(this.img, this.de.sketch);
            p.spawn();
            this.particles.push(p);
        }

        const { windowWidth: width, windowHeight: height } = this.de.sketch;
        width > height ? this.img.resize(width, 0) : this.img.resize(0, height);
        this.player = new Player(this.de, width / 2, height / 2);

        this.timer = new Timer(DEngine.FireRate);

        this.debris = new Debris(this.de);
        // setup boundary volumes
    }

    update() {
        this.de.update(this.de.sketch.deltaTime);

        for (let p of this.particles) {
            p.update();
        }

        this.debris.update();
        this.timer.tick(this.de.sketch.deltaTime);

        this.player.update();
    }

    draw() {
        this.update();

        this.de.sketch.background(DEngine.DefaultBackground);
        for (let p of this.particles) {
            p.draw();
        }

        this.debris.draw();
        this.player.draw();
    }

    keyPressed() {
        console.log('Key pressed:', this.de.sketch.key);
    }

    touchEnded() {
        if (this.timer.active) {
            return;
        } else {
            this.player.fire();
            this.timer.start();
        }
    }

    touchMoved() { }

    windowResized() {
        this.de.sketch.resizeCanvas(this.de.sketch.windowWidth, this.de.sketch.windowHeight);
        this.de.sketch.background(DEngine.DefaultBackground);
    }
}

export default Game;
