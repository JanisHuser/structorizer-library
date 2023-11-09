
export class LanguageNotFoundError implements Error
{
    name: string = "LanguageNotFoundError";
    message!: string;
    stack?: string | undefined;


    constructor (language: string) {
        this.message = `Language ${language} not found`;
    }

}