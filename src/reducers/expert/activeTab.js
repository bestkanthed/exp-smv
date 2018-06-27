const initialState = 0

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_ACTIVE_TAB' : {
            return action.payload
        }
        default : return state;
    }
}