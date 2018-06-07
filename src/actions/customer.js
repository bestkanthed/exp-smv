import axios from 'axios'

export function registerCustomer (formData) {
    return {
        type: 'POST_CUSTOMER',
        payload : axios('http://localhost:1169/customer/register', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function setOtpVerified (value) {
    return {
        type: 'SET_OTP_VERIFIED',
        payload: value
    }
}

export function setSendOtp (value) {
    return {
        type: 'SET_SEND_OTP',
        payload: value
    }
}

export function sendOtp (phone) {
    return {
        type: 'SEND_OTP',
        payload: axios.get('http://localhost:1169/customer/otp/'+phone, {withCredentials: true})
    }
}

export function setGetStartedCountry (country) {
    return {
        type : 'SET_GET_STARTED_COUNTRY',
        payload : country
    }
}

export function setGetStartedPurpose (purpose) {
    return {
        type : 'SET_GET_STARTED_PURPOSE',
        payload : purpose
    }
}