import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

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
                    <Route path='/unauthorized' component={Unauthorized} />
                    
                    <Route exact path='/admin' render={() => <Redirect to='/admin/teams'/>}/>
                    <Route exact path='/admin/teams' render={() => <Authorize teams={['admin']} page='teams'/>}/>
                    <Route exact path='/admin/profile/:id' render={props => <Authorize {...props} teams={['admin']} page='profile'/>}/>
                
                    <Route exact path='/expert' render={() => <Redirect to='/expert/orders'/>}/>
                    <Route exact path='/expert/orders' render={props => <Authorize {...props} teams={['expert', 'support']} page='orders'/>}/>           
                    <Route exact path='/expert/orders/:id' render={props => <Authorize {...props} teams={['expert', 'support']} page='order'/>}/>     
                    <Route exact path='/expert/applications/:id' render={props => <Authorize {...props} teams={['expert', 'support']} page='application'/>}/>
                    <Route exact path='/expert/documents/:id' render={props => <Authorize {...props} teams={['expert', 'support']} page='document'/>}/>

                    <Route exact path='/support' render={() => <Redirect to='/support/generate'/>}/>
                    <Route exact path='/support/generate' render={() => <Authorize teams={['support']} page='generate'/>}/>
                </Switch>
            </Layout>
        </Router>
    </Provider>

export default hot(module)(Main)