import axios from 'axios';

export function fetchNotifications (idUser) {    
    return {
        type: 'FETCH_NOTIFICATIONS',
        payload: axios.get('http://localhost:1169/user/'+idUser+'/notifications', {withCredentials: true})
    }
}

export function seenNotifications (idUser) {    
    return {
        type: 'SEEN_NOTIFICATIONS',
        payload: axios('http://localhost:1169/user/'+idUser+'/notifications/seen', {
            method: 'post',    
            withCredentials: true
        })
    }
}

export function clickedNotification (id) {    
    return {
        type: 'CLICK_NOTIFICATION',
        payload: axios('http://localhost:1169/notifications/'+id+'/clicked', {
            method: 'post',    
            withCredentials: true
        })
    }
}