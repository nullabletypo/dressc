import { HashMap } from './types'

export const memo = <F extends (...arg: any) => any>(func: F) => {
  const cache: HashMap<any> = {}
  return (...args: Parameters<F>): ReturnType<F> => {
    const key = JSON.stringify(args)
    return (cache[key] = cache[key] || func.apply(func, args))
  }
}

export const arity = <F extends (...args: any[]) => any>(n: number, f: F) => {
  return (...args: Parameters<F>): ReturnType<F> => f.apply(f, args.slice(0, n))
}

export const uid = ((i: number) => (...symbol: string[]) => {
  return ['_', (i++).toString(36), ...symbol].join('_')
})(0)

export const hyph = (str: string) => {
  return str.replace(/[A-Z]/g, '-$&').toLowerCase()
}

export const wrap = (body: string, ...path: string[]) => {
  return path.reduceRight((acc, key) => `${key}{${acc}}`, body)
}

export const assign = <T extends object>(...obj: T[]) => {
  return Object.assign({}, ...obj)
}
