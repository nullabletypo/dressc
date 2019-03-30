import * as React from 'react'
import { render } from 'react-dom'
import dress from '../src/index'

const { css, extract } = dress()

const text = css({
  color: 'red',
  textAlign: 'center',
})

const container = css({
  background: 'pink',
  width: '300px',
  height: '100px',
  '&:hover': {
    background: 'green',
  },
  [`&:hover > .${text}`]: {
    fontWeight: 'bold',
  },
  '@media (min-width: 500px)': {
    background: 'yellow',
    '&:hover': {
      border: '2px solid tomato',
    },
  },
})

export const App = () => (
  <React.Fragment>
    <style>{extract()}</style>
    <div className={container}>
      <p className={text}>hello world</p>
    </div>
  </React.Fragment>
)

render(<App />, document.getElementById('root'))
