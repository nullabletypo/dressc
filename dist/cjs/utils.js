"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identity = (v, ..._) => v;
exports.hyph = (s) => s.replace(/[A-Z]/g, '-$&').toLowerCase();
exports.pair = (k, v) => `${k}:${v};`;
exports.wrap = (k, v) => `${k}{${v}}`;
//# sourceMappingURL=utils.js.map