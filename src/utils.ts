export interface HashMap<T = any> {
  [key: string]: T
}

export const identity = <T>(v: T, ..._: any[]) => v

export const hyph = (s: string) => s.replace(/[A-Z]/g, '-$&').toLowerCase()

export const pair = (k: string, v: any) => `${k}:${v};`

export const wrap = (k: string, v: string) => `${k}{${v}}`
