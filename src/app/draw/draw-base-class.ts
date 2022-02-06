import { BorderStyle } from "../data/visual/draw/border-style";
import { MouseState } from "./general/mouse-state";

export class DrawBaseClass {
    public static MouseState: MouseState;

    
    toEnumStyle(ordinal: number) :string {
        return BorderStyle[ordinal].toString();
    }

    
}
