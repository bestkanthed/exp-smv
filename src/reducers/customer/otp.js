const initialState = {
    otp: null,
    fetching: false,
    fetched: false,
    error: null,
    sendOtpEnabled: false,
    otpVerified: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_OTP_VERIFIED' : {
            return {...state, otpVerified: action.payload}
        }
        case 'SET_SEND_OTP' : {
            return {...state, sendOtpEnabled: action.payload}
        }
        case 'SEND_OTP' : {
            return {...state, fetching: true}
        }
        case 'SEND_OTP_PENDING' : {
            return {...state, fetching: true}
        }
        case 'SEND_OTP_REJECTED' : {
            return {...state, fetching: false}
        }
        case 'SEND_OTP_FULFILLED' : {
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
                otp: action.payload.data
            }
        }
        default : return state;
    }
}