import { combineReducers } from "redux";
import instructionContentReducer from "./instructionContentReducer";

const rootReducer = combineReducers({
    instructionContent: instructionContentReducer,
})

export default rootReducer;