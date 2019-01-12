export const stylesheet = () => {
    const rules = [];
    let insert = (rule) => rules.push(rule);
    const cssText = () => rules.join('');
    if (typeof window === 'object') {
        const style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        style.setAttribute('data-dress', '');
        document.head.appendChild(style);
        const sheet = style.sheet;
        // replace insert
        insert = (rule) => {
            rules.push(rule);
            return sheet.insertRule(rule, sheet.cssRules.length);
        };
    }
    return { insert, cssText };
};
//# sourceMappingURL=stylesheet.js.map