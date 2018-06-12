import { combineReducers } from 'redux'

import getStarted from './customer/getStarted'
import otp from './customer/otp'

export default combineReducers({
    getStarted,
    otp
});