import { IBorder } from "./drawing/iborder";
import { ILine } from "./drawing/iline";
import { IRectangle } from "./drawing/shapes/irectangle";

export interface IDrawing {
    line?: ILine;
    rectangle?: IRectangle;
}
