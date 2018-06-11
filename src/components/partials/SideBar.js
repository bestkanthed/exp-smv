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
                        <div class='side-bar-content'key={role}><Link style={{textDecoration:'none', color:'black'}} to={'/'+role}><img src={role==='support' ? '../../../images/ic/person/grey600.png':'../../../images/ic/home/grey600.png'}/><span style={role==='support' ? {marginLeft:'15%', marginRight:'50%'}:role==='admin' ? {marginLeft:'15%', marginRight:'53%'}:{marginLeft:'15%', marginRight:'43%'}}>{role==='admin'? 'Admin' : (role==='support' ? 'Support': 'Visa Expert')}</span></Link></div>
                    ) :
                    null
                    ,
                    <div class='side-bar-content' key='past-applications' onClick={() => seenNotifications(user._id)}><Link style={{textDecoration:'none', color:'black'}} to='/notifications'><img src='../../../images/ic/hourglass_empty/grey600.png' /><span style={{marginLeft:'15%', marginRight:'37%'}}>Notifications</span></Link></div>
                    ,
                    <div class='side-bar-content' key='notifications' onClick={() => seenNotifications(user._id)}><Link style={{textDecoration:'none', color:'black'}} to='/notifications'><img src='../../../images/ic/timeline/grey600.png' /><span style={{marginLeft:'15%', marginRight:'25%'}}>Past Applications</span></Link></div>
                    ]
                :
                <div>oops</div>
            }
            {
                user ? <div class='side-bar-logout-option' onClick = {e => {e.preventDefault(); logout(); window.location.href='/'}}><Link style={{textDecoration:'none', color:'black'}} to='/'>Log Out</Link></div>:
            <div class='side-bar-content' onClick= {e=>{e.preventDefault; showLoginPopup()}}>Login</div>
            }
            
        </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);