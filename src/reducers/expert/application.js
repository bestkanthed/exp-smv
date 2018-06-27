const initialState = {
    application: null,
    fetching: false,
    fetched: false,
    error: null,
    rerender: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_APPLICATION' : {
            return {...state, fetching: true}
        }
        case 'FETCH_APPLICATION_PENDING' : {
            return {...state, fetching: true, rerender: false}
        }
        case 'FETCH_APPLICATION_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'FETCH_APPLICATION_FULFILLED' : {
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
                application: action.payload.data
            }
        }
        case 'CHANGE_DOCUMENT_CATEGORY_FULFILLED' : {
            return {...state, rerender: true}
        }
        case 'CHANGE_DOCUMENT_STATUS_FULFILLED' : {
            return {...state, rerender: true}
        }
        case 'UPLOAD_FILE_FULFILLED' : {
            return {...state, rerender: true}
        }
        case 'DELETE_DOCUMENT_FULFILLED' : {
            return {...state, rerender: true}
        }
        case 'POST_DOCUMENT_FULFILLED' : {
            return {...state, rerender: true}
        }
        case 'UPDATE_APPLICATION_FULFILLED' : {
            return {...state, rerender: true}
        }
        default : return state;
    }
}