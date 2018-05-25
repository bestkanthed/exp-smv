import axios from 'axios'

export function fetchExperts () {
    return {
        type: 'FETCH_EXPERTS',
        payload : axios.get('http://localhost:1169/support/experts', { withCredentials: true })
    }
}

export function postCustomerCumOrder (formData) {
    
    return {
        type: 'POST_CUSTOMER_CUM_ORDER',
        payload : axios('http://localhost:1169/support/customer-cum-order', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
    
}