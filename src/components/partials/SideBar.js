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
                        <Link style={{textDecoration:'none', color:'black'}} to={'/'+role}>
                        <div class='side-bar-content' key={role}>
                        <img class='col-lg-3 fix-image' src={role==='support' ? '../../../images/ic/person/grey600.png':'../../../images/ic/home/grey600.png'}/>
                        <span class='col-lg-9'>{role}</span>
                        </div>
                        </Link>
                    ) :
                    null
                    ,
                        <Link style={{textDecoration:'none', color:'black'}} to='/notifications'>
                    <div class='side-bar-content' key='past-applications' onClick={() => {seenNotifications(user._id);}}>
                        <img class='col-lg-3 fix-image' src='../../../images/ic/hourglass_empty/grey600.png' />
                        <span class='col-lg-9'>Notifications</span>
                    </div>
                        </Link>
                    ,
                    <Link style={{textDecoration:'none', color:'black'}} to='/notifications'>
                    <div class='side-bar-content' key='notifications' onClick={() => seenNotifications(user._id)}>
                        <img class='col-lg-3 fix-image' src='../../../images/ic/timeline/grey600.png' />
                        <span class='col-lg-9'>Past Applications</span>
                        </div> </Link>
                    ]
                :
                null
            }
            {
                user ? 
                    <Link style={{textDecoration:'none', color:'black'}} to='/'>
                    <div class='side-bar-logout-option' onClick = {e => {e.preventDefault(); logout(); window.location.href='/'}}>
                    <span>Log Out</span>
                    </div>
                    </Link> 
                            :
                    <div class='side-bar-content' onClick= {e=>{e.preventDefault; showLoginPopup()}}>Login</div>
            }
            
        </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
