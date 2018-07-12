const initialState = {
    display: false,
    animation: null,
    content: null
};

let [ showAnimation, hideAnimation ] = [
    {
        'WebkitAnimationName': 'showPopup', /* Safari 4.0 - 8.0 */
        'WebkitAnimationDuration': '0.5s', /* Safari 4.0 - 8.0 */
        'animationName': 'showPopup',
        'animationDuration': '0.5s'
    },
    {
        'WebkitAnimationName': 'hidePopup', /* Safari 4.0 - 8.0 */
        'WebkitAnimationDuration': '0.5s', /* Safari 4.0 - 8.0 */
        'animationName': 'hidePopup',
        'animationDuration': '0.5s'
    }
];

const popupReducer = (state = initialState, action) => {
    
    let { type, payload } = action


    let flashMessage = type === 'SET_FLASH_MESSAGE'
    let postResponse = type.startsWith('POST_') && type.endsWith('_FULFILLED')
    let deleteResponse = type.startsWith('DELETE_') && type.endsWith('_FULFILLED')
    let uploadResponse = type.startsWith('UPLOAD_') && type.endsWith('_FULFILLED')
    let updateResponse = type.startsWith('UPDATE_') && type.endsWith('_FULFILLED')
    let forgotResponse = type === 'FORGOT_PASSWORD_FULFILLED'    
    let uploadPending = type === 'UPLOAD_FILE_PENDING'    

    

    if( flashMessage || postResponse || deleteResponse || uploadResponse || updateResponse || forgotResponse || uploadPending) return {
        ...state,
        content: 'Flash',
        display: true,
        animation: showAnimation
    }

    console.log('Logging action from popup reducer', type, action)

    switch (type) {
        case 'LOAD_POPUP' : {
            return {
                ...state,
                content: payload,
                display: true,
                animation: showAnimation
            }
        }
        case 'HIDE_POPUP_START' : {
            return {
                ...state,
                animation: hideAnimation
            }
        }
        case 'HIDE_POPUP_DONE' : {
            return {...state, display: false}            
        }
        case 'LOGIN_REQUEST_FULFILLED' : {
            
            console.log('Login req fulfilled', payload.data)
            if (payload.data.error) return {
                content: 'Flash',
                display: true,
                animation: showAnimation
            }
            else if (!payload.data.passwordChanged) {
                console.log('Now will return ChangePassword')
                return {
                    content: 'ChangePassword',
                    display: true,
                    animation: showAnimation
                }
            }
            else return {...state, display: false}
        }
        case 'LOGIN_REQUEST_REJECTED' : {
            return {
                ...state,
                content: 'Flash',
                display: true,
                animation: showAnimation
            }
        }
        default :
            return state
    }
}

export default popupReducer