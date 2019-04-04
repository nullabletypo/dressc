import { compile as _compile } from './compile';
import hash from '@emotion/hash';
export default (option = {}) => {
    const compile = option.compile || _compile;
    const prefix = option.prefix || 'dress-';
    const cache = {}; // {template: id}
    let cssText = '';
    const css = (strings, ...values) => {
        const template = String.raw(strings, ...values);
        let id = cache[template];
        if (id === undefined) {
            id = cache[template] = prefix + hash(template);
            cssText += compile('.' + id, template);
        }
        return id;
    };
    const keyframes = (string, ...values) => {
        const template = String.raw(string, ...values);
        let id = cache[template];
        if (id === undefined) {
            id = cache[template] = prefix + hash(template);
            cssText += `@keyframes ${id}{${template.replace(/\s+/g, ' ')}}`;
        }
        return id;
    };
    const extract = () => cssText;
    return { css, keyframes, extract };
};
//# sourceMappingURL=index.js.map