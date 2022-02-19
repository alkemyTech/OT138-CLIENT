let initialState = {
    amount: 0
};

export default function exampleReducer (state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                amount: state.amount + 1
            }
        case 'EXT':
            return {
                ...state,
                amount: state.amount - 1
            }
        default:
            return state
    }
};