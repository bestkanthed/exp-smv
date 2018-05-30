const initialState = {
    countries: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_COUNTRIES' : {
            return {...state, fetching: true}
        }
        case 'FETCH_COUNTRIES_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_COUNTRIES_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_COUNTRIES_FULFILLED' : {
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
                countries: action.payload.data
            }
        }
        default : return state;
    }
}