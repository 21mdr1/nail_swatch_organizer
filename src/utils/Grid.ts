import { v4 as v4_uuid } from 'uuid';
interface iSwatch {
    name: string,
    brand: string,
    colorChoice: "1" | "2",
    color: string,
    file: File[] | string,
    notes: string,
    col: number,
    row: number,
    id: string,
}

interface iGridAction {
    type: 'add' | 'modify' | 'delete' | 'move' | 'zoom',
    swatch?: iSwatch,
    transformX?: number,
    transformY?: number,
    zoom?: number,
    save?: boolean,
}

class Grid {
    frameId: string;
    swatches: iSwatch[];
    size: number;
    transformX: number; transformY: number;
    color: string; dotColor: string;

    constructor(
        frameId: string, 
        swatches: iSwatch[] = [], 
        size: number = 40,
        transformX: number = 0, transformY: number = 0, 
        color: string = "#F2F2F2", dotColor: string = "#333435"
    ) {
        this.frameId = frameId;
        this.swatches = swatches;
        this.size = size;
        this.transformX = transformX; this.transformY = transformY;
        this.color = color; this.dotColor = dotColor;
    }

    addSwatch(swatch: iSwatch | undefined) {
        if (!swatch) return this.createNewGrid({});

        swatch.id = v4_uuid();
        const newSwatches = [...this.swatches, swatch];

        return this.createNewGrid({ newSwatches });
    }

    removeSwatch(swatch: iSwatch | undefined) {
        if (!swatch) return this.createNewGrid({});

        const newSwatches = this.swatches.filter(item => item.id !== swatch.id);

        return this.createNewGrid({ newSwatches });
    }

    modifySwatch(swatch: iSwatch | undefined) {
        if (!swatch) return this.createNewGrid({});

        const newSwatches = [...this.swatches.filter(item => item.id !== swatch.id), swatch ];

        return this.createNewGrid({ newSwatches });
    }

    move(transformX: number | undefined, transformY: number | undefined, save: boolean = false) {
        return this.createNewGrid({});
    }

    zoom(zoom: number | undefined, save: boolean = false) {
        if (!zoom) return this.createNewGrid({});


        return this.createNewGrid({});
    }

    createNewGrid({ frameId, newSwatches, transformX, transformY, zoom, color, dotColor }: {
        frameId?: string,
        newSwatches?: iSwatch[],
        transformX?: number,
        transformY?: number,
        zoom?: number,
        color?: string,
        dotColor?: string
    }) {
        return new Grid(
            frameId || this.frameId, 
            newSwatches || this.swatches,
            zoom || this.size,
            transformX || this.transformX,
            transformY || this.transformY,
            color || this.color,
            dotColor || this.dotColor
        )
    }
}

export { Grid, type iSwatch, type iGridAction };