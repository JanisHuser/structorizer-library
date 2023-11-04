import { Icode } from "./icode";
import { IDrawing } from "./idrawing";
import { ILanguage } from "./language/ilanguage";

export interface IComponent {
    title: ILanguage;
    description: ILanguage;
    acceptsChildren?: boolean;
    drawing?: IDrawing[];
    languages: {[lang: string]: Icode};

    children?: {[index: number]: IComponent[] };
}
