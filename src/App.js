import React from 'react'
import { hot } from 'react-hot-loader'
import FormControl from 'react-bootstrap/lib/FormControl'

class App extends React.Component {
  render() {
    return (
      <h1>
        Pure Awesome ?<br />
        <FormControl inputRef={console.log} defaultValue="Pure Awesome" />
      </h1>
    )
  }
}

export default hot(module)(App)
