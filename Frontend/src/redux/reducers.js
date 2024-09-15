import { combineReducers } from "redux";
import instructionContentReducer from "./instructionContentReducer";
import instructionTitleReducer from "./instructionTitleReducer";
import schemeticReducer from "./schemeticReducer";
import componentNamesReducer from "./componentNamesReducer";

const rootReducer = combineReducers({
    instructionContent: instructionContentReducer,
    instructionTitle: instructionTitleReducer,
    schemetic: schemeticReducer,
    componentNames: componentNamesReducer
})

export default rootReducer;