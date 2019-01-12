export declare const memo: <F extends (...arg: any) => any>(func: F) => (...args: Parameters<F>) => ReturnType<F>;
export declare const arity: <F extends (...args: any[]) => any>(n: number, f: F) => (...args: Parameters<F>) => ReturnType<F>;
export declare const uid: (...symbol: string[]) => string;
export declare const hyph: (str: string) => string;
export declare const wrap: (body: string, ...path: string[]) => string;
export declare const assign: <T extends object>(...obj: T[]) => any;
