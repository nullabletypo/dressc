import dress from '../src/index'
import hash from '@emotion/hash'

const className = (() => {
  const template = `color:red;`
  const id = 'dress-' + hash(template)
  const text = `.${id}{color:red;}`
  return { id, text, template }
})()

const kf = (() => {
  const template = `from{opacity: 0;} to{opacity: 1;}`
  const id = 'dress-' + hash(template)
  const text = `@keyframes ${id}{${template}}`
  return { template, id, text }
})()

const { css, keyframes, extract } = dress()

test('css', () => {
  const _className = css`${className.template}` // prettier-ignore
  expect(_className).toBe(className.id)
})

test('keyframes', () => {
  const _keyframens = keyframes`${kf.template}`
  expect(_keyframens).toBe(kf.id)
})

test('extract', () => {
  expect(extract()).toBe(className.text + kf.text)
})
