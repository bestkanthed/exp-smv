let initialState = {
    messageType: null,
    message: null
}

export default function reducer(state = initialState, action) {
    
    let { type, payload } = action
    let postResponse = type.startsWith('POST_') && type.endsWith('_FULFILLED')
    let deleteResponse = type.startsWith('DELETE_') && type.endsWith('_FULFILLED')
    let uploadResponse = type.startsWith('UPLOAD_') && type.endsWith('_FULFILLED')
    let updateResponse = type.startsWith('UPDATE_') && type.endsWith('_FULFILLED')
    let forgotResponse = type === 'FORGOT_PASSWORD_FULFILLED'

    if( postResponse || deleteResponse || uploadResponse || updateResponse || forgotResponse) {
        console.log('Logging data flash after response fullfiled', action, payload)
        if(payload.data && payload.data.error) return {
            ...state,
            messageType: 'error',
            message: payload.data.error.message
        }
        else if (payload.data) return {
            ...state,
            messageType: 'info',
            message: payload.data
        }
    }
    
    switch (type) {
        case 'UPLOAD_FILE_PENDING' : {
            return {
                ...state,
                messageType: 'info',
                message: 'Please wait while file is being uploaded'
            }
        }
        
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