import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { loadPopup } from '../../actions/popup'
import { logout } from '../../actions/login'
import { seenNotifications, fetchNotification } from '../../actions/notification'

import './partials.scss';

const sideBarOrder = [
    'expert',
    'support',
    'admin'
]

const mapStateToProps = state => ({
    user : state.user.user,
    notifications : state.notifications.notifications
})

const mapDispatchToProps = dispatch => ({ 
    fetchNotification: () => dispatch(fetchNotification()),
    seenNotifications: idUser => dispatch(seenNotifications(idUser)),
    showLoginPopup: () => dispatch(loadPopup('Login')),
    logout: () => dispatch(logout())
})

class SideBar extends React.Component {
    componentWillMount() {
        this.props.fetchNotification()
    }

    render () {
        
        let unseen = []
        let {user, showLoginPopup, logout, seenNotifications, notifications} = this.props
        if(notifications) unseen = notifications.filter(notification => !notification.seen)
        
        return (
            <div class='side-bar'>
                {
                    user ?
                    [
                        user.teams ?
                        (user.teams.sort((d1, d2) => ( sideBarOrder.indexOf(d1) < sideBarOrder.indexOf(d2) ? -1 : 1 ))).map(role =>
                            <Link key={role} style={{textDecoration:'none', color:'black'}} to={'/'+role}>
                            <div class='side-bar-content' >
                            <img  style={{marginRight:'25%'}} class='' src={role === 'support' ? '../../../images/ic/support.png':role === 'admin'? '../../../images/ic/person/grey600.png' : '../../../images/ic/home/grey600.png'}/>
                            <span>{role === 'customer' ? 'Dashboard' : role}</span>
                            </div>
                            </Link>
                        ) :
                        null
                        ,
                        <Link key='notifications' onClick={() => seenNotifications(user._id)} style={{textDecoration:'none', color:'black'}} to='/notifications'>
                        <div class='side-bar-content'>
                            <img style={{marginRight:'25%', marginLeft:'2%'}} src='../../../images/ic/ic/notifications/grey600.png' />
                            <span>Notifications{'\u00A0'}
                                {
                                    unseen.length ?
                                    <span style={{backgroundColor:'#f44336', padding:'2%', margin:'1%', borderRadius:'12px', color:'white'}}>{unseen.length === 100 ? '99+' : unseen.length}</span>
                                    : null
                                }
                            </span>
                        </div>
                        </Link>
                        ,
                        <Link key='past' style={{textDecoration:'none', color:'black'}} to='/past'>
                        <div class='side-bar-content'>
                            <img style={{marginRight:'24%', marginLeft:'1%'}} src='../../../images/ic/hourglass_empty/grey600.png' />
                            <span>Past Applications</span>
                        </div>
                        </Link>,
                        <Link key='logout' style={{textDecoration:'none', color:'black'}} to='/'>
                        <div class='side-bar-content' onClick = {e => {e.preventDefault(); logout(); window.location.href='/'}}>
                            <img style={{marginRight:'25%', marginLeft:'2%'}} src='../../../images/ic/highlight_off/grey600.png' />
                            <span>Log out</span>
                        </div>
                        </Link>
                        ]
                    :
                    <div class='side-bar-content' onClick = {e => {e.preventDefault(); showLoginPopup()}}>
                        <img style={{marginRight:'25%'}} src='../../../images/ic/person/grey600.png' />
                        <span>Login</span>
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
