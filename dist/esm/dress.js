import { identity, wrap } from './utils';
import { CSSRegistory } from './css-registory';
export const wrapKeyframes = (rule, id) => wrap(`@keyframes ${id}`, rule);
export const dress = (options = {}) => {
    const r = new CSSRegistory(options);
    const css = (tree) => r.push(tree, identity);
    const keyframes = (tree) => r.push(tree, wrapKeyframes);
    const extract = () => r.cssText;
    return { css, keyframes, extract };
};
//# sourceMappingURL=dress.js.map