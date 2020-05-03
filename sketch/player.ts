import p5 from 'p5';

import { Entity } from './entity';
import { Laser } from './laser';
import { DEngine } from './dengine';
import { Timer } from './timer';

export class Player extends Entity {
    de: DEngine;
    body: Matter.Body;
    playerSprite: p5.Image;
    laserSprite: p5.Image;
    lasers: Laser[];

    constructor(de: DEngine, x: number, y: number) {
        super();
        this.de = de;

        this.body = DEngine.Bodies.circle(x, y, 100);
        DEngine.World.add(this.de.world, this.body);
        this.playerSprite = this.de.sketch.loadImage('images/spaceship2.png');
        this.laserSprite = this.de.sketch.loadImage('images/laserRed07.png');
        this.lasers = new Array<Laser>();
    }

    update() {
        const { mouseX, mouseY, HALF_PI } = this.de.sketch;
        const { x, y } = this.body.position;

        let offset = new p5.Vector();
        offset.set(mouseX - x, mouseY - y);
        let angle = this.de.sketch.atan2(offset.y, offset.x);
        this.body.angle = angle;
        // this.body.angle = angle + HALF_PI;

        if (this.de.sketch.mouseIsPressed) {
            let fx = this.de.sketch.cos(angle) * DEngine.DefaultAcceleration;
            let fy = this.de.sketch.sin(angle) * DEngine.DefaultAcceleration;
            let force = DEngine.Vector.create(fx, fy);

            DEngine.Body.applyForce(this.body, this.body.position, force);
            console.log(force);
        }

        this.lasers.forEach(l => l.update(this.de.sketch));
        this.lasers = this.lasers.filter(l => l.timer.active);
    }

    fire() {
        const l = new Laser(
            this.de,
            this.laserSprite,
            this.body.position.x,
            this.body.position.y,
            this.body.angle
        );
        this.lasers.push(l);
    }

    draw() {
        this.de.sketch.push();

        this.lasers.forEach(l => l.draw(this.de.sketch));

        this.de.sketch.translate(this.body.position.x, this.body.position.y);
        this.de.sketch.rotate(this.body.angle);
        this.de.sketch.imageMode(this.de.sketch.CENTER);
        this.de.sketch.image(this.playerSprite, 0, 0)

        this.de.sketch.pop();
    }
}
