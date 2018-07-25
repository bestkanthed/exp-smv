
export default function(state = {finding : true}, action) {
    switch(action.type){
        case 'GET_BILL_FULFILLED' : return action.payload.data

        case 'GET_BILL_PENDING' : return {finding : true}

        case 'GET_BILL' : return  {finding :true}

        default : return state
    }
}