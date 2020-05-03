import * as p5 from 'p5';

import { Entity } from './entity';
import { Timer } from './timer';

export class Particle extends Entity {
    texture: p5.Image;
    timer: Timer;
    x: number;
    y: number;
    vx: number;
    vy: number;
    sketch: p5;

    static DEFAULT_LIFETIME = 2000;

    constructor(texture: p5.Image, sketch: p5) {
        super();
        this.sketch = sketch;
        this.texture = texture;

        this.x = this.sketch.windowWidth / 2;
        this.y = this.sketch.windowHeight / 2;
        const a = this.sketch.random(this.sketch.TWO_PI);
        const speed = this.sketch.random(1, 2);
        this.vx = this.sketch.cos(a) * speed;
        this.vy = this.sketch.sin(a) * speed;

        this.timer = new Timer(Particle.DEFAULT_LIFETIME);
    }

    draw() {
        this.sketch.noStroke();
        const c = this.texture.get(this.x, this.y);
        this.sketch.fill(c[0], c[1], c[2], 25);
        this.sketch.ellipse(this.x, this.y, 20);
    }

    spawn() {
        console.log('p spawn');
        this.timer.start();
    }

    update() {
        if (this.timer.active) {
            this.timer.tick(this.sketch.deltaTime);
        }

        this.x += this.vx;
        this.y += this.vy;
        if (this.y < 0) {
            this.y = this.sketch.windowHeight;
        }
        if (this.y > this.sketch.windowHeight) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = this.sketch.windowWidth;
        }
        if (this.x > this.sketch.windowWidth) {
            this.x = 0;
        }
    }
}
