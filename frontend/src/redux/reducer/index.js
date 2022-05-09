import { combineReducers } from "redux";
import loginTokenData from "./loginToken";
import loginStatusData from "./loginStatus";

const rootReducer = combineReducers({
  loginTokenData,
  loginStatusData,
});

export default rootReducer;
