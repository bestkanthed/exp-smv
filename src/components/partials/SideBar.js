import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { loadPopup } from '../../actions/popup'
import { logout } from '../../actions/login'
import { seenNotifications } from '../../actions/notification'

import './partials.scss';

const sideBarOrder = [
    'expert',
    'support',
    'admin'
]

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
                    (user.teams.sort((d1, d2) => ( sideBarOrder.indexOf(d1) < sideBarOrder.indexOf(d2) ? -1 : 1 ))).map(role =>
                        <Link key={role} style={{textDecoration:'none', color:'black'}} to={'/'+role}>
                        <div class='side-bar-content' >
                        <img  style={{marginRight:'25%'}} class='' src={role === 'support' ? '../../../images/ic/support.png':role === 'admin'? '../../../images/ic/person/grey600.png' : '../../../images/ic/home/grey600.png'}/>
                        <span class=''>{role}</span>
                        </div>
                        </Link>
                    ) :
                    null
                    ,
                    <Link key='notifications' onClick={() => seenNotifications(user._id)} style={{textDecoration:'none', color:'black'}} to='/notifications'>
                    <div class='side-bar-content'>
                        <img style={{marginRight:'25%'}} src='../../../images/ic/timeline/grey600.png' />
                        <span>notifications</span>
                    </div>
                    </Link>
                    ,
                    <Link key='past' style={{textDecoration:'none', color:'black'}} to='/past'>
                    <div class='side-bar-content'>
                        <img style={{marginRight:'25%'}} src='../../../images/ic/timeline/grey600.png' />
                        <span>past</span>
                    </div>
                    </Link>
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
