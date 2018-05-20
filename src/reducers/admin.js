import { combineReducers } from 'redux'

import teams from './admin/teams'
import profile from './admin/profile'

export default combineReducers({
    teams,
    profile
});