import * as React from 'react'
import { render } from 'react-dom'
import dress from '../src/index'

const { css, extract, keyframes } = dress()

const text = css`
  color: red;
  text-align: center;
`

const effect = keyframes`
  ${0}% {
    opacity: 0;
  }
  ${100}% {
    opacity: 1;
  }
`

const container = css`
  animation: ${effect} 1000ms;
  background: pink;
  width: 300px;
  height: 100px;
  &:hover {
    background: green;
  }
  &:hover > .${text} {
    font-weight: bold;
  }
  /* comment */
  @media screen and (min-width: 500px) {
    background: yellow;
    &:hover {
      border: 2px solid tomato;
    }
  }
`

export const App = () => (
  <React.Fragment>
    <style>{extract()}</style>
    <div className={container}>
      <p className={text}>hello world</p>
    </div>
  </React.Fragment>
)

render(<App />, document.getElementById('root'))
