import { FormatWidth } from "@angular/common";
import { IShape } from "../ishape";

export interface IRectangle extends IShape{
    left: number | string;
    top: number | string;
    right: number | string; 
    bottom: number | string;
    rx?: number | string;
    ry?: number | string;
}
