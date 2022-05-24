import { IDictionary } from "../app-logic/Types";
export declare const loadTextFile: (name: string, async: boolean, callback: (response: string) => void) => void;
export declare const selectFile: (contentType: string, multiple: boolean) => Promise<File | File[] | null>;
export declare const saveTextAsFile: (text: string, fileName: string) => void;
export declare const clampValue: (value: number, min?: number | undefined, max?: number | undefined) => number;
export declare const uuid: () => string;
export declare const binarySearch: <T>(list: T[], predicate: (current: T) => number) => number;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const waitFor: (timeout: number, condition: () => boolean) => Promise<boolean>;
export interface IConversionOptions {
    ignore?: string[];
}
export declare const convertCamelToSnakeCase: (o: object, options?: IConversionOptions | undefined) => object;
export declare const convertSnakeToCamelCase: (o: object, options?: IConversionOptions | undefined) => object;
export declare const convertCamelToTitleCase: (s: string) => string;
export declare const convertTitleToCamelCase: (s: string) => string;
export declare const stripAnsiCode: (s: string) => string;
export declare const flattenObject: (o: IDictionary) => object;
export declare const deepEqual: (a: unknown, b: unknown) => boolean;
export declare const strictEval: (code: string) => unknown;
declare module "lodash" {
    interface LoDashStatic {
        deepMapKeys: (o: object, ignoreList: string[], fn: (value: unknown, key: string) => unknown) => object;
        deepMapArray: (a: unknown[], ignoreList: string[], fn: (value: unknown, key: string) => unknown) => unknown[];
    }
}
