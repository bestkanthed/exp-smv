import axios from 'axios';

export function postComment (formData) {
    return {
        type: 'POST_COMMENT',
        payload : axios('http://localhost:1169/expert/comment', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function fetchComments (idDocument) {
    return {
        type: 'FETCH_COMMENTS',
        payload : axios.get('http://localhost:1169/expert/comments/'+idDocument, { withCredentials: true })
    }
}

export function uploadFile (file, idDocument) {
    let formData = new FormData()
    formData.append('file', file)
    return {
        type: 'UPLOAD_FILE',
        payload: axios('http://localhost:1169/expert/documents/'+idDocument+'/upload', {
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
        payload: axios.delete('http://localhost:1169/expert/files/'+idFile, { withCredentials: true })
    }
}

export function postDocument (formData) {
    return {
        type: 'POST_DOCUMENT',
        payload: axios('http://localhost:1169/expert/documents', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function fetchDocument (idDocument) {
    return {
        type: 'FETCH_DOCUMENT',
        payload: axios.get('http://localhost:1169/expert/documents/'+idDocument, { withCredentials: true })
    }
}

export function loadDocument (idDocument) {
    return {
        type: 'LOAD_DOCUMENT',
        payload: axios.get('http://localhost:1169/expert/documents/'+idDocument+'/file', { withCredentials: true })
    }
}

export function changeDocumentStatus (status, idDocument) {
    return {
        type: 'CHANGE_DOCUMENT_STATUS',
        payload: axios('http://localhost:1169/expert/documents/'+idDocument+'/status', {
            method: 'post',
            data: { status },
            withCredentials: true
        })
    }
}

export function changeDocumentCategory (category, idDocument) {
    return {
        type: 'CHANGE_DOCUMENT_CATEGORY',
        payload: axios('http://localhost:1169/expert/documents/'+idDocument+'/category', {
            method: 'post',
            data: { category },
            withCredentials: true
        })
    }
}

export function deleteDocument (idDocument) {
    return {
        type: 'DELETE_DOCUMENT',
        payload: axios.delete('http://localhost:1169/expert/documents/'+idDocument, { withCredentials: true })
    }
}

export function fetchApplication (idApplication) {
    console.log('Logging id application', idApplication);
    return {
        type: 'FETCH_APPLICATION',
        payload: axios.get('http://localhost:1169/expert/applications/'+idApplication, { withCredentials: true })
        /* unseenComments: 5 in documents */
    }
}

export function postApplication (formData) {
    return {
        type: 'POST_APPLICATION',
        payload: axios('http://localhost:1169/expert/applications', {
            method: 'post',
            data: formData,
            withCredentials: true
        })
    }
}

export function updateApplication (formData) {
    return {
        type: 'UPDATE_APPLICATION',
        payload: axios('http://localhost:1169/expert/applications', {
            method: 'put',
            data: formData,
            withCredentials: true
        })
    }
}

export function deleteApplication (id) {
    return {
        type: 'DELETE_APPLICATION',
        payload: axios.delete('http://localhost:1169/expert/applications/'+id, { withCredentials: true })
    }
}

export function fetchOrder (idOrder) {
    console.log('Logging idOrder', idOrder)
    return {
        type: 'FETCH_ORDER',
        payload: axios.get('http://localhost:1169/expert/orders/'+idOrder, { withCredentials: true })
    }
}

export function updateOrder (formData) {
    return {
        type: 'UPDATE_ORDER',
        payload: axios('http://localhost:1169/expert/orders', {
            method: 'put',
            data: formData,
            withCredentials: true
        })
    }
}

export function deleteOrder (id) {
    return {
        type: 'DELETE_ORDER',
        payload: axios.delete('http://localhost:1169/expert/orders/'+id, { withCredentials: true })
    }
}

export function fetchOrders (query) {
    console.log('loggig query from fetchOrders', query)
    if (query) return {
        type: 'FETCH_ORDERS',
        payload: axios.get('http://localhost:1169/expert/orders?'+query, { withCredentials: true })
    }
    else return {
        type: 'FETCH_ORDERS',
        payload: axios.get('http://localhost:1169/expert/orders', { withCredentials: true })
    }
}