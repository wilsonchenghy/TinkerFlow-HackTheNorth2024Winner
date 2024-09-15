const initialState = [];

const instructionContentReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_INSTRUCTION_CONTENT':
            return [
                ...state,
                ...action.payload
            ];
        default:
            return state;
    }
};

export default instructionContentReducer;