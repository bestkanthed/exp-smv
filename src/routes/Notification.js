import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import io from 'socket.io-client'

import { fetchNotifications, seenNotifications, clickedNotification } from '../actions/notification'
import { fetchApplicationByIdDocument, fetchApplication } from '../actions/expert'

const mapStateToProps = state => {
    return {
        user: state.user.user,
        notifications: state.notifications
    }
}

const mapDispatchToProps = dispatch => ({
    fetchNotifications: idUser => dispatch(fetchNotifications(idUser)),
    clickedNotification: idNotification => dispatch(clickedNotification(idNotification)),
    fetchApplicationByDocument : idDocument => dispatch(fetchApplicationByIdDocument(idDocument)),
    fetchApplication : idApplication => dispatch(fetchApplication(idApplication))
    
})

class Notification extends React.Component {

    constructor(props) {
        super(props)
        this.setApplication.bind(this)
    }
    
    componentDidMount() {
        let {user, fetchNotifications} = this.props
        user? fetchNotifications(user._id): null;
        /*
        this.socket = io('http://socket.stampmyvisa.com') //WS web socket
        this.socket.emit('join', user._id)
        this.socket.on('NEW_NOTIFICATION', () => {
            fetchNotifications(user._id)
        })
        */
    }

    setApplication(id) {
        let notif = this.props.notifications.notifications.filter((elem) =>{
            return elem._id === id
        })
        this.props.fetchApplicationByDocument((notif[0].link.split('/'))[3])
    }
    
    render() {
        let {user, seenNotifications, clickedNotification} = this.props
        let {notifications, fetching, fetched} = this.props.notifications
        return (
            <div class="notifications">
            {console.log(this.props)}
                {
                    fetching ?
                    null :
                    fetched ?
                    notifications ?
                    notifications.map(notification =>
                        <div class={notification.clicked ? 'alert alert-success':'alert alert-warning'} key={notification._id}>
                            <Link to={notification.link} onClick={() => {clickedNotification(notification._id); this.setApplication(notification._id)}}>
                                <p>{notification.notification}</p>
                            </Link>
                        </div>
                    ) :
                    null :
                    <div> Loading </div>   
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);