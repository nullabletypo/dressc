"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
exports.parse = utils_1.memo((tree, parent = '@') => {
    const rules = [];
    let rule = '';
    for (let key in tree) {
        const val = tree[key];
        key = utils_1.hyph(key);
        if (val === null) {
            /* noop */
        }
        else if (typeof val === 'object') {
            const child = exports.parse(val, key).join('');
            rules.push(utils_1.wrap(child, key));
        }
        else {
            rule += `${key}:${val || ''};`;
        }
    }
    if (rule.length > 0) {
        rule = /^@/.test(parent) ? utils_1.wrap(rule, '&') : rule;
        rules.unshift(rule);
    }
    return rules;
});
//# sourceMappingURL=parse.js.map