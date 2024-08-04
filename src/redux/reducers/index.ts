import {combineReducers} from "redux";
import {authReducer, IAuthState} from "./authReducer";
import {chatReducer, IChatState} from "./chatReducer";

const appReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
});

export type AppState = ReturnType<typeof appReducer>;

export default appReducer;
