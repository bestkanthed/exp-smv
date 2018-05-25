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
  
  let { user, team, page, match } = props
  if (!user.user || user.user.teams.indexOf(team) === -1) return <Redirect to='/unauthorized' />

  switch (team) {
    
    case 'admin': {
      switch (page) { 
        case 'teams': return <Teams />
        case 'profile': return <Profile idUser={match.params.id}/>
        default: return <div> Invalid Page </div>
      }
    }

    case 'expert': {
      switch (page) { 
        case 'orders': return <Orders />
        case 'order': return <Order idOrder={match.params.id}/>
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

    default: return <div> Invalid team </div>
  }
}

const mapStateToProp = state => ({
  user: state.user
})

const mapDispatchToProp = dispatch => ({
  user: state.user
})

class Authorize extends React.Component {
  render() {
    console.log('Logging props from Autorize', this.props)
    return this.props.user.user ? renderRoute(this.props) : <div> Unauthorized </div>
  }
}

export default connect(mapStateToProp)(Authorize)