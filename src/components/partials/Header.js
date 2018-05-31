import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadPopup } from '../../actions/popup'
import { logout } from '../../actions/login'
import { seenNotifications } from '../../actions/notification'

import Location from './header/Location'

import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'

const mapStateToProps = state => {
    console.log("Logging the state form HEADER", state.user.user);
    return {
        user : state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        seenNotifications: idUser => dispatch(seenNotifications(idUser)),
        showLoginPopup: () => dispatch(loadPopup('Login')),
        logout: () => dispatch(logout())
    }
}

const Header = ({user, showLoginPopup, logout, seenNotifications}) => (
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
                            <li key='notifications' onClick={() => seenNotifications(user._id)}><Link to='/notifications'>Notifications</Link></li>
                            ,
                            <UncontrolledDropdown nav inNavbar key='account'>
                                <DropdownToggle nav caret>
                                    {user.email}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/account">Account</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        <Link to='' onClick={e => {e.preventDefault(); logout()}}>Logout</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                                {null/*<li class="dropdown" key='dropdown'>
                                <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                                    <span>{user.email}</span>
                                    <i class="caret"></i>
                                </a>
                                <ul class="dropdown-menu">
                                    <li><Link to="/account">Account</Link></li>
                                    <li class="divider"></li>
                                    <li><a href="/logout">Logout</a></li>
                                </ul>
                            </li>*/}
                            </UncontrolledDropdown>
                        ]
                        :
                        <li><a href="#" onClick = {e => {e.preventDefault(); showLoginPopup()}}>Login</a></li>
                    }
                </ul>
            </div>
        </div>
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);