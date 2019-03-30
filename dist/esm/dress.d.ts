import { CSSTree, CSSRegistoryOptions } from './css-registory';
export interface DressOptions extends CSSRegistoryOptions {
}
export declare const wrapKeyframes: (rule: string, id: string) => string;
export declare const dress: (options?: Partial<DressOptions>) => {
    css: (tree: CSSTree) => string;
    keyframes: (tree: CSSTree) => string;
    extract: () => string;
};
