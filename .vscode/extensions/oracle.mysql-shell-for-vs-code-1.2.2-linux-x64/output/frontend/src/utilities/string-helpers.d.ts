export declare const quote: (text: string, quoteChar?: string) => string;
export declare const unquote: (text: string, quotes?: string) => string;
export declare const convertPropValue: (value?: number | string | undefined, numericUnit?: string) => string | undefined;
export declare const isWhitespaceOnly: (str: string) => boolean;
export declare const formatTime: (time?: number | undefined) => string;
export declare const formatWithNumber: (text: string, value: number) => string;
export declare const filterInt: (value: string) => number;
