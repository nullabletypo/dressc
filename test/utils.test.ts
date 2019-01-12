import * as u from '../src/utils'

test('memo', () => {
  const memoized = u.memo((a: number, b: number) => [a, b])
  expect(memoized(1, 2)).toBe(memoized(1, 2))
  expect(memoized(1, 2)).not.toBe(memoized(2, 1))
})

test('arity', () => {
  const calc = (...nums: number[]) => nums.reduce((acc, i) => acc + i, 0)
  const func = u.arity(2, calc)
  expect(func(1, 1, 1)).toBe(2)
})

test('uid', () => {
  expect(u.uid()).not.toBe(u.uid())
  expect(u.uid('a', 'b')).not.toBe(u.uid('a', 'b'))
})

test('hyph', () => {
  expect(u.hyph('helloWorld')).toBe('hello-world')
})

test('wrap', () => {
  expect(u.wrap('key:val', 'host')).toBe('host{key:val}')
})

test('assign', () => {
  const obj = { a: 1, b: 2 }
  expect(u.assign(obj, { a: 3 })).toEqual({ a: 3, b: 2 })
  expect(obj).toEqual({ a: 1, b: 2 })
})
