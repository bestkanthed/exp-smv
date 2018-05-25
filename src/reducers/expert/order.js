const initialState = {
    order: null,
    fetching: false,
    fetched: false,
    error: null,
    rerender: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_ORDER' : {
            return {...state, fetching: true}
        }
        case 'FETCH_ORDER_PENDING' : {
            return {...state, fetching: true, rerender: false}
        }
        case 'FETCH_ORDER_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_ORDER_FULFILLED' : {
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
                order: action.payload.data
            }
        }
        case 'POST_APPLICATION_FULFILLED' : {
            return {...state, rerender: true}
        }
        default : return state;
    }
}