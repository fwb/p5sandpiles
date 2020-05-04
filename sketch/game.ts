import p5 from 'p5';

import { DEngine } from './dengine';

class Game {
    de: DEngine;

    autofill: boolean;
    btnAuto: p5.Element;
    colors: p5.Color[];
    sandpiles: number[];

    static playIcon = '<i class="fas fa-play-circle fa-5x"></i>';
    static pauseIcon = '<i class="fas fa-pause-circle fa-5x"></i>';
    static randomIcon = '<i class="fas fa-chess-board fa-5x"></i>';
    static resetIcon = '<i class="fas fa-undo fa-5x"></i>';

    constructor(sketch: p5) {
        this.de = new DEngine(sketch);
    }

    setup() {
        const { sketch } = this.de;

        let canvas = sketch.createCanvas(DEngine.WindowSize, DEngine.WindowSize);
        canvas.style('display', 'block');
        canvas.parent('canvas-container');

        sketch.background(DEngine.DefaultBackground);
        sketch.frameRate(DEngine.FrameRate);

        this.sandpiles = new Array(sketch.width * sketch.height);
        this.reset();

        this.colors = new Array<p5.Color>();
        this.colors.push(sketch.color(0, 0, 0));
        this.colors.push(sketch.color(165, 75, 55));
        this.colors.push(sketch.color(205, 125, 75));
        this.colors.push(sketch.color(245, 195, 175));

        this.autofill = true;
        this.btnAuto = sketch.createButton(Game.pauseIcon);
        this.btnAuto.mousePressed(() => this.toggleAutofill());
        this.btnAuto.parent('control-container');
        this.btnAuto.class('control');

        const randomize = sketch.createButton(Game.randomIcon);
        randomize.mousePressed(() => this.randomize());
        randomize.parent('control-container');
        randomize.class('control')

        const reset = sketch.createButton(Game.resetIcon);
        reset.mousePressed(() => this.reset());
        reset.parent('control-container');
        reset.class('control')
    }

    toggleAutofill() {
        if (this.autofill) {
            this.btnAuto.html(Game.playIcon);
        } else {
            this.btnAuto.html(Game.pauseIcon);
        }

        this.autofill = !this.autofill;
    }

    randomize() {
        for (let i = 0; i < this.sandpiles.length; i++) {
            this.sandpiles[i] = this.de.sketch.random([0, 1, 2, 3]);
        }
    }

    reset() {
        this.sandpiles.fill(0);
    }

    topple(): boolean {
        const { width } = this.de.sketch;

        let repeat = false;
        let newpiles = [...this.sandpiles];

        for (let i = 0; i < newpiles.length; i++) {
            if (this.sandpiles[i] >= 4) {
                repeat = true;
                newpiles[i] = this.sandpiles[i] - 4;
                if (i + 1 < newpiles.length) { newpiles[i + 1]++; }
                if (i - 1 >= 0) { newpiles[i - 1]++; }
                if (i + width < newpiles.length) { newpiles[i + width]++; }
                if (i - width >= 0) { newpiles[i - width]++; }
            }
        }

        this.sandpiles = newpiles;
        return repeat;
    }

    update() {
        const { sketch } = this.de;
        const { width, height, deltaTime, mouseX, mouseY } = sketch;

        if (this.autofill) {
            const i = (width) * (height / 2) + (width / 2);
            this.sandpiles[i] += 4;
        }

        if (sketch.mouseIsPressed) {
            if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
                const i = sketch.int(mouseX + mouseY * width);
                this.sandpiles[i] += 1;
            }
        }

        while (this.topple());
    }

    draw() {
        this.update();

        const { sketch } = this.de;
        sketch.push();

        sketch.loadPixels();
        for (let y = 0; y < sketch.height; y++) {
            for (let x = 0; x < sketch.width; x++) {
                let c = this.colors[0];
                const i = y * sketch.width + x;
                switch (this.sandpiles[i]) {
                    case 1: c = this.colors[1]; break;
                    case 2: c = this.colors[2]; break;
                    case 3: c = this.colors[3]; break;
                }

                // const s = this.sandpiles[i];
                // console.log({ x, y, i, s, c });
                sketch.set(x, y, c);
            }
        }
        sketch.updatePixels();

        sketch.fill(255);
        sketch.textSize(3);
        sketch.text(`FPS: ${sketch.frameRate()}`, 5, 5);

        sketch.pop();
    }
}

export default Game;
