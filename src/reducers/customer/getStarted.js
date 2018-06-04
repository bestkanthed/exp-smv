const initialState = {
    country: null,
    purpose: null
};

const getStartedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_GET_STARTED_COUNTRY' : {
            return { ...state, country : action.payload }
        }

        case 'SET_GET_STARTED_PURPOSE' : {
            return { ...state, purpose : action.payload }
        }

        default : return state;
    }
}

export default getStartedReducer;