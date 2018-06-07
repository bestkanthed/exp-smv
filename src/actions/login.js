import axios from 'axios';

export function checkResetToken (token) {
    return {
        type: 'CHECK_RESET_TOKEN',
        payload: axios.get('/api/reset/'+token, { withCredentials: true })
    }
}

export function resetPassword (credentials) {
    
    console.log('Logging credentials from resetpassword', credentials)

    return {
        type: 'RESET_PASSWORD',
        payload: axios('/api/reset', {
            method: 'post',
            data: credentials,
            withCredentials: true
        })
    }
}

export function sendLoginRequest (credentials) {
    return {
        type: 'LOGIN_REQUEST',
        payload: axios('/api/login', {
            method: 'post',
            data: credentials,
            withCredentials: true
        })
    }
}

export function forgotPassword (credentials) {
    return {
        type: 'FORGOT_PASSWORD',
        payload: axios('/api/forgot', {
            method: 'post',
            data: credentials,
            withCredentials: true
        })
    }
}

export function logout () {
    return {
        type: 'LOGOUT_REQUEST',
        payload: axios.get('/api/logout', { withCredentials: true })
    }
}