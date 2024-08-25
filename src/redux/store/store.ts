import {AnyAction, applyMiddleware, legacy_createStore as createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {composeWithDevToolsLogOnlyInProduction} from "@redux-devtools/extension";
import rootReducer, {AppState} from "../reducers/index";

// Define a type for thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, AnyAction>;

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevToolsLogOnlyInProduction(applyMiddleware(...middleware)),
);

export default store;
