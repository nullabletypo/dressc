import * as u from '../src/utils'

test('hyph', () => {
  expect(u.hyph('helloWorld')).toBe('hello-world')
})

test('pair', () => {
  expect(u.pair('color', 'red')).toBe('color:red;')
})

test('wrap', () => {
  expect(u.wrap('host', 'key:val')).toBe('host{key:val}')
})

test('identity', () => {
  expect(u.identity(1, 1)).toBe(1)
})
