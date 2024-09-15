const initialState = [['5V', 'GND', 'D5', 'D6', 'D7'], ['5V', 'GND', 'D1', 'D2'], ['D1', 'D2']];

const schemeticReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'CHANGE_SCHEMETIC':
            return action.payload;
        default:
            return state;
    }
};

export default schemeticReducer;