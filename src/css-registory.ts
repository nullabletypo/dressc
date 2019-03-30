import * as CSS from 'csstype'
import hash from '@emotion/hash'
import { HashMap, identity } from './utils'
import parse from './parse'

export interface StaticCSSProps extends CSS.Properties, CSS.PropertiesHyphen {
  /*  */
}

export type CSSTree =
  | StaticCSSProps
  | HashMap<StaticCSSProps>
  | HashMap<HashMap<StaticCSSProps>>

export type CSSRegistoryOptions = {
  prefix: string
  onBeforeParse: (tree: CSSTree) => CSSTree
  onAfterParse: (cssText: string) => string
}

export class CSSRegistory {
  options: CSSRegistoryOptions
  cache: HashMap<string> = {} // { template: id }
  rules: string[] = []
  _hasChange = false
  _cssText = ''

  constructor(options: Partial<CSSRegistoryOptions> = {}) {
    this.options = Object.assign(CSSRegistory.defaultOptions(), options)
  }

  get cssText() {
    if (this._hasChange) {
      this._hasChange = false
      return (this._cssText = this.rules.join(''))
    }
    return this._cssText
  }

  push(tree: CSSTree, commit: (rule: string, id: string) => string) {
    const { prefix, onBeforeParse, onAfterParse } = this.options
    const template = onAfterParse(parse(onBeforeParse(tree)))
    let id = this.cache[template]
    // push new rule
    if (id === undefined) {
      id = this.cache[template] = prefix + hash(template)
      this.rules.push(commit(CSSRegistory.activate(template, id), id))
      this._hasChange = true
    }
    return id
  }

  static defaultOptions = (): CSSRegistoryOptions => ({
    prefix: '_',
    onBeforeParse: identity,
    onAfterParse: identity,
  })

  static activate = (tepmlate: string, id: string) =>
    tepmlate.replace(/&/g, '.' + id)
}
