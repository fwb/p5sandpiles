import { Globals } from './globals';

export class Timer {
    duration: number;
    time: number;
    active: boolean;

    constructor(duration = Globals.ClickDebounce) {
        this.duration = duration;
        this.time = 0;
        this.active = false;
    }

    start() {
        this.time = 0;
        this.active = true;
    }

    tick(dt: number) {
        this.time += dt;
        if (this.time >= this.duration) {
            this.active = false;
        }
    }
}
