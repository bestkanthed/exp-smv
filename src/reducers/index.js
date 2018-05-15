import { combineReducers } from 'redux'

import admin from './admin'
import flash from './flash'
import location from './location'
import popup from './popup'
import user from './user'

export default combineReducers({
    admin,
    flash,
    location,
    popup,
    user
});