interface iFrame {
    name: string,
}

class Frames {
    frames: iFrame[];

    constructor(frames: iFrame[] = []) {
        this.frames = frames;
    }

    add() {
        return new Frames();
    }

    remove() {
        return new Frames();
    }

    modify() {
        return new Frames();
    }
}


export { Frames, type iFrame };