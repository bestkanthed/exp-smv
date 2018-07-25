import { combineReducers } from 'redux'

import experts from './support/experts'
import customers from './support/customers'
import news from './support/news'
import process from './support/process'
import payments from './support/payments'
import invoices from './support/invoices'
import bill from './support/bill'

export default combineReducers({
    experts,
    customers,
    news,
    process,
    payments, 
    invoices, 
    bill
});