import React from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    clickedNotifications: idNotification => dispatch(clickedNotifications(idNotification))
})

const Notification = ({notification, clickedNotifications}) => (
    <div>
        <p>{notification.content}</p>
        <a>{notification.link}</a>
    </div>
)

export default connect(null, mapDispatchToProps)(Notification);