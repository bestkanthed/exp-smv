const initialState = {
    document: null,
    fetching: false,
    fetched: false,
    error: null,
    rerender: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_DOCUMENT' : {
            return {...state, fetching: true}
        }
        case 'FETCH_DOCUMENT_PENDING' : {
            return {...state, fetching: true, rerender: false}
        }
        case 'FETCH_DOCUMENT_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_DOCUMENT_FULFILLED' : {
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
                document: action.payload.data
            }
        }
        case 'UPLOAD_FILE_FULFILLED' : {
            return {...state, rerender: true}
        }
        case 'DELETE_FILE_FULFILLED' : {
            return {...state, rerender: true}
        }
        case 'CHANGE_DOCUMENT_STATUS_FULFILLED' : {
            return {...state, rerender: true}
        }
        default : return state;
    }
}