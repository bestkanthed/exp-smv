import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import store from './store'

import Layout from './components/Layout'

import './styles/css/main.scss'

import Home from './routes/Home'
import Authorize from './routes/Authorize'
import Unauthorized from './routes/Unauthorized'

store.subscribe(() =>{
    console.log(store.getState())
});

let Main = () => 
    <Provider store = {store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/unauthorized' component={Unauthorized} team='admin'/>
                    <Route exact path='/admin' render={() => <Authorize team='admin' page='main'/>}/>
                    <Route path='/admin/:id' render={props => <Authorize {...props} team='admin' page='profile'/>}/>
                </Switch>
            </Layout>
        </Router>
    </Provider>

export default hot(module)(Main)