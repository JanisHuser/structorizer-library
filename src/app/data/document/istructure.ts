export interface IStructure {
    identifier: string;
    children: IStructure[];
    properties: Map<string,any>;
}
