import p5 from 'p5';
import { Transform } from './transform';

export class Entity {
    transform: Transform;
    velocity: p5.Vector;

    draw(sketch: p5) { }
    update(sketch: p5) { }
}
