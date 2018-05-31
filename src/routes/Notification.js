import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import io from 'socket.io-client'

import { fetchNotifications, seenNotifications, clickedNotification } from '../actions/notification'

const mapStateToProps = state => {
    return {
        user: state.user.user,
        notifications: state.notifications
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNotifications: idUser => dispatch(fetchNotifications(idUser)),
    clickedNotification: idNotification => dispatch(clickedNotification(idNotification)),
})

class Notification extends React.Component {
    
    componentDidMount() {
        let {user, fetchNotifications} = this.props
        fetchNotifications(user._id)
        this.socket = io('localhost:2319') //WS web socket
        this.socket.emit('join', user._id)
        this.socket.on('NEW_NOTIFICATION', () => {
            fetchNotifications(user._id)
        })
    }
    
    render() {
        let {user, seenNotifications, clickedNotification} = this.props
        let {notifications, fetching, fetched} = this.props.notifications
        return (
            <div class="container notifications">
                {
                    fetching ?
                    null :
                    fetched ?
                    notifications ?
                    notifications.map(notification =>
                        <li>
                            <Link to={notification.link} onClick={() => clickedNotification(notification._id)}>
                                <p>{notification.notification}</p>
                            </Link>
                        </li>
                    ) :
                    null :
                    <div> Loading </div>   
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);