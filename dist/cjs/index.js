"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stylesheet_1 = require("./stylesheet");
const parse_1 = require("./parse");
const utils_1 = require("./utils");
var utils_2 = require("./utils");
exports.uid = utils_2.uid;
function create(factory, sheet = stylesheet_1.stylesheet()) {
    const _patch = (prerule) => {
        const id = utils_1.uid('dress');
        const rule = prerule.replace(/&/g, '.' + id);
        sheet.insert(rule);
        return id;
    };
    const patch = utils_1.arity(1, utils_1.memo(_patch));
    const csx = (...decls) => ((props) => {
        const rules = decls.map(x => (typeof x === 'function' ? x(props) : x));
        const tree = utils_1.assign.apply(null, rules);
        return parse_1.parse(tree).map(patch);
    });
    const dress = new Proxy({}, {
        get: (_, tag) => (...decls) => {
            return factory({ tag, render: csx(...decls), componentId: utils_1.uid('dress') });
        },
    });
    const keyframes = utils_1.memo((decl) => {
        const id = utils_1.uid('dress');
        sheet.insert(utils_1.wrap(parse_1.parse(decl).join(''), `@keyframes ${id}`));
        return id;
    });
    return { dress, csx, keyframes, cssText: sheet.cssText };
}
exports.create = create;
//# sourceMappingURL=index.js.map