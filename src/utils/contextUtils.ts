import { createContext } from "react";
import { Grid } from "./Grid";
import { Frames } from "./Frames";
import type { Dispatch, SetStateAction } from "react";

const GridContext = createContext({
    value: new Grid("grid1"),
    setValue: (_) => {},
} as {
    value: Grid,
    setValue: Dispatch<SetStateAction<Grid>>,
});

const FrameContext = createContext({
    value: new Frames(),
    setValue: (_) => {}
} as {
    value: Frames,
    setValue: Dispatch<SetStateAction<Frames>>
});

export { GridContext, FrameContext };