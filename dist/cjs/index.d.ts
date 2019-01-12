import { CSSDeclaration, CSSPropsTree, HashMap } from './types';
export * from './types';
export { uid } from './utils';
export declare type Dress = HashMap<(<T>(...decls: CSSDeclaration<T>[]) => any)>;
export declare type ComponentFactorySource = {
    tag: string;
    render: (props: any) => string[];
    componentId: string;
};
export declare type ComponentFactory = (src: ComponentFactorySource) => any;
declare type Render<T> = T extends object ? (props?: any) => string[] : (props: T) => string[];
export declare function create<D extends Dress>(factory: ComponentFactory, sheet?: {
    insert: (rule: string) => number;
    cssText: () => string;
}): {
    dress: D;
    csx: <T>(...decls: CSSDeclaration<T>[]) => Render<T>;
    keyframes: (decl: CSSPropsTree) => string;
    cssText: () => string;
};
