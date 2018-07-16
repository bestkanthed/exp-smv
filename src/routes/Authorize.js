import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Login from './Login'

import Teams from './Admin/Teams'
import Profile from './Admin/Profile'

import Orders from './Expert/Orders'
import Order from './Expert/Order'
import Application from './Expert/Application'
import Document from './Expert/Document'

import Generate from './Support/Generate'
import News from './Support/News'

import { setQuery } from '../actions/expert'
import { hidePopupDone } from '../actions/popup'

function renderRoute (props) {

  let { user, teams, page, match, location, setQuery, hidePopupDone, popup } = props
  if (
    popup.display &&
    popup.content !== 'ChangePassword' &&
    popup.content !== 'CreateCustomerCumOrder' &&
    popup.content !== 'UploadDocument' &&
    popup.content !== 'ProcessOrder' &&
    popup.content !== 'GetStarted'
  ) hidePopupDone()
  if (!user.user) return <Redirect to='/unauthorized' />
  
  if(page === 'home') {
    if (user.user.teams.indexOf('customer') !== -1) return <Redirect to='/customer' />
    if (user.user.teams.indexOf('expert') !== -1) return <Redirect to='/expert' />
    if (user.user.teams.indexOf('support') !== -1) return <Redirect to='/support' />
    if (user.user.teams.indexOf('admin') !== -1) return <Redirect to='/admin' />
  }

  let authorize = false;
  for (let team of teams) {
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
        case 'orders': {
          user.user.teams.indexOf('support') !== -1 ? location.search ? setQuery({idExpert : location.search.substring(location.search.indexOf('=')+1)}) : setQuery({idExpert : null}) : setQuery({idExpert : null})
          return <Orders idExpert={user.user.teams.indexOf('support') !== -1 ? location.search ? location.search.substring(location.search.indexOf('=')+1) : null : null}/>
        }
        case 'order': return <Order idOrder={match.params.id} supportView = {user.user.teams.indexOf('support') !== -1 ? location.search.indexOf('supportView=true') !== -1 ? true : false : false}/>
        case 'application': return <Application idApplication={match.params.id}/>
        case 'document': return <Document idDocument={match.params.id}/>
        default: return <div> Invalid Page </div>
      }
    }

    case 'support': {
      switch (page) { 
        case 'generate': return <Generate />
        case 'new': return <News />
        default: return <div> Invalid Page </div>
      }
    }

    case 'customer': {
      switch (page) {
        case 'orders': {
          user.user.teams.indexOf('support') !== -1 ? location.search ? setQuery({idCustomer : location.search.substring(location.search.indexOf('=')+1)}) : setQuery({idCustomer : null}) : setQuery({idCustomer : null})          
          return <Orders idCustomer={user.user._id}/>
        }
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
  user: state.user,
  popup: state.popup
})

const mapDispatchToProp = dispatch => ({
  setQuery: query => dispatch(setQuery(query)),
  hidePopupDone: () => dispatch(hidePopupDone())
})

class Authorize extends React.Component {
  render() {
    return this.props.user.user ? renderRoute(this.props) : <Login />
  }
}

export default connect(mapStateToProp, mapDispatchToProp)(Authorize)