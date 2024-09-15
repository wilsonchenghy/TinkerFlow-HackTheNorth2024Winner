const initialState = ['Here\'s what you can make!'];

const instructionTitleReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_INSTRUCTION_TITLE':
            return [...action.payload];
        default:
            return state;
    }
};

export default instructionTitleReducer;