export enum InputOptionType {
    dropdown,
    text,
    hex_value,
    decimal_value
}

export interface IInputOption {
    description: string;
    name: string;
    type: InputOptionType;

    value: any;
    options?: any[];
    changed?: (() => void)[];
    store?: string;
}

export interface IConfiguration {
    header: {[lang: string]: string};
    inputs: IInputOption[];
}