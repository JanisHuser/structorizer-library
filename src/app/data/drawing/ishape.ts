import { IBorder } from "./iborder";

export interface IShape {
    color?: string;
    border?: IBorder;
    acceptsChildren?: boolean;
}
