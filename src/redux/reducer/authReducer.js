import * as Actions from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  resError: "",
  resSuccess: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_AUTH_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case Actions.SET_AUTH_RES_ERROR:
      return {
        ...state,
        resError: action.payload,
      };
    case Actions.SET_AUTH_RES_SUCCESS:
      return {
        ...state,
        resSuccess: action.payload,
      };
    case Actions.CLEAR_AUTH_RES:
      return {
        ...state,
        resError: "",
        resSuccess: "",
      };
    case Actions.CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
};
