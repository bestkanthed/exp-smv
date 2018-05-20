const initialState = {
    application: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_APPLICATION' : {
            return {...state, fetching: true}
        }
        case 'FETCH_APPLICATION_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_APPLICATION_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_APPLICATION_FULFILLED' : {
            return {
                ...state,
                fetching: false,
                fetched: true,
                application: action.payload
            }
        }
        default : return state;
    }
}