const initialState = {
    location: {
        city: null,
        state: null
    },
    fetching: false,
    fetched: false,
    error: null
};

export default function locationReducer (state = initialState, action) {
    switch (action.type) {
        case 'FETCH_LOCATION' : {
            return {...state, fetching: true}
        }
        case 'FETCH_LOCATION_PENDING' : {
            return {...state, fetching: true}            
        }
        case 'FETCH_LOCATION_REJECTED' : {
            return {...state, fetching: false}            
        }
        case 'FETCH_LOCATION_FULFILLED' : {
            console.log('fetch location fullfilled', action.payload);
            return {
                ...state,
                fetching: false,
                fetched: true,
                location: action.payload
            }
        }
        case 'SET_LOCATION' : {
            return {
                ...state,
                location: action.payload
            }
        }
        default :
            return state;
    }
}