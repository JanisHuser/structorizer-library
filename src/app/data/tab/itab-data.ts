import { IComponent } from "../visual/icomponent";

export interface ITabData {
    title: string;
    components: IComponent[];
    isActive: boolean;
}
