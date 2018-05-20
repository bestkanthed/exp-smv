import axios from 'axios';

/**
 * Dummy payload to be replaced with axios request.
 */
export function fetchUser () {
    
    /*
    return {
        type: 'FETCH_USER',
        payload: axios.get('http://localhost:1169/user', {withCredentials: true})
    }
    */

    return {
        type: 'FETCH_USER_FULFILLED',
        payload: {
            data: {
                name: 'Abhishek Kanthed',
                email: 'abhishek@stampmyvisa.com',
                teams: ['admin', 'expert']
            }
        }
    }

}