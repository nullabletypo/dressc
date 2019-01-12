import { memo, hyph, wrap } from './utils';
export const parse = memo((tree, parent = '@') => {
    const rules = [];
    let rule = '';
    for (let key in tree) {
        const val = tree[key];
        key = hyph(key);
        if (val === null) {
            /* noop */
        }
        else if (typeof val === 'object') {
            const child = parse(val, key).join('');
            rules.push(wrap(child, key));
        }
        else {
            rule += `${key}:${val || ''};`;
        }
    }
    if (rule.length > 0) {
        rule = /^@/.test(parent) ? wrap(rule, '&') : rule;
        rules.unshift(rule);
    }
    return rules;
});
//# sourceMappingURL=parse.js.map