export default function (state={finding : true}, action) {
    switch(action.type) {
        case 'SEARCH' : return action.payload

        default : return state
    }
}