import { IComponent } from "../icomponent";

export interface ITabData {
    title: string;
    components: IComponent[];
    isActive: boolean;
}
