const initialState = {
    document: null,
    fetching: false,
    fetched: false,
    error: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_DOCUMENT' : {
            return {...state, fetching: true}
        }
        case 'FETCH_DOCUMENT_PENDING' : {
            return {...state, fetching: true}
        }
        case 'FETCH_DOCUMENT_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_DOCUMENT_FULFILLED' : {
            return {
                ...state,
                fetching: false,
                fetched: true,
                document: action.payload
            }
        }
        default : return state;
    }
}