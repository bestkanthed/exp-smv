import axios from 'axios';

export function searchCustomer (query) {
    return {
        type: 'FETCH_ORDERS',
        payload : axios.get('/api/expert/search?query='+query, { withCredentials: true })
    }
}

export function fileTypeRejected () {
    return {
        type: 'SET_FLASH_MESSAGE',
        payload : {
            messageType: 'error',
            message: 'Unable to upload because the file type is incompatiple. Accepted file types are ops-app/images, .pdf, .doc, .docx, .xls, .xlsx'
        }
    }
}

export function setActiveTab (index) {
    return {
        type: 'SET_ACTIVE_TAB',
        payload : index
    }
}

export function setQuery (query) {
    return {
        type: 'SET_QUERY',
        payload : query
    }
}

export function seenComments (idDocument) {
    return {
        type: 'SEEN_COMMENTS',
        payload : axios.put('/api/expert/comments/'+idDocument+'/seen', { withCredentials: true })
    }
}

export function postComment (formData) {
    return {
        type: 'POST_COMMENT',
        payload : axios('/api/expert/comment', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function fetchComments (idDocument) {
    return {
        type: 'FETCH_COMMENTS',
        payload : axios.get('/api/expert/comments/'+idDocument, { withCredentials: true })
    }
}

export function uploadFile (file, idDocument, idCustomer) {
    let formData = new FormData()
    formData.append('file', file)
    if (idCustomer) formData.append('idCustomer', idCustomer)
    return {
        type: 'UPLOAD_FILE',
        payload: axios('/api/expert/documents/'+idDocument+'/upload', {
            method: 'post',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            data: formData,
            withCredentials: true
        })
    }
}

export function deleteFile (idFile) {
    return {
        type: 'DELETE_FILE',
        payload: axios.delete('/api/expert/files/'+idFile, { withCredentials: true })
    }
}

export function postDocument (formData) {
    return {
        type: 'POST_DOCUMENT',
        payload: axios('/api/expert/documents', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function fetchDocument (idDocument) {
    return {
        type: 'FETCH_DOCUMENT',
        payload: axios.get('/api/expert/documents/'+idDocument, { withCredentials: true })
    }
}

export function loadDocument (idDocument) {
    return {
        type: 'LOAD_DOCUMENT',
        payload: axios.get('/api/expert/documents/'+idDocument+'/file', { withCredentials: true })
    }
}

export function updateDocument (document) {
    return {
        type: 'UPDATE_DOCUMENT',
        payload: axios('/api/expert/documents', {
            method: 'put',
            data: document,
            withCredentials: true
        })
    }
}

export function changeDocumentStatus (status, idDocument) {
    return {
        type: 'CHANGE_DOCUMENT_STATUS',
        payload: axios('/api/expert/documents/'+idDocument+'/status', {
            method: 'post',
            data: { status },
            withCredentials: true
        })
    }
}

export function changeDocumentCategory (category, idDocument) {
    return {
        type: 'CHANGE_DOCUMENT_CATEGORY',
        payload: axios('/api/expert/documents/'+idDocument+'/category', {
            method: 'post',
            data: { category },
            withCredentials: true
        })
    }
}

export function deleteDocument (idDocument) {
    return {
        type: 'DELETE_DOCUMENT',
        payload: axios.delete('/api/expert/documents/'+idDocument, { withCredentials: true })
    }
}

export function fetchApplicationByIdDocument (idDocument) {
    return {
        type: 'FETCH_APPLICATION',
        payload: axios.get('/api/expert/applicationByIdDocument/'+idDocument, { withCredentials: true })
    }
}

export function fetchApplication (idApplication) {
    return {
        type: 'FETCH_APPLICATION',
        payload: axios.get('/api/expert/applications/'+idApplication, { withCredentials: true })
        /* unseenComments: 5 in documents */
    }
}

export function postApplication (formData) {
    return {
        type: 'POST_APPLICATION',
        payload: axios('/api/expert/applications', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function updateApplication (formData) {
    return {
        type: 'UPDATE_APPLICATION',
        payload: axios('/api/expert/applications', {
            method: 'put',
            data: formData,
            withCredentials: true
        })
    }
}

export function deleteApplication (id) {
    return {
        type: 'DELETE_APPLICATION',
        payload: axios.delete('/api/expert/applications/'+id, { withCredentials: true })
    }
}

export function fetchOrderByIdApplication (idApplication) {
    return {
        type: 'FETCH_ORDER',
        payload: axios.get('/api/expert/orderByIdApplication/'+idApplication, { withCredentials: true })
    }
}

export function linkedOrderClicked () {
    return {
        type: 'LINKED_ORDER_CLICKED'
    }
}

export function fetchLinkedOrders (idOrder) {
    return {
        type: 'FETCH_LINKED_ORDERS',
        payload: axios.get('/api/expert/linkedOrders/'+idOrder, { withCredentials: true })
    }
}

export function fetchOrder (idOrder) {
    
    return {
        type: 'FETCH_ORDER',
        payload: axios.get('/api/expert/orders/'+idOrder, { withCredentials: true })
    }
}

export function updateOrder (formData) {
    return {
        type: 'UPDATE_ORDER',
        payload: axios('/api/expert/orders', {
            method: 'put',
            data: formData,
            withCredentials: true
        })
    }
}

export function deleteOrder (id) {
    return {
        type: 'DELETE_ORDER',
        payload: axios.delete('/api/expert/orders/'+id, { withCredentials: true })
    }
}

export function fetchOrders (query) {
    
    if (query) return {
        type: 'FETCH_ORDERS',
        payload: axios.get('/api/expert/orders?'+query, { withCredentials: true })
    }
    else return {
        type: 'FETCH_ORDERS',
        payload: axios.get('/api/expert/orders', { withCredentials: true })
    }
}