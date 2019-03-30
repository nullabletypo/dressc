import * as CSS from 'csstype';
import { HashMap } from './utils';
export interface StaticCSSProps extends CSS.Properties, CSS.PropertiesHyphen {
}
export declare type CSSTree = StaticCSSProps | HashMap<StaticCSSProps> | HashMap<HashMap<StaticCSSProps>>;
export declare type CSSRegistoryOptions = {
    prefix: string;
    onBeforeParse: (tree: CSSTree) => CSSTree;
    onAfterParse: (cssText: string) => string;
};
export declare class CSSRegistory {
    options: CSSRegistoryOptions;
    cache: HashMap<string>;
    rules: string[];
    _hasChange: boolean;
    _cssText: string;
    constructor(options?: Partial<CSSRegistoryOptions>);
    readonly cssText: string;
    push(tree: CSSTree, commit: (rule: string, id: string) => string): string;
    static defaultOptions: () => CSSRegistoryOptions;
    static activate: (tepmlate: string, id: string) => string;
}
