const initialState = {
    linkedOrders: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_LINKED_ORDERS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_LINKED_ORDERS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_LINKED_ORDERS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_LINKED_ORDERS_FULFILLED' : {
            console.log('fetch linkedOrders fulfilled', action.payload.data)
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
                linkedOrders: action.payload.data
            }
        }
        default : return state;
    }
}