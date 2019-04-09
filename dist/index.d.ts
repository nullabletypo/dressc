export interface DressOptions {
    prefix: string;
    compile: (id: string, template: string) => string;
}
declare const _default: (option?: Partial<DressOptions>) => {
    css: (strings: TemplateStringsArray, ...values: any[]) => string;
    keyframes: (string: TemplateStringsArray, ...values: any[]) => string;
    extract: () => string;
};
export default _default;
