const initialState = {
    news: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_NEWS' : {
            return {...state, fetching: true}
        }
        case 'FETCH_NEWS_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_NEWS_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_NEWS_FULFILLED' : {
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
                news: action.payload.data
            }
        }
        default : return state;
    }
}