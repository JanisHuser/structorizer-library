import { FormatWidth } from "@angular/common";
import { IShape } from "../ishape";

export interface IRectangle extends IShape{
    x: number | string;
    y: number | string;
    width: number | string; 
    height: number | string;
    rx?: number | string;
    ry?: number | string;
}
