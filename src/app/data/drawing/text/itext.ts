import { Fonts } from "./fonts";

export interface IText {
    x: number | string;
    y: number | string;
    font?: Fonts;
    fontSize?: number | string;
    static?: string;
    template?: string;
}
