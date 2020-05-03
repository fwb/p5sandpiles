import p5 from 'p5';

export class Transform {
    pos: p5.Vector;
    size: number;

    constructor(x = 0, y = 0, size = 1) {
        this.pos = new p5.Vector();
        this.pos.x = x;
        this.pos.y = y;

        this.size = size;
    }
}