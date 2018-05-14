import React from 'react'
import { render } from 'react-dom'
import App from './App'
import Main from './Main'

const root = document.createElement('div')
document.body.appendChild(root)

render(<Main />, root)
