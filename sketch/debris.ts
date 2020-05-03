import { DEngine } from "./dengine";
import { Timer } from "./timer";

class Asteroid {
    sprite: p5.Image;
    body: Matter.Body;

    constructor(de: DEngine, x: number, y: number) {
        console.log(de.asteroids);
        this.sprite = de.sketch.random(de.asteroids);
        this.body = DEngine.Bodies.rectangle(x, y, this.sprite.width, this.sprite.height);
        DEngine.World.addBody(de.world, this.body);

        let angle = de.sketch.random(0, 360);
        let dist = de.sketch.max(de.sketch.windowWidth, de.sketch.windowHeight);
    }

    update() { }

    draw(sketch: p5) {
        sketch.push();
        sketch.translate(this.body.position.x, this.body.position.y);
        sketch.rotate(this.body.angle);
        sketch.imageMode(sketch.CENTER);
        sketch.image(this.sprite, 0, 0);
        sketch.pop();
    }
}

export class Debris {
    de: DEngine;
    bodies: Matter.Body[];
    spawnTimer: Timer;
    asteroids: Asteroid[];

    constructor(de: DEngine) {
        this.de = de;
        this.asteroids = new Array<Asteroid>();
        this.spawnTimer = new Timer(10000);
    }

    spawn(x: number, y: number) {
        const { sketch } = this.de;
        let spin = sketch.random(-0.05, 0.05);
        let a = new Asteroid(this.de, x, y);
        DEngine.Body.setAngularVelocity(a.body, spin);
        DEngine.Body.setMass(a.body, 1000);
        a.body.frictionAir = 0;
        this.asteroids.push(a);
    }

    update() {
        if (this.spawnTimer.active) {
            this.spawnTimer.tick(this.de.sketch.deltaTime);
        } else {
            if (this.asteroids.length < 2) {
                const x = this.de.sketch.random(this.de.sketch.windowWidth);
                const y = this.de.sketch.random(this.de.sketch.windowHeight);
                this.spawn(x, y);
            }
            this.spawnTimer.start();
        }
    }

    draw() {
        this.asteroids.forEach(a => a.draw(this.de.sketch));
    }
}
