import { BorderStyle } from "./border-style";

export interface IBorder {
    color: string;
    width: string | string[];
    style: BorderStyle;
}
