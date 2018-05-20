const initialState = {
    order: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ORDER' : {
            return {...state, fetching: true}
        }
        case 'FETCH_ORDER_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_ORDER_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_ORDER_FULFILLED' : {
            return {
                ...state,
                fetching: false,
                fetched: true,
                order: action.payload
            }
        }
        default : return state;
    }
}