import { IStructure } from "./istructure";

export interface IPage {
    title: string;
    description?: string;
    structure: IStructure;
    createdOn: Date;
}
