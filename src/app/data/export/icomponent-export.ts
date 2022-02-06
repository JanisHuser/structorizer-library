import { IIdentifier } from "../common/iidentifier";

export interface IComponentExport {
    type: IIdentifier;
    children: IComponentExport[];
    properties: Map<string,any>;
}
