import axios from 'axios';

/**
 * Fetch real data later
 */

export function postComment (comment) {
    return {
        type: 'POST_COMMENT_FULFILLED',
        payload : axios.post('/comment', {
            body: {
                idUser,
                idDocument,
                text
            }
        })
    }
}

export function fetchDocument (idDocument) {
    return {
        type: 'FETCH_DOCUMENT_FULFILLED',
        payload: {
            id: 1,
            name: 'Passport',
            status: 'Perfect',
            link: '/refund-and-cancellation-policy.pdf',
            comments: [
                {
                    id: 1,
                    sentBy: 'Pravin',
                    time: '6:46 PM 18-05-17',
                    seenBy: ['Mike', 'Pravin'],
                    text: 'This passport is prefect'
                },
                {
                    id: 2,
                    sentBy: 'Mike',
                    time: '6:46 PM 19-05-17',
                    seenBy: ['Mike'],
                    text: 'Thanks'
                }
            ]
        }
    }
}

export function fetchApplication (idApplication) {
    return {
        type: 'FETCH_APPLICATION_FULFILLED',
        payload: {
            id: 1,
            name: 'Mike Holloway',
            profession: 'Employed',
            visa: 'Singapore - Tourist 30 Day',
            travelDate: '2018-06-18',
            submissionDate: '2018-05-19',
            status: 'Pickup Scheduled',
            documents: [
                {
                    category: 'Passport',
                    documents: [
                        {
                            id: 1,
                            name: 'Passport',
                            status: 'Perfect',
                            unseenComments: 5
                        }
                    ]
                },
                {
                    category: 'Photograph',
                    documents: [
                        {
                            id: 2,
                            name: 'Photograph',
                            status: 'Perfect',
                            unseenComments: 0
                        }
                    ]
                }
            ]
        }
    }
}

export function fetchOrder (idOrder) {
    return {
        type: 'FETCH_ORDER_FULFILLED',
        payload: {
            id: '1',
            orderId: 'SGVA0001',
            orderType: 'eVisa',
            status: 'New',
            countries: ['Singapore', 'Thailand'],
            customer: {
                name: 'Mike Holloway'
            },
            noOfApplications: 1,
            travelDate: '2018-06-18',
            applications: [
                {
                    id: 1,
                    name: 'Mike Holloway',
                    profession: 'Employed',
                    visa: 'Singapore - Tourist 30 Day',
                    travelDate: '2018-06-18',
                    submissionDate: '2018-05-19',
                    status: 'Pickup Scheduled'
                }
            ]
        }
    }
}

export function fetchOrders (idUser) {
    return {
        type: 'FETCH_ORDERS_FULFILLED',
        payload: [
            {
                id: '1',
                orderId: 'SGVA0001',
                orderType: 'eVisa',
                status: 'New',
                countries: ['Singapore', 'Thailand'],
                customer: {
                    name: 'Mike Holloway'
                },
                noOfApplications: 1,
                travelDate: '2018-06-18',
                invoiceNo: 1
            },
            {
                id: '2',
                orderId: 'SGVA0002',
                orderType: 'eVisa',
                status: 'New',
                countries: ['Singapore'],
                customer: {
                    name: 'Ramesh Hirani'
                },
                noOfApplications: 2,
                travelDate: '2018-06-21',
                invoiceNo: 2
            }
        ]
    }
}