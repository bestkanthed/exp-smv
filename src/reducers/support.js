import { combineReducers } from 'redux'

import experts from './support/experts'
import customers from './support/customers'
import news from './support/news'
import process from './support/process'

export default combineReducers({
    experts,
    customers,
    news,
    process
});