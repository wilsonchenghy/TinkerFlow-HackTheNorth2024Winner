const initialState = ['C1', 'C2', 'C3'];

const componentNamesReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_COMPONENT_NAMES':
            return [...action.payload];
        default:
            return state;
    }
};

export default componentNamesReducer;