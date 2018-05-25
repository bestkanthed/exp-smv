import { combineReducers } from 'redux'

import admin from './admin'
import expert from './expert'
import support from './support'

import user from './user'

import flash from './flash'
import location from './location'
import popup from './popup'

export default combineReducers({
    admin,
    expert,
    support,
    user,
    flash,
    location,
    popup
});