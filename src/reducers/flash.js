let initialState = {
    messageType: null,
    message: null
}

export default function reducer(state = initialState, action) {
    
    let { type, payload } = action

    if(type.startsWith('FETCH_') && type.endsWith('_FULFILLED')) {
        /*
        console.log('Logging data flash', action)

        if(payload.data.error) return {
            ...state,
            messageType: 'error',
            message: payload.data.error.message
        }
        */
    }
    
    switch (type) {
        case 'SET_FLASH_MESSAGE' : {
            return {
                ...state,
                messageType: payload.messageType,
                message: payload.message
            }
        }
        
        case 'LOGIN_REQUEST_FULFILLED' : {
            if (payload.data.error) return {
                ...state,
                messageType: 'error',
                message: payload.data.error.message
            }
            else return {
                ...state,
                messageType: null,
                message: null
            }
        }
        case 'LOGIN_REQUEST_REJECTED' : {
            return {
                ...state,
                messageType: 'error',
                message: 'Error connecting the server'
            }
        }
        
        case 'LOGIN_REQUEST_FULFILLED' : {
            if (payload.data.error) return {
                ...state,
                messageType: 'error',
                message: payload.data.error.message
            }
            else return {
                ...state,
                messageType: null,
                message: null
            }
        }
        case 'LOGIN_REQUEST_REJECTED' : {
            return {
                ...state,
                messageType: 'error',
                message: 'Error connecting the server'
            }
        }

        default : return state
    }
}