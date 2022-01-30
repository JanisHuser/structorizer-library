import { IDrawing } from "./idrawing";

export interface IComponent {
    title: String;
    description: String;
    acceptsChildren?: boolean;
    drawing?: IDrawing[];
}
