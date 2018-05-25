import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'

import Location from './header/Location'

const mapStateToProps = state => {
    console.log("Logging the state form HEADER", state.user.user);
    return {
        user : state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoginPopup: event => {
            event.preventDefault()
            dispatch(loadPopup('Login'))
        }
    }
}

const Header = ({user, showLoginPopup}) => (
    <div class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" data-toggle="collapse" data-target=".navbar-collapse" class="navbar-toggle"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
                <Link to="/" class="navbar-brand"><img src="/images/smv_logo.png" width="180"/></Link>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    {
                        user ?
                        [
                            user.teams ?
                            user.teams.map(role =>
                                <li key={role}><Link to={'/'+role}>{role}</Link></li>
                            ) :
                            null
                            ,
                            <li class="dropdown" key='dropdown'>
                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                    <span>{user.email}</span>
                                    <i class="caret"></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link to="/account">Account</Link></li>
                                    <li class="divider"></li>
                                    <li><a href="/logout">Logout</a></li>
                                </ul>
                            </li>
                        ]
                        :
                        <li><a href="#" onClick = {showLoginPopup}>Login</a></li>
                    }
                </ul>
            </div>
        </div>
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);