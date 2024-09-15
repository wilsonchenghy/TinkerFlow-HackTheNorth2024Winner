const initialState = ['Build with what you had in hand in just one click away'];

const instructionContentReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_INSTRUCTION_CONTENT':
            return [...action.payload];
        default:
            return state;
    }
};

export default instructionContentReducer;