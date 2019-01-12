import * as CSS from 'csstype'

export interface HashMap<T> {
  [key: string]: T
}

export interface StaticCSSProps extends CSS.Properties, CSS.PropertiesHyphen {
  /*  */
}

export type CSSPropsTree =
  | StaticCSSProps
  | HashMap<StaticCSSProps>
  | HashMap<HashMap<StaticCSSProps>>

export type DynamicCSSPropsTree<T> = (props: T) => CSSPropsTree

export type CSSDeclaration<T> = CSSPropsTree | DynamicCSSPropsTree<T>
