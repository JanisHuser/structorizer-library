import { IDrawing } from "./idrawing";
import { ILanguage } from "./language/ilanguage";

export interface IComponent {
    title: ILanguage;
    description: ILanguage;
    acceptsChildren?: boolean;
    drawing?: IDrawing[];
    identifier: string;
}
