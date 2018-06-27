import { combineReducers } from 'redux'

import orders from './expert/orders'
import order from './expert/order'
import application from './expert/application'
import document from './expert/document'
import comments from './expert/comments'

import activeTab from './expert/activeTab'
import linkedOrders from './expert/linkedOrders'
import query from './expert/query'

export default combineReducers({
    orders,
    order,
    application,
    document,
    comments,
    activeTab,
    linkedOrders,
    query
});