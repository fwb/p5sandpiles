import p5 from 'p5';
import Matter from 'matter-js';

export class DEngine {
    static DefaultBackground = 51;
    static FrameRate = 30;
    static DefaultVelocity = 90;
    static TargetSize = 36;
    static ClickDebounce = 200;
    static LaserLifetime = 3000;
    static DefaultAcceleration = 0.05;
    static FireRate = 575;

    static Body = Matter.Body;
    static Bodies = Matter.Bodies;
    static Engine = Matter.Engine;
    static Vector = Matter.Vector;
    static World = Matter.World;

    static Asteroids = [
        'images/meteorGrey_big1.png',
        'images/meteorGrey_big2.png',
        'images/meteorGrey_big3.png',
        'images/meteorGrey_big4.png',
    ];

    sketch: p5;
    engine: Matter.Engine;
    world: Matter.World;
    asteroids: p5.Image[];

    constructor(sketch: p5) {
        this.sketch = sketch;
    }

    preload() {
        this.asteroids = new Array<p5.Image>();
        DEngine.Asteroids.forEach(i => this.asteroids.push(this.sketch.loadImage(i)));
    }

    setup() {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
    }

    update(dt: number) {
        Matter.Engine.update(this.engine);
    }
}
