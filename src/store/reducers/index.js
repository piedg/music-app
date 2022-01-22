import { combineReducers } from "redux";
import tracksDataReducer from "./tracksDataReducer";
import tracksPlayerReducer from "./tracksPlayerReducer";


const rootReducer = combineReducers({
  tracksDataReducer,
  tracksPlayerReducer,

});

export default rootReducer;
