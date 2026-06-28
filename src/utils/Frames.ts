import { v4 as v4_uuid } from 'uuid';

interface iFrame {
    id?: string,
    name: string,
}

interface iFrameAction {
    type: 'add' | 'modify' | 'remove' | 'changeCurrent',
    frame?: iFrame,
    newCurrent?: string
}

class Frames {
    frames: iFrame[];
    current: string;

    constructor(frames: iFrame[] = [], current: string = "") {
        this.frames = frames;
        this.current = current;
    }

    add(frame: iFrame | undefined) {
        if (!frame) return new Frames(this.frames, this.current);

        frame.id = v4_uuid();
        return new Frames([...this.frames, frame], frame.id);
    }

    remove(frame: iFrame | undefined) {
        if (!frame || this.frames.length <= 1) return new Frames(this.frames, this.current);

        const newFrames = this.frames.filter(item => item.id !== frame.id);
        return new Frames(newFrames, newFrames[0].id);
    }

    modify(frame: iFrame | undefined) {
        if (!frame) return new Frames(this.frames, this.current);

        const newFrames = [...this.frames.filter(itme => itme.id !== frame.id), frame]
        return new Frames(newFrames, frame.id || newFrames[0].id);
    }

    setCurrent(newCurrent: string | undefined) {
        if (!newCurrent) return new Frames(this.frames, this.current);

        return new Frames(this.frames, newCurrent);
    }
}


export { Frames, type iFrame, type iFrameAction };