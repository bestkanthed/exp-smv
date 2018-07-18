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

    console.log('Logging action ***********', type, payload)

    switch (type) {
        case 'LOAD_POPUP' : {
            return {
                display: true,
                animation: showAnimation,
                content: payload
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
            if (payload.data.error) return {
                content: 'Flash',
                display: true,
                animation: showAnimation
            }
            else if (!payload.data.passwordChanged) return {
                content: 'ChangePassword',
                display: true,
                animation: showAnimation
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