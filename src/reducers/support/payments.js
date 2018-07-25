
export default function(state = {'empty' : 'sad'}, action) {
    switch(action.type) {
        case 'GET_SERVICES_FULFILLED' : return action.payload 

        case 'GET_CUSTOMERS_FULFILLED' : return action.payload ?  action.payload : {'empty' : 'sadd'}

        case 'START_AUTH_FULFILLED' : return action.payload ? action.payload : {'empty' : 'sadd'}

        default : return state
    }
}