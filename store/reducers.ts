import { combineReducers } from "redux";
import appReducer from "./reducer";

export default combineReducers({
  app: appReducer,
});
