import axios from 'axios';

export function fetchVisas (params) {
    return {
        type: 'FETCH_VISAS',
        payload: axios.get('/api/visas?country='+params.country+'&purpose='+params.purpose)
    }
}

export function fetchCountries () {    
    return {
        type: 'FETCH_COUNTRIES',
        payload: axios.get('/api/countries', {withCredentials: true})
    }
}

export function fetchPurposes () {    
    return {
        type: 'FETCH_PURPOSES',
        payload: axios.get('/api/purposes', {withCredentials: true})
    }
}