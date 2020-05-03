import p5 from "p5";

import { Globals } from './globals';
import { Timer } from "./timer";
import { DEngine } from "./dengine";

export class Laser {
    de: DEngine;
    body: Matter.Body;
    timer: Timer;
    sprite: p5.Image;

    constructor(de: DEngine, sprite: p5.Image, x: number, y: number, angle: number) {
        this.de = de;
        this.body = DEngine.Bodies.rectangle(x, y, 10, 30);
        DEngine.World.add(de.world, this.body);

        let fx = de.sketch.cos(angle) * 0.08;
        let fy = de.sketch.sin(angle) * 0.08;
        let force = DEngine.Vector.create(fx, fy);

        DEngine.Body.rotate(this.body, angle + de.sketch.HALF_PI);
        DEngine.Body.applyForce(this.body, this.body.position, force);

        this.sprite = sprite;
        this.timer = new Timer(Globals.LaserLifetime);
        this.timer.start();
    }

    update(sketch: p5) {
        this.timer.tick(sketch.deltaTime);
    }

    draw(sketch: p5) {
        sketch.push();
        sketch.translate(this.body.position.x, this.body.position.y);
        sketch.rotate(this.body.angle);
        sketch.imageMode(sketch.CENTER);
        sketch.image(this.sprite, 0, 0);
        sketch.pop();
    }
}
