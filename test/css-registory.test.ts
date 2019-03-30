import parse from '../src/parse'
import { CSSRegistory } from '../src/css-registory'
import { identity } from '../src/utils'
import hash from '@emotion/hash'

test('static activate', () => {
  const actual = CSSRegistory.activate(parse({ color: 'red' }), 'test')
  const expected = '.test{color:red;}'
  expect(actual).toBe(expected)
})

test('static defaultOptions', () => {
  const opts = CSSRegistory.defaultOptions()
  expect(opts.prefix).toBe('_')
  expect(typeof opts.onBeforeParse).toBe('function')
  expect(typeof opts.onAfterParse).toBe('function')
})

const tree = { color: 'red' }
const template = parse(tree)
const id = hash(template)

describe('push', () => {
  const r = new CSSRegistory()

  test('initial state', () => {
    expect(r.rules.length).toBe(0)
    expect(Object.keys(r.cache).length).toBe(0)
    expect(r._hasChange).toBe(false)
  })

  test('first push', () => {
    const className = r.push(tree, identity)
    expect(className).toBe('_' + id)
    expect(r.rules.length).toBe(1)
    expect(Object.keys(r.cache).length).toBe(1)
    expect(r.cache[template]).toBe('_' + id)
    expect(r._hasChange).toBe(true)
  })

  test('when same tree is pushed', () => {
    r.push(tree, identity)
    expect(r.rules.length).toBe(1)
    expect(Object.keys(r.cache).length).toBe(1)
    expect(r.cache[template]).toBe('_' + id)
    expect(r._hasChange).toBe(true)
  })

  test('when other tree is pushed', () => {
    r.push({ color: 'green' }, identity)
    expect(r.rules.length).toBe(2)
  })
})

describe('cssText', () => {
  const r = new CSSRegistory()

  test('initial state', () => {
    expect(r.cssText).toBe('')
    expect(r._hasChange).toBe(false)
  })

  test('when tree is pushed', () => {
    r.push(tree, identity)
    expect(r.cssText).toBe(`._${id}{color:red;}`)
    expect(r._hasChange).toBe(false)
  })
})
