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
        case 'LOGIN_REQUEST_FULFILLED' : {
            console.log("Login request is FULFILLED");
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: action.payload.data
            }
        }
        case 'LOGIN_REQUEST_PENDING' : {
            console.log("Login request is FULFILLED");
            return {...state, fetching: true}
        }
        case 'LOGIN_REQUEST_REJECTED' : {
            console.log("Login request is REJECTED");
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: true
            }
        }
        default : return state;
    }
}