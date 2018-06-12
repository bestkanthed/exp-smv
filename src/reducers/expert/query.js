const initialState = {
    idExpert: null,
    idCustomer: null,
    orderType: null,
    status: 'Active',
    country: null
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_QUERY' : {
            return { ...state, ...action.payload }
        }
        default : return state;
    }
}