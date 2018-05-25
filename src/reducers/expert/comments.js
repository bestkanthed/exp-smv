const initialState = {
    comments: null,
    fetching: false,
    fetched: false,
    error: null,
    rerender: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_COMMENTS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_COMMENTS_PENDING' : {
            return {...state, fetching: true, rerender: false}
        }
        case 'FETCH_COMMENTS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_COMMENTS_FULFILLED' : {
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
                comments: action.payload.data
            }
        }
        case 'POST_COMMENT_FULFILLED' : {
            return {
                ...state,
                rerender: true
            }
        }
        default : return state;
    }
}