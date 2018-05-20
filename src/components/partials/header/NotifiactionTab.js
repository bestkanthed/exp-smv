import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        notifications: state.notifications
    }
}

const mapDispatchToProps = dispatch => ({
    seenNotifications: () => dispatch(seenNotifications())
})

const NotificationTab = () => (
    <li class="dropdown" key='notifications'>
        <a href="#" data-toggle="dropdown" class="dropdown-toggle" onClick={seenNotifications}>
            <i class="fa fa-globe"></i>
        </a>
        <ul class="dropdown-menu">
            {
                notifications.map(notification =>
                    <Notification notification={notification} key={notification.id}/>
                )
            }
        </ul>
    </li>
)

export default connect(mapStateToProps, mapDispatchToProps)(Notification);