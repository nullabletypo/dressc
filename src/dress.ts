import { identity, wrap } from './utils'
import { CSSTree, CSSRegistory, CSSRegistoryOptions } from './css-registory'

export interface DressOptions extends CSSRegistoryOptions {}

export const wrapKeyframes = (rule: string, id: string) =>
  wrap(`@keyframes ${id}`, rule)

export const dress = (options: Partial<DressOptions> = {}) => {
  const r = new CSSRegistory(options)
  const css = (tree: CSSTree) => r.push(tree, identity)
  const keyframes = (tree: CSSTree) => r.push(tree, wrapKeyframes)
  const extract = () => r.cssText
  return { css, keyframes, extract }
}
