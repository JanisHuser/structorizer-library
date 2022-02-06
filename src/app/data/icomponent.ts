import { IDrawing } from "./idrawing";
import { ITranslation } from "./visual/itranslation";

export interface IComponent {
    title: ITranslation;
    description: ITranslation;
    acceptsChildren?: boolean;
    drawing?: IDrawing[];
    identifier: string;
}
