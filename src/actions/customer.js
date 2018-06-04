import axios from 'axios'

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