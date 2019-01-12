import * as CSS from 'csstype';
export interface HashMap<T> {
    [key: string]: T;
}
export interface StaticCSSProps extends CSS.Properties, CSS.PropertiesHyphen {
}
export declare type CSSPropsTree = StaticCSSProps | HashMap<StaticCSSProps> | HashMap<HashMap<StaticCSSProps>>;
export declare type DynamicCSSPropsTree<T> = (props: T) => CSSPropsTree;
export declare type CSSDeclaration<T> = CSSPropsTree | DynamicCSSPropsTree<T>;
