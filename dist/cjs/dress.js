"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const css_registory_1 = require("./css-registory");
exports.wrapKeyframes = (rule, id) => utils_1.wrap(`@keyframes ${id}`, rule);
exports.dress = (options = {}) => {
    const r = new css_registory_1.CSSRegistory(options);
    const css = (tree) => r.push(tree, utils_1.identity);
    const keyframes = (tree) => r.push(tree, exports.wrapKeyframes);
    const extract = () => r.cssText;
    return { css, keyframes, extract };
};
//# sourceMappingURL=dress.js.map