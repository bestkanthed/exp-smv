import axios from 'axios';

export function fetchNotification () {    
    return {
        type: 'FETCH_NOTIFICATIONS',
        payload: axios.get('/api/users/notifications', { withCredentials: true })
    }
}

export function fetchNotifications (idUser) {    
    return {
        type: 'FETCH_NOTIFICATIONS',
        payload: axios.get('/api/user/'+idUser+'/notifications', {withCredentials: true})
    }
}

export function seenNotifications (idUser) {    
    return {
        type: 'SEEN_NOTIFICATIONS',
        payload: axios('/api/user/'+idUser+'/notifications/seen', {
            method: 'post',    
            withCredentials: true
        })
    }
}

export function clickedNotification (id) {    
    return {
        type: 'CLICK_NOTIFICATION',
        payload: axios('/api/notifications/'+id+'/clicked', {
            method: 'post',    
            withCredentials: true
        })
    }
}