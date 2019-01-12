import * as React from 'react'
import { render } from 'react-dom'
import { dress } from './dress-react'

const Text = dress.p((props: { color: string }) => ({
  color: props.color,
  textAlign: 'center',
}))

const Container = dress.div({
  background: 'pink',
  width: '300px',
  height: '100px',
  '&:hover': {
    background: '#f8f8f8',
  },
  '@media (max-width: 500px)': {
    '&:hover': {
      background: 'purple',
    },
    [`&>${Text}:hover`]: {
      fontWeight: 'bold',
      color: 'black',
    },
  },
})

const _colors = ['green', 'red', 'yellow', 'white']
const getColor = ((index: number) => {
  return function gen(colors = _colors): string {
    const i = Math.floor(Math.random() * colors.length)
    return i === index ? gen(colors) : colors[(index = i)]
  }
})(0)

const el = document.getElementById('root')

export const App = () => (
  <Container className="hello world" onClick={() => render(<App />, el)}>
    <Text color={getColor()}>hello world A</Text>
    <Text color={getColor()}>hello world B</Text>
    <Text color={getColor()}>hello world C</Text>
  </Container>
)

render(<App />, el)
