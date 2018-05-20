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
            console.log('FETCH_USER_FULFILLED', action.payload.data);
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

            console.log('LOGIN_REQUEST_FULFILLED', action.payload.data);

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