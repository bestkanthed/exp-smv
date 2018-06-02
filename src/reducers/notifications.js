const initialState = {
    notifications: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_NOTIFICATIONS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_NOTIFICATIONS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_NOTIFICATIONS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_NOTIFICATIONS_FULFILLED' : {
            return action.payload.data.error ? {
                ...state,
                fetching: false,
                fetched: true,
                error: action.payload.data.error
            } : {
                ...state,
                fetching: false,
                fetched: true,
                notifications: action.payload.data
            }
        }
        default : return state;
    }
}