import React from 'react';
import { Link } from 'react-router-dom';

import { showPopupFrame } from '../../actions/popup';

import Location from './header/Location'

const mapStateToProps = state => {
    return {
        user : state.user.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showLoginPopup: event => {
            e.preventDefault();
            dispatch();
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
                            user.teams.map(role =>
                                <li><Link to={'/'+role} key={role}>{role}</Link></li>
                            )
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
                    <Location />
                </ul>
            </div>
        </div>
    </div>
);

export default Header;