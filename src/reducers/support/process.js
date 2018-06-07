const initialState = {
    idOrder: null
};

const getStartedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ID_ORDER' : {
            return { ...state, idOrder : action.payload }
        }
        default : return state;
    }
}

export default getStartedReducer;