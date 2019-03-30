import { hyph, wrap, pair } from './utils';
export default function parse(tree, parent = '@') {
    const rules = [];
    let rule = '';
    for (let k in tree) {
        const v = tree[k];
        k = hyph(k);
        if (v == null) {
            /* noop */
        }
        else if (typeof v === 'object') {
            rules.push(wrap(k, parse(v, k)));
        }
        else {
            rule += pair(k, v);
        }
    }
    if (rule.length > 0) {
        rules.unshift(/^@/.test(parent) ? wrap('&', rule) : rule);
    }
    return rules.join('');
}
//# sourceMappingURL=parse.js.map