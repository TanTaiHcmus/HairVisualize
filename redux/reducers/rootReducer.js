import { combineReducers } from "redux";
import CommonReducer from "./Common";
import HairStylesReducer from "./HairStyles";
import HistoryReducer from "./History";
import LoginReducer from "./Login";
import UserReducer from "./User";

const rootReducer = combineReducers({
  user: UserReducer,
  login: LoginReducer,
  common: CommonReducer,
  hairStyles: HairStylesReducer,
  history: HistoryReducer,
});

export default rootReducer;
