const initialState = {
    purposes: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PURPOSES' : {
            return {...state, fetching: true}
        }
        case 'FETCH_PURPOSES_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_PURPOSES_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_PURPOSES_FULFILLED' : {
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
                purposes: action.payload.data
            }
        }
        default : return state;
    }
}