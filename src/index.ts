import hash from '@emotion/hash'
import { compile } from './compile'

export interface DressOptions {
  prefix: string
  compile: (id: string, template: string) => string
}

export default (option: Partial<DressOptions> = {}) => {
  const compiler = option.compile || compile
  const prefix = option.prefix || 'dress'
  const cache: { [key: string]: string } = {} // {template: id}
  let cssText = ''

  const css = (strings: TemplateStringsArray, ...values: any[]) => {
    const template = String.raw(strings, ...values)
    let id = cache[template]
    if (id === undefined) {
      id = cache[template] = prefix + '-' + hash(template)
      cssText += compiler('.' + id, template)
    }
    return id
  }

  const keyframes = (strings: TemplateStringsArray, ...values: any[]) => {
    const template = String.raw(strings, ...values)
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
