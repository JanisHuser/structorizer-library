import { IBorder } from "./iborder";
import { IShape } from "./ishape";

export interface IRectangle extends IShape {
    left: number | string;
    top: number | string;
    right: number | string;
    bottom: number | string;
    border?: IBorder;
    
}
