import axios from 'axios';

export function fetchCountries () {    
    return {
        type: 'FETCH_COUNTRIES',
        payload: axios.get('http://localhost:1169/countries', {withCredentials: true})
    }
}

export function fetchPurposes () {    
    return {
        type: 'FETCH_PURPOSES',
        payload: axios.get('http://localhost:1169/purposes', {withCredentials: true})
    }
}