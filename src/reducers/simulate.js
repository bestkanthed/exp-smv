const initialState = {
    simulate: null,
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
                user: action.payload.data
            }
        }
        case 'LOGIN_REQUEST' : {
            return {
                ...state,
                fetching: true,
                fetched: true,
                user: action.payload.data
            }
        }
        case 'LOGIN_REQUEST_PENDING' : {
            return {...state, fetching: true}
        }
        case 'LOGIN_REQUEST_REJECTED' : {
            return {
                ...state,
                fetching: false,
                fetched: true,
                error: true
            }
        }
        case 'LOGIN_REQUEST_FULFILLED' : {
            if(action.payload.data.error) return {
                ...state,
                fetching: false,
                fetched: true,
                error: action.payload.data.error.message
            }
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: null
            }
        }
        
        case 'LOGOUT_REQUEST_FULFILLED' : {
            if(action.payload.data.error) return {
                ...state,
                fetching: false,
                fetched: true,
            }
            return {
                ...state,
                fetching: false,
                fetched: true,
                user: action.payload.data
            }
        }

        default : return state;
    }
}