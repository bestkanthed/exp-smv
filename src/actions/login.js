import axios from 'axios';

export function sendLoginRequest (credentials) {
    console.log("SENDING LOGIN REQUEST");
    return {
        type: 'LOGIN_REQUEST',
        payload: axios('http://localhost:1169/login', {
            method: 'post',
            data: credentials,
            withCredentials: true
        })
    }
}

export function logout () {
    return {
        type: 'LOGOUT_REQUEST',
        payload: axios.get('http://localhost:1169/logout', { withCredentials: true })
    }
}