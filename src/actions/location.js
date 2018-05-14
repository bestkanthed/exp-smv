import axios from 'axios';

export function fetchLocation() {
    return {
        type: 'FETCH_LOCATION',
        payload: axios.get('https://geoip-db.com/json/')
    }
}