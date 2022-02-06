import { IIdentifier } from "../common/iidentifier";

export interface IComponentExport {
    identifier: string;
    children: IComponentExport[];
    properties: Map<string,any>;
}
