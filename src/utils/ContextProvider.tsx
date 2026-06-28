import { createContext, useReducer, useEffect, type ReactNode } from "react";
import { Grid, type iGridAction } from "./Grid";
import { Frames, type iFrameAction, type iFrame } from "./Frames";

const GridContext = createContext(new Grid(""));
const GridDispatchContext = createContext((_: iGridAction) => {});

const FrameContext = createContext(new Frames([]));
const FrameDispatchContext = createContext((_: iFrameAction) => {});

export default function ContextProvider({ children }: { children: ReactNode }) {
    const [ grid, gridDispatch ] = useReducer(gridReducer, new Grid(""));
    const [ frames, framesDispatch ] = useReducer(framesReducer, new Frames());
    
    useEffect(() => {

    }, []);

    return (
        <GridContext value={grid}>
            <GridDispatchContext value={gridDispatch}>
                <FrameContext value={frames}>
                    <FrameDispatchContext value={framesDispatch}>
                        { children }
                    </FrameDispatchContext>
                </FrameContext>
            </GridDispatchContext>
        </GridContext>
    );
}

function gridReducer(grid: Grid, action: iGridAction) {
    switch (action.type) {
        case 'add': {
            return grid.addSwatch();
        }
        case 'modify': {
            return grid.modifySwatch();
        }
        case 'delete': {
            return grid.removeSwatch();
        }
        case 'zoom': {
            return grid.zoom();
        }
        case 'move': {
            return grid.move();
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function framesReducer(frames: Frames, action: iFrameAction) {
    switch (action.type) {
        case 'add': {
            return frames.add(action.frame);
        }
        case 'modify': {
            return frames.modify(action.frame);
        }
        case 'remove': {
            return frames.remove(action.frame);
        }
        case 'changeCurrent': {
            return frames.setCurrent(action.newCurrent);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

export { GridContext, GridDispatchContext, FrameContext, FrameDispatchContext };