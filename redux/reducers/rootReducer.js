import { combineReducers } from "redux";
import LoginReducer from "./Login";
import UserReducer from "./User";

const rootReducer = combineReducers({
  user: UserReducer,
  login: LoginReducer,
});

export default rootReducer;
