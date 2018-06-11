const initialState = {
    reset: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHECK_RESET_TOKEN' : {
            return {...state, fetching: true}
        }
        case 'CHECK_RESET_TOKEN_PENDING' : {
            return {...state, fetching: true}
        }
        case 'CHECK_RESET_TOKEN_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'CHECK_RESET_TOKEN_FULFILLED' : {
            return action.payload.data.error ? {
                ...state,
                fetching: false,
                fetched: true,
                error: action.payload.data.error
            } : {
                ...state,
                fetching: false,
                fetched: true,
                reset: action.payload.data
            }
        }
        case 'RESET_PASSWORD_FULFILLED' : {
            return action.payload.data.error ? {
                ...state,
                fetching: false,
                fetched: true,
                error: action.payload.data.error
            } : {
                ...state,
                fetching: false,
                fetched: true,
                reset: false
            }
        }
        default : return state;
    }
}