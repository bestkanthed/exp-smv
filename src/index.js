import React from 'react'
import { render } from 'react-dom'
import Main from './Main'
//import 'bootstrap/dist/css/bootstrap.css'

const root = document.createElement('div')
document.body.appendChild(root)

render(<Main />, root)