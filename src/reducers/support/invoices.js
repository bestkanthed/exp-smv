let intialState = {items : []}

export default function(state = {} , action) {
    switch(action.type) {
        case 'ADD_NEW_ITEM' : intialState.items.push(action.payload); return intialState

        default : return state
    }
}