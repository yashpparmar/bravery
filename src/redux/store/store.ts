import {applyMiddleware, legacy_createStore as createStore} from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import {composeWithDevToolsLogOnlyInProduction} from "@redux-devtools/extension";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevToolsLogOnlyInProduction(applyMiddleware(...middleware)),
);

export default store;
