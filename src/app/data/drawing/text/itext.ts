import { IBinding } from "../binding/ibinding";
import { Fonts } from "./fonts";

export interface IText {
    x: number | string;
    y: number | string;
    font?: Fonts;
    fontSize?: number | string;
    binding?: IBinding; 
}
