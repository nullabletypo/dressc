export const memo = (func) => {
    const cache = {};
    return (...args) => {
        const key = JSON.stringify(args);
        return (cache[key] = cache[key] || func.apply(func, args));
    };
};
export const arity = (n, f) => {
    return (...args) => f.apply(f, args.slice(0, n));
};
export const uid = ((i) => (...symbol) => {
    return ['_', (i++).toString(36), ...symbol].join('_');
})(0);
export const hyph = (str) => {
    return str.replace(/[A-Z]/g, '-$&').toLowerCase();
};
export const wrap = (body, ...path) => {
    return path.reduceRight((acc, key) => `${key}{${acc}}`, body);
};
export const assign = (...obj) => {
    return Object.assign({}, ...obj);
};
//# sourceMappingURL=utils.js.map