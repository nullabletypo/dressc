import { stylesheet } from '../src/stylesheet'

test('stylesheet', () => {
  const sheet = stylesheet()
  const rule = 'body: {color: red;}'
  const rule2 = 'body: {color: yellow;}'
  expect(document.querySelector('[data-dress]')).toBeInstanceOf(HTMLStyleElement)
  expect(sheet.insert(rule)).toBe(0)
  expect(sheet.insert(rule2)).toBe(1)
  expect(sheet.cssText()).toEqual(rule + rule2)
})

