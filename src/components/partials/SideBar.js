import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
    import { loadPopup } from '../../actions/popup'
import { logout } from '../../actions/login'
import { seenNotifications } from '../../actions/notification'

import Location from './header/Location'

import { UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap'

import './partials.scss';

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

const SideBar = ({user, showLoginPopup, logout, seenNotifications}) => (
        <div class='side-bar'>
            {
                
                user ?
                [
                    user.teams ?
                    user.teams.map(role =>
                        <div class='side-bar-content'key={role}><Link style={{textDecoration:'none', color:'black'}} to={'/'+role}>{role==='admin'? 'Admin' : (role==='support' ? 'Support': 'Visa Expert')}</Link></div>
                    ) :
                    null
                    ,
                    <div class='side-bar-content' key='past-applications' onClick={() => seenNotifications(user._id)}><Link style={{textDecoration:'none', color:'black'}} to='/notifications'>Past Applications</Link></div>
                    ,
                    <div class='side-bar-content' key='notifications' onClick={() => seenNotifications(user._id)}><Link style={{textDecoration:'none', color:'black'}} to='/notifications'>Notifications</Link></div>
                    ]
                :
                <div>oops</div>
            }
            <div class='side-bar-content' onClick= {e=>{e.preventDefault; showLoginPopup()}}>Login</div>
            <div class='side-bar-logout-option' onClick = {e => {e.preventDefault(); logout(); window.location.href='/'}}><Link style={{textDecoration:'none', color:'black'}} to='/'>Log Out</Link></div>
        </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);