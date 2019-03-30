export interface HashMap<T = any> {
    [key: string]: T;
}
export declare const identity: <T>(v: T, ..._: any[]) => T;
export declare const hyph: (s: string) => string;
export declare const pair: (k: string, v: any) => string;
export declare const wrap: (k: string, v: string) => string;
