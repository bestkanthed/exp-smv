const initialState = {
    customers: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_CUSTOMERS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_CUSTOMERS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_CUSTOMERS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_CUSTOMERS_FULFILLED' : {
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
                customers: action.payload.data
            }
        }
        default : return state;
    }
}