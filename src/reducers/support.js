import { combineReducers } from 'redux'

import experts from './support/experts'
import news from './support/news'
import process from './support/process'

export default combineReducers({
    experts,
    news,
    process
});