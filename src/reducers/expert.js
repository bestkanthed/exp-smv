import { combineReducers } from 'redux'

import orders from './expert/orders'
import order from './expert/order'
import application from './expert/application'
import document from './expert/document'

export default combineReducers({
    orders,
    order,
    application,
    document
});