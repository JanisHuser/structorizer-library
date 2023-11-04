import { IBorder } from "./drawing/iborder";
import { ILine } from "./drawing/iline";
import { IRectangle } from "./drawing/shapes/irectangle";
import { IText } from "./drawing/text/itext";

export interface IDrawing {
    line?: ILine;
    rectangle?: IRectangle;
    text?: IText;
}
