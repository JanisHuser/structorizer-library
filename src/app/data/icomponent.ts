import { ICodeLine } from "./icode";
import { IDrawing } from "./idrawing";
import { IConfiguration, IInputOption } from "./IInputOption";
import { ILanguage } from "./language/ilanguage";

export interface IComponent {
    title: {[lang: string]: string};
    description: {[lang: string]: string};
    acceptsChildren?: boolean;
    drawing?: IDrawing[];
    languages: {[lang: string]: ICodeLine[]};

    children?: {[index: number]: IComponent[] };
    inputs?: IConfiguration[];
}
