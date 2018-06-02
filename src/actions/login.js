import axios from 'axios';

export function checkResetToken (token) {
    return {
        type: 'CHECK_RESET_TOKEN',
        payload: axios.get('http://localhost:1169/reset/'+token, { withCredentials: true })
    }
}

export function resetPassword (credentials) {
    
    console.log('Logging credentials from resetpassword', credentials)

    return {
        type: 'RESET_PASSWORD',
        payload: axios('http://localhost:1169/reset', {
            method: 'post',
            data: credentials,
            withCredentials: true
        })
    }
}

export function sendLoginRequest (credentials) {
    return {
        type: 'LOGIN_REQUEST',
        payload: axios('http://localhost:1169/login', {
            method: 'post',
            data: credentials,
            withCredentials: true
        })
    }
}

export function forgotPassword (credentials) {
    return {
        type: 'FORGOT_PASSWORD',
        payload: axios('http://localhost:1169/forgot', {
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