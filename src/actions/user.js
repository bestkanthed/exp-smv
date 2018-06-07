import axios from 'axios';

export function fetchUser () {
    return {
        type: 'FETCH_USER',
        payload: axios.get('/api/user', {withCredentials: true})
    }
}