interface iSwatch {
    name: string,
    brand: string,
    colorChoice: "1" | "2",
    color: string,
    file: any[] | string,
    notes: string,
    col: number,
    row: number,
}

class Grid {
    name: string;
    swatches: iSwatch[];
    size: number;
    transformX: number; transformY: number;
    color: string; dotColor: string;

    constructor(
        name: string, 
        swatches: iSwatch[] = [], 
        size: number = 40,
        transformX: number = 0, transformY: number = 0, 
        color: string = "#F2F2F2", dotColor: string = "#333435"
    ) {
        this.name = name;
        this.swatches = swatches;
        this.size = size;
        this.transformX = transformX; this.transformY = transformY;
        this.color = color; this.dotColor = dotColor;
    }

    addSwatch() {
        return new Grid(this.name);
    }

    removeSwatch() {
        return new Grid(this.name);
    }

    modifySwatch() {
        return new Grid(this.name);
    }

    move() {
        return new Grid(this.name);
    }

    zoom() {
        return new Grid(this.name);
    }
}

export { Grid, type iSwatch };