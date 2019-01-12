import { CSSDeclaration, CSSPropsTree, HashMap } from './types'
import { stylesheet } from './stylesheet'
import { parse } from './parse'
import { uid, arity, memo, wrap, assign } from './utils'

export * from './types'

export { uid } from './utils'

export type Dress = HashMap<(<T>(...decls: CSSDeclaration<T>[]) => any)>

export type ComponentFactorySource = {
  tag: string
  render: (props: any) => string[]
  componentId: string
}

export type ComponentFactory = (src: ComponentFactorySource) => any

type Render<T> = T extends object
  ? (props?: any) => string[]
  : (props: T) => string[]

export function create<D extends Dress>(
  factory: ComponentFactory,
  sheet = stylesheet(),
) {
  const _patch = (prerule: string) => {
    const id = uid('dress')
    const rule = prerule.replace(/&/g, '.' + id)
    sheet.insert(rule)
    return id
  }

  const patch = arity(1, memo(_patch))

  const csx = <T>(...decls: CSSDeclaration<T>[]) =>
    ((props: T) => {
      const rules = decls.map(x => (typeof x === 'function' ? x(props) : x))
      const tree = assign.apply(null, rules)
      return parse(tree).map(patch)
    }) as Render<T>

  const dress = new Proxy<D>({} as D, {
    get: (_, tag: string) => <T>(...decls: CSSDeclaration<T>[]) => {
      return factory({ tag, render: csx(...decls), componentId: uid('dress') })
    },
  })

  const keyframes = memo((decl: CSSPropsTree) => {
    const id = uid('dress')
    sheet.insert(wrap(parse(decl).join(''), `@keyframes ${id}`))
    return id
  })

  return { dress, csx, keyframes, cssText: sheet.cssText }
}
