import { combineReducers } from 'redux'

import admin from './admin'
import expert from './expert'
import support from './support'
import customer from './customer'

import database from './database'
import user from './user'
import notifications from './notifications'
import reset from './reset'
import location from './location'

import flash from './flash'
import popup from './popup'

export default combineReducers({
    admin,
    expert,
    support,
    customer,
    database,
    user,
    notifications,
    reset,
    location,
    flash,
    popup
});