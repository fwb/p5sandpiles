import p5 from 'p5';
import Matter from 'matter-js';

export class DEngine {
    static DefaultBackground = 51;
    static WindowSize = 100;
    static FrameRate = 30;

    sketch: p5;

    constructor(sketch: p5) {
        this.sketch = sketch;
    }
}
