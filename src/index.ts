import { compile as _compile } from './compile'
import hash from '@emotion/hash'

export interface DressOptions {
  prefix: string
  compile: (id: string, template: string) => string
}

export default (option: Partial<DressOptions> = {}) => {
  const compile = option.compile || _compile
  const prefix = option.prefix || 'dress'
  const cache: { [key: string]: string } = {} // {template: id}
  let cssText = ''

  const css = (strings: TemplateStringsArray, ...values: any[]) => {
    const template = String.raw(strings, ...values)
    let id = cache[template]
    if (id === undefined) {
      id = cache[template] = prefix + '-' + hash(template)
      cssText += compile('.' + id, template)
    }
    return id
  }

  const keyframes = (string: TemplateStringsArray, ...values: any[]) => {
    const template = String.raw(string, ...values)
    let id = cache[template]
    if (id === undefined) {
      id = cache[template] = prefix + '-' + hash(template)
      cssText += `@keyframes ${id}{${template.replace(/\s+/g, ' ')}}`
    }
    return id
  }

  const extract = () => cssText

  return { css, keyframes, extract }
}
