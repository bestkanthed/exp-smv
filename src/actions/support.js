import axios from 'axios'

export function setIdOrder (idOrder) {
    return {
        type: 'SET_ID_ORDER',
        payload : idOrder
    }
}

export function fetchCustomers () {
    return {
        type: 'FETCH_CUSTOMERS',
        payload : axios.get('/api/support/customers', { withCredentials: true })
    }
}

export function fetchExperts () {
    return {
        type: 'FETCH_EXPERTS',
        payload : axios.get('/api/support/experts', { withCredentials: true })
    }
}

export function fetchNews () {
    return {
        type: 'FETCH_NEWS',
        payload : axios.get('/api/support/news', { withCredentials: true })
    }
}

export function postProcessOrder (formData) {
    
    return {
        type: 'POST_CUSTOMER_CUM_ORDER',
        payload : axios('/api/support/process-order', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
    
}

export function postCustomerCumOrder (formData) {
    
    return {
        type: 'POST_CUSTOMER_CUM_ORDER',
        payload : axios('/api/support/customer-cum-order', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
    
}

export function getServices (supportId) {
    return {
        type : 'GET_SERVICES', 
        payload : axios(`http://localhost:5369/payments/services/${supportId}`, 
        {
            method : 'get', 
            withCredentials : true
        })
    }
}

export function startAuthtenication (supportId) {
    return {
        type : 'START_AUTH', 
        payload : axios(`http://localhost:5369/payments/authorization/authorizationToken/${supportId}`, 
        {
            method : 'get', 
            withCredentials : true
        })
    }
}

export function addNewItem(item){
    return {
        type : 'ADD_NEW_ITEM', 
        payload : item
    }
}

export function postBill(bill) {
    return {
        type: 'POST_BILL',
        payload : axios('http://localhost:5369/payments/billing/', {
            method: 'post',
            data: bill,
            withCredentials: true
        })
    }
}

export function getBill(id){
    return {
        type : 'GET_BILL', 
        payload : axios(`http://localhost:5369/payments/billing/${id}`, 
        {
            method : 'get', 
            withCredentials : true
        })
    }
}