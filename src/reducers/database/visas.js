const initialState = {
    visas: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_VISAS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_VISAS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_VISAS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_VISAS_FULFILLED' : {
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
                visas: action.payload.data
            }
        }
        default : return state;
    }
}