import { combineReducers } from 'redux'

import orders from './expert/orders'
import order from './expert/order'
import application from './expert/application'
import document from './expert/document'
import comments from './expert/comments'

import linkedOrders from './expert/linkedOrders'
import query from './expert/query'

export default combineReducers({
    orders,
    order,
    application,
    document,
    comments,
    linkedOrders,
    query
});