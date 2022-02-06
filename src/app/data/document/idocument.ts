import { IAuthor } from "./iauthor";
import { IPage } from "./ipage";

export interface IDocument {
    title: string;
    description?: string;
    author: IAuthor;
    pages: IPage[];
    createdOn: Date;
}
