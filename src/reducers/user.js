const initialState = {
    user: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USER' : {
            return {...state, fetching: true}
        }
        case 'FETCH_USER_PENDING' : {
            return {...state, fetching: true}            
        }
        case 'FETCH_USER_REJECTED' : {
            return {...state, fetching: false}            
        }
        case 'FETCH_USER_FULFILLED' : {
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: action.payload
            }
        }

        default : return state;
    }
}