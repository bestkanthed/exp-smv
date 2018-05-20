const initialState = {
    orders: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ORDERS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_ORDERS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_ORDERS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_ORDERS_FULFILLED' : {
            return {
                ...state,
                fetching: false,
                fetched: true,
                orders: action.payload
            }
        }
        default : return state;
    }
}