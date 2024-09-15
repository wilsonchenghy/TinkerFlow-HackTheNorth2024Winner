const initialState = false;

const instructionTitleReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_IS_LOADING':
            return action.payload;
        default:
            return state;
    }
};

export default instructionTitleReducer;