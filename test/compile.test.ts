import { compile as _compile } from '../src/compile'

const css = String.raw

const compile = _compile.bind(null, '#id')

test('compile 1', () => {
  const sample = css`
    color: red;
  `
  const result = '#id{color: red;}'
  expect(compile(sample)).toBe(result)
})

test('compile 2', () => {
  const sample = css`
    &:hover {
      color: red;
    }
  `
  const result = '#id:hover {color: red;}'
  expect(compile(sample)).toBe(result)
})

test('compile 3', () => {
  const sample = css`
    /* comment */
  `
  const result = '/* comment */'
  expect(compile(sample)).toBe(result)
})

test('compile 4', () => {
  const sample = css`
    @media screen {
      color: red;
    }
  `
  const result = '@media screen {#id{color: red;}}'
  expect(compile(sample)).toBe(result)
})
test('compile 4', () => {
  const sample = css`
    @media screen {
      color: red;
    }
    color: blue;
  `
  const result = '@media screen {#id{color: red;}}#id{color: blue;}'
  expect(compile(sample)).toBe(result)
})

test('compile 6', () => {
  const sample = css`
    color: green;
    &:hover {
      color: red;
    }
    /*
    comment
     */
    @media screen {
      color: red;
      &:hover {
        color: red;
      }
    }
  `
  const result =
    '#id{color: green;}#id:hover {color: red;}/*comment*/@media screen {#id{color: red;}#id:hover {color: red;}}'
  expect(compile(sample)).toBe(result)
})

test('compile 7', () => {
  const sample = `color: green;&:hover {color: red;}/*comment*/@media screen {color: red;&:hover {color: red;}}
  `
  const result =
    '#id{color: green;}#id:hover {color: red;}/*comment*/@media screen {#id{color: red;}#id:hover {color: red;}}'
  expect(compile(sample)).toBe(result)
})
