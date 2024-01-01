import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {chatReducer} from "./chatReducer";

const appReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export default appReducer;
