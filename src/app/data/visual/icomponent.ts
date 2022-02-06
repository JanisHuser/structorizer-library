import { ILine } from "./draw/iline";
import { IRectangle } from "./draw/irectangle";
import { ITranslation } from "./itranslation";

export interface IComponent {
    title: ITranslation;
    description: ITranslation;
    rectangles: IRectangle[];
    lines: ILine[];
    acceptsChildren: boolean;
}
