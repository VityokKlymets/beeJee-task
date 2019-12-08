import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import tokenReducer from "./tokenReducer";

export default combineReducers({
  task: taskReducer,
  token: tokenReducer,
});
