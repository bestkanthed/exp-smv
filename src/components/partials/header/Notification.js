import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import { clickedNotification } from '../../../actions/notification'

const mapDispatchToProps = dispatch => ({
    clickedNotification: idNotification => dispatch(clickedNotification(idNotification))
})

const Notification = ({notification, clickedNotification}) => (
    <li>
        <Link to={notification.link} onClick={() => clickedNotification(notification._id)}>
            <p>{notification.content}</p>
        </Link>
    </li>
)

export default connect(null, mapDispatchToProps)(Notification);