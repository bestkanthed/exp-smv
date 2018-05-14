import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import Layout from './components/Layout'

import store from './store'

import './styles/css/main.scss'

store.subscribe(() =>{
    console.log(store.getState())
});

let Main = () => 
    <Provider store = {store}>
        <Router>
            <Layout>
                <h1>Let's get this done today!</h1>
            </Layout>
        </Router>
    </Provider>

export default hot(module)(Main)