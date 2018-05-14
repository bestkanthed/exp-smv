import axios from 'axios';

/**
 * Dummy payload to be replaced with axios request.
 */
export function fetchUser() {
    return {
        type: 'FETCH_USER_FULLFILLED',
        payload: {
            email: 'abhishek@stampmyvisa.com'
        }
    }
}