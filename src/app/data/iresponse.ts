import { IError } from "./ierror";

export interface IResponse<T> {
    success: boolean;
    error?: IError;
    data: T;
}
