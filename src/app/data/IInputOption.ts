export enum InputOptionType {
    dropdown,
    text,
    hex_value,
    decimal_value
}

export interface IInputOption {
    description: string
    name: string
    type: InputOptionType
}

export interface IConfiguration {
    header: {[lang: string]: string};
    inputs: IInputOption[];
}