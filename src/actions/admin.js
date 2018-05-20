import axios from 'axios';

/**
 * Fetch real data later
 */

export function fetchUserProfile (idUser) {
    return {
        type: 'FETCH_USER_PROFILE_FULFILLED',
        payload: {
            id: 0,
            email: 'abhishek@stampmyvisa.com',
            name: 'Abhishek Kanthed',
            teams: ['admin', 'support']
        }
    }
}

export function fetchTeams () {
    return {
        type: 'FETCH_TEAMS_FULFILLED',
        payload: {
            data: [
                {
                    id: 1,
                    name: 'admin',
                    users: [
                        {
                            id: 1,
                            name: 'Shahaji',
                            email: 'shahaji@stampmyvisa.com'
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'expert',
                    users: [
                        {
                            id: 2,
                            name: 'Abhis',
                            email: 'si@stampmyvisa.com'
                        }
                    ]
                },
            ]
        } 
        
        //axios.get('http://localhost:1169/teams', {withCredentials: true})
    }
}