"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memo = (func) => {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        return (cache[key] = cache[key] || func.apply(func, args));
    };
};
exports.arity = (n, f) => {
    return (...args) => f.apply(f, args.slice(0, n));
};
exports.uid = ((i) => (...symbol) => {
    return ['_', (i++).toString(36), ...symbol].join('_');
})(0);
exports.hyph = (str) => {
    return str.replace(/[A-Z]/g, '-$&').toLowerCase();
};
exports.wrap = (body, ...path) => {
    return path.reduceRight((acc, key) => `${key}{${acc}}`, body);
};
exports.assign = (...obj) => {
    return Object.assign({}, ...obj);
};
//# sourceMappingURL=utils.js.map