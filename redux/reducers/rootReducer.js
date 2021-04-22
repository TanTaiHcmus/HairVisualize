import { combineReducers } from "redux";
import CommonReducer from "./Common";
import LoginReducer from "./Login";
import UserReducer from "./User";

const rootReducer = combineReducers({
  user: UserReducer,
  login: LoginReducer,
  common: CommonReducer,
});

export default rootReducer;
