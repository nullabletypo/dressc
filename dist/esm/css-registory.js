import hash from '@emotion/hash';
import { identity } from './utils';
import parse from './parse';
export class CSSRegistory {
    constructor(options = {}) {
        this.cache = {}; // { template: id }
        this.rules = [];
        this._hasChange = false;
        this._cssText = '';
        this.options = Object.assign(CSSRegistory.defaultOptions(), options);
    }
    get cssText() {
        if (this._hasChange) {
            this._hasChange = false;
            return (this._cssText = this.rules.join(''));
        }
        return this._cssText;
    }
    push(tree, commit) {
        const { prefix, onBeforeParse, onAfterParse } = this.options;
        const template = onAfterParse(parse(onBeforeParse(tree)));
        let id = this.cache[template];
        // push new rule
        if (id === undefined) {
            id = this.cache[template] = prefix + hash(template);
            this.rules.push(commit(CSSRegistory.activate(template, id), id));
            this._hasChange = true;
        }
        return id;
    }
}
CSSRegistory.defaultOptions = () => ({
    prefix: '_',
    onBeforeParse: identity,
    onAfterParse: identity,
});
CSSRegistory.activate = (tepmlate, id) => tepmlate.replace(/&/g, '.' + id);
//# sourceMappingURL=css-registory.js.map