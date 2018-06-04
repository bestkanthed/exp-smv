import { combineReducers } from 'redux'

import countries from './database/countries'
import purposes from './database/purposes'
import visas from './database/visas'

export default combineReducers({
    countries,
    purposes,
    visas
});