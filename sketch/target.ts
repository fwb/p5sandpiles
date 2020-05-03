import p5 from "p5";

import { Globals } from './globals';
import { Entity } from './entity';
import { Transform } from './transform';

export class Target extends Entity {
    // class Target extends Entity {
    color: p5.Color;
    time: p5.Vector;
    hitDuration: number;
    collideColor: p5.Color;
    defaultColor: p5.Color;

    sketch: p5;

    // windowWidth: number;
    // windowHeight: number

    constructor(x: number, y: number, size: number, sketch: p5) {
        super();

        this.defaultColor = sketch.color(128, 0, 255);
        this.collideColor = sketch.color(255, 0, 255);
        this.color = this.defaultColor;

        // this.windowWidth = x;
        // this.windowHeight = y;
        this.sketch = sketch;

        this.velocity = sketch.createVector(Globals.DefaultVelocity / 10000, Globals.DefaultVelocity / 10000);
        this.time = sketch.createVector(sketch.random(x), sketch.random(y));

        this.transform = new Transform(sketch);
        this.transform.pos.x = x;
        this.transform.pos.y = y;
        this.transform.size = size;

        this.hitDuration = 0;
    }

    draw() {
        this.sketch.fill(this.color);
        this.sketch.ellipse(this.transform.pos.x, this.transform.pos.y, this.transform.size);
    }

    update() {
        if (this.hitDuration > 0) {
            this.hitDuration -= this.sketch.deltaTime;
        }

        // console.log(this.hitDuration, dt);
        if (this.hitDuration > 0) {
            this.color = this.collideColor;
            this.hitDuration -= this.sketch.deltaTime;
            if (this.hitDuration < 0) {
                this.hitDuration = 0;
            }
        } else {
            this.color = this.defaultColor;
        }

        this.time.x += this.velocity.x;
        this.time.y += this.velocity.y;


        this.transform.pos.x = this.sketch.map(this.sketch.noise(this.time.x), 0, 1, 0, this.sketch.windowWidth);
        this.transform.pos.y = this.sketch.map(this.sketch.noise(this.time.y), 0, 1, 0, this.sketch.windowHeight);
    }

    setVelocity(x = Globals.DefaultVelocity, y = Globals.DefaultVelocity) {
        this.velocity.x = x / 10000;
        this.velocity.y = y / 10000;
    }

    clicked(): boolean {
        if (this.hitDuration <= 0) {
            this.hitDuration = 1000;
            return true;
        }

        return false;
    }

    collides(x: number, y: number): boolean {
        let hit = false;
        let d = this.sketch.dist(x, y, this.transform.pos.x, this.transform.pos.y);
        if (d < this.transform.size / 2) {
            hit = true;
        }

        // console.log({ x, posx: int(this.transform.pos.x), y, posy: int(this.transform.pos.y), d: int(d), hit });
        console.log({ distance: d, hit });
        return hit;
    }
}