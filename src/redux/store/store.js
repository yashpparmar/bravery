import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducer/index";
import {composeWithDevToolsLogOnlyInProduction} from "@redux-devtools/extension";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevToolsLogOnlyInProduction(applyMiddleware(...middleware)),
);

export default store;
