"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = __importDefault(require("@emotion/hash"));
const utils_1 = require("./utils");
const parse_1 = __importDefault(require("./parse"));
class CSSRegistory {
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
        const template = onAfterParse(parse_1.default(onBeforeParse(tree)));
        let id = this.cache[template];
        // push new rule
        if (id === undefined) {
            id = this.cache[template] = prefix + hash_1.default(template);
            this.rules.push(commit(CSSRegistory.activate(template, id), id));
            this._hasChange = true;
        }
        return id;
    }
}
CSSRegistory.defaultOptions = () => ({
    prefix: '_',
    onBeforeParse: utils_1.identity,
    onAfterParse: utils_1.identity,
});
CSSRegistory.activate = (tepmlate, id) => tepmlate.replace(/&/g, '.' + id);
exports.CSSRegistory = CSSRegistory;
//# sourceMappingURL=css-registory.js.map