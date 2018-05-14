import { combineReducers } from 'redux'

import location from './location'
import popup from './popup'
import user from './user'

export default combineReducers({
    location,
    popup,
    user
});