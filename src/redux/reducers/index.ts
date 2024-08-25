import {combineReducers} from "redux";
import {authReducer} from "./authReducer";
import {chatReducer} from "./chatReducer";

const appReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export type AppState = ReturnType<typeof appReducer>;

export default appReducer;
