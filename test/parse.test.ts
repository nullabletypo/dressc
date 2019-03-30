import parse from '../src/parse'

describe('parse', () => {
  test('simple', () => {
    const tree = { background: 'red', color: 'blue' }
    expect(parse(tree)).toBe('&{background:red;color:blue;}')
  })

  test('with pseudos', () => {
    const tree = { color: 'red', '&:hover': { color: 'green' } }
    const expected = '&{color:red;}&:hover{color:green;}'
    expect(parse(tree)).toBe(expected)
  })

  test('with media query', () => {
    const tree = {
      color: 'red',
      '@media (max-width: 300px)': {
        color: 'blue',
        '&:hover': { color: 'green' },
      },
    }
    const a = '&{color:red;}'
    const b = '&{color:blue;}&:hover{color:green;}'
    const c = `@media (max-width: 300px){${b}}`
    const expected = a + c
    expect(parse(tree)).toBe(expected)
  })
})
