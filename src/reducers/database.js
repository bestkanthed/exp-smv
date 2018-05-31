import { combineReducers } from 'redux'

import countries from './database/countries'
import purposes from './database/purposes'

export default combineReducers({
    countries,
    purposes
});