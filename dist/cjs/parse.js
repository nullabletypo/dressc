"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function parse(tree, parent = '@') {
    const rules = [];
    let rule = '';
    for (let k in tree) {
        const v = tree[k];
        k = utils_1.hyph(k);
        if (v == null) {
            /* noop */
        }
        else if (typeof v === 'object') {
            rules.push(utils_1.wrap(k, parse(v, k)));
        }
        else {
            rule += utils_1.pair(k, v);
        }
    }
    if (rule.length > 0) {
        rules.unshift(/^@/.test(parent) ? utils_1.wrap('&', rule) : rule);
    }
    return rules.join('');
}
exports.default = parse;
//# sourceMappingURL=parse.js.map