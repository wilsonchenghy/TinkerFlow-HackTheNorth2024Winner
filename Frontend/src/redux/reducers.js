import { combineReducers } from "redux";
import instructionContentReducer from "./instructionContentReducer";
import instructionTitleReducer from "./instructionTitleReducer";

const rootReducer = combineReducers({
    instructionContent: instructionContentReducer,
    instructionTitle: instructionTitleReducer,
})

export default rootReducer;