import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client'

import {seenNotifications, fetchNotifications} from '../../../actions/notification'

import Notification from './Notification'

const mapStateToProps = state => {
    return {
        user: state.user.user,
        notifications: state.notifications
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNotifications: idUser => dispatch(fetchNotifications(idUser)),
    seenNotifications: idUser => dispatch(seenNotifications(idUser))
})

class NotificationTab extends React.Component {
    
    componentDidMount() {
        let {user, fetchNotifications} = this.props
        fetchNotifications(user._id)
        this.socket = io('localhost:2319')
        this.socket.emit('join', {
            email: user.email
        })
    }
    
    render() {
        let {user, seenNotifications} = this.props
        let {notifications, fetching, fetched} = this.props.notifications
        return (
            <li class="dropdown" key='notifications'>
                <a href="#" data-toggle="dropdown" class="dropdown-toggle" onClick={() => seenNotifications(user._id)}>
                    <i class="fa fa-globe"></i>
                </a>
                <ul class="dropdown-menu">
                    {
                        fetching ?
                        null :
                        fetched ?
                        notifications ?
                        notifications.map(notification =>
                            <Notification notification={notification} key={notification._id}/>
                        ) :
                        null :
                        <div> Loading </div>
                        
                    }
                </ul>
            </li>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationTab);