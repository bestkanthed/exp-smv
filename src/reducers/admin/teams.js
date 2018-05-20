const initialState = {
    teams: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TEAMS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_TEAMS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_TEAMS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_TEAMS_FULFILLED' : {
            
            return action.payload.data.error ? {
                ...state,
                fetching: false,
                fetched: true,
                error: action.payload.data.error
            } :
            {
                ...state,
                fetching: false,
                fetched: true,
                error: null,
                teams: action.payload.data
            }
        }
        default : return state;
    }
}