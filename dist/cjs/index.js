"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compile_1 = require("./compile");
const hash_1 = __importDefault(require("@emotion/hash"));
exports.default = (option = {}) => {
    const compile = option.compile || compile_1.compile;
    const prefix = option.prefix || 'dress-';
    const cache = {}; // {template: id}
    let cssText = '';
    const css = (strings, ...values) => {
        const template = String.raw(strings, ...values);
        let id = cache[template];
        if (id === undefined) {
            id = cache[template] = prefix + hash_1.default(template);
            cssText += compile('.' + id, template);
        }
        return id;
    };
    const keyframes = (string, ...values) => {
        const template = String.raw(string, ...values);
        let id = cache[template];
        if (id === undefined) {
            id = cache[template] = prefix + hash_1.default(template);
            cssText += `@keyframes ${id}{${template.replace(/\s+/g, ' ')}}`;
        }
        return id;
    };
    const extract = () => cssText;
    return { css, keyframes, extract };
};
//# sourceMappingURL=index.js.map