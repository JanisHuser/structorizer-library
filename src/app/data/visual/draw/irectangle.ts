import { IBorder } from "./iborder";

export interface IRectangle {
    left: number | string;
    top: number | string;
    right: number | string;
    bottom: number | string;
    border?: IBorder;
}
