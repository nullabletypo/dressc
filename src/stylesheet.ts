export const stylesheet = () => {
  const rules: string[] = []
  let insert = (rule: string) => rules.push(rule)
  const cssText = () => rules.join('')

  if (typeof window === 'object') {
    const style = document.createElement('style')
    style.setAttribute('type', 'text/css')
    style.setAttribute('data-dress', '')
    document.head!.appendChild(style)
    const sheet = style.sheet as CSSStyleSheet
    // replace insert
    insert = (rule: string) => {
      rules.push(rule)
      return sheet.insertRule(rule, sheet.cssRules.length)
    }
  }
  return { insert, cssText }
}
