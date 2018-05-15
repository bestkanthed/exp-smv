import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'

import Location from './header/Location'
import { batchActions } from '../../actions/utilities'

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
                <NavLink to="/" class="navbar-brand"><img src="/images/smv_logo.png" width="180"/></NavLink>
                <NavLink to="/test" class="navbar-brand"><img src="/images/smv_logo.png" width="180"/></NavLink>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    {
                        user ?
                        [
                            user.teams.map(role =>
                                <li key={role}><NavLink to={'/'+role}>{role}</NavLink></li>
                            )
                            ,
                            <li class="dropdown" key='dropdown'>
                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                    <span>{user.email}</span>
                                    <i class="caret"></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><NavLink to="/account">Account</NavLink></li>
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