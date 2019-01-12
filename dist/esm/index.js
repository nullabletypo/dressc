import { stylesheet } from './stylesheet';
import { parse } from './parse';
import { uid, arity, memo, wrap, assign } from './utils';
export { uid } from './utils';
export function create(factory, sheet = stylesheet()) {
    const _patch = (prerule) => {
        const id = uid('dress');
        const rule = prerule.replace(/&/g, '.' + id);
        sheet.insert(rule);
        return id;
    };
    const patch = arity(1, memo(_patch));
    const csx = (...decls) => ((props) => {
        const rules = decls.map(x => (typeof x === 'function' ? x(props) : x));
        const tree = assign.apply(null, rules);
        return parse(tree).map(patch);
    });
    const dress = new Proxy({}, {
        get: (_, tag) => (...decls) => {
            return factory({ tag, render: csx(...decls), componentId: uid('dress') });
        },
    });
    const keyframes = memo((decl) => {
        const id = uid('dress');
        sheet.insert(wrap(parse(decl).join(''), `@keyframes ${id}`));
        return id;
    });
    return { dress, csx, keyframes, cssText: sheet.cssText };
}
//# sourceMappingURL=index.js.map