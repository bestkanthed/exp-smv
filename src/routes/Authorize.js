import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Teams from './Admin/Teams'
import Profile from './Admin/Profile'

import Orders from './Expert/Orders'
import Order from './Expert/Order'
import Application from './Expert/Application'
import Document from './Expert/Document'

import Generate from './Support/Generate'

function renderRoute (props) {
  
  let { user, teams, page, match, location } = props
  if (!user.user) return <Redirect to='/unauthorized' />
  
  let authorize = false;
  for (let team of teams) {
    console.log('Checking teams for user', user.user.name, team, user.user.teams)
    if (user.user.teams.indexOf(team) !== -1) authorize = true
  }
  if(!authorize) return <Redirect to='/unauthorized' />
  
  switch (teams[0]) {
    
    case 'admin': {
      switch (page) { 
        case 'teams': return <Teams />
        case 'profile': return <Profile idUser={match.params.id}/>
        default: return <div> Invalid Page </div>
      }
    }

    case 'expert': {
      switch (page) { 
        case 'orders': return <Orders idExpert={user.user.teams.indexOf('support') !== -1 ? location.search ? location.search.substring(location.search.indexOf('=')+1) : null : null}/>
        case 'order': return <Order idOrder={match.params.id} supportView = {user.user.teams.indexOf('support') !== -1 ? location.search.indexOf('supportView=true') !== -1 ? true : false : false}/>
        case 'application': return <Application idApplication={match.params.id}/>
        case 'document': return <Document idDocument={match.params.id}/>
        default: return <div> Invalid Page </div>
      }
    }

    case 'support': {
      switch (page) { 
        case 'generate': return <Generate />
        default: return <div> Invalid Page </div>
      }
    }

    case 'customer': {
      switch (page) {
        case 'orders': return <Orders idCustomer={user.user._id}/>
        case 'order': return <Order idOrder={match.params.id} idCustomer={user.user._id}/>
        case 'application': return <Application idApplication={match.params.id} idCustomer={user.user._id}/>
        case 'document': return <Document idDocument={match.params.id} idCustomer={user.user._id}/>
        default: return <div> Invalid Page </div>
      }
    }

    default: return <div> Invalid team </div>
  }
}

const mapStateToProp = state => ({
  user: state.user
})

class Authorize extends React.Component {
  render() {
    console.log('Logging props from Autorize', this.props)
    return this.props.user.user ? renderRoute(this.props) : <div> Unauthorized </div>
  }
}

export default connect(mapStateToProp)(Authorize)