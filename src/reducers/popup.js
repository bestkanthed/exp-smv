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

    if(type.startsWith('FETCH_') && type.endsWith('_FULFILLED')) {
        /*
        if(payload.data.error) return {
            content: 'Flash',
            display: true,
            animation: showAnimation
        }
        */
    }

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
            if (payload.data.error) return {
                content: 'Flash',
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