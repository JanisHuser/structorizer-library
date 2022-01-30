import { ErrorLevel } from "./error-level";

export interface IError {
    state: number;
    reason: String;
    level: ErrorLevel;
}
