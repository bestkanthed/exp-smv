const initialState = {
    user: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_USER_PROFILE' : {
            return {...state, fetching: true}
        }
        case 'FETCH_USER_PROFILE_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_USER_PROFILE_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_USER_PROFILE_FULFILLED' : {
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