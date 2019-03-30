import { dress, wrapKeyframes } from '../src/dress'
import { CSSRegistory } from '../src/css-registory'
import parse from '../src/parse'
import hash from '@emotion/hash'

const className = (() => {
  const tree = { color: 'red' }
  const template = parse(tree)
  const id = '_' + hash(template)
  const text = CSSRegistory.activate(template, id)
  return { tree, template, id, text }
})()

const kf = (() => {
  const tree = { from: { color: 'red' }, to: { color: 'green' } }
  const template = parse(tree)
  const id = '_' + hash(template)
  const text = CSSRegistory.activate(wrapKeyframes(template, id), id)
  return { tree, template, id, text }
})()

const { css, keyframes, extract } = dress()

test('css', () => {
  const _className = css(className.tree)
  expect(_className).toBe(className.id)
})

test('keyframes', () => {
  const _keyframens = keyframes(kf.tree)
  expect(_keyframens).toBe(kf.id)
})

test('extract', () => {
  expect(extract()).toBe(className.text + kf.text)
})
