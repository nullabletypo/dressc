export const identity = (v, ..._) => v;
export const hyph = (s) => s.replace(/[A-Z]/g, '-$&').toLowerCase();
export const pair = (k, v) => `${k}:${v};`;
export const wrap = (k, v) => `${k}{${v}}`;
//# sourceMappingURL=utils.js.map