const initialState = {
    experts: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_EXPERTS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_EXPERTS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_EXPERTS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_EXPERTS_FULFILLED' : {
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
                experts: action.payload.data
            }
        }
        default : return state;
    }
}