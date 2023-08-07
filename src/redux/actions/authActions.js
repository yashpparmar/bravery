import * as Actions from "./actionTypes";

/**
 * @desc Set Current User
 */
export const setCurrentUser = (payload) => {
  return {
    type: Actions.SET_USER,
    payload,
  };
};

/**
 * @desc Set Auth Response Errors
 */
export const setAuthResponseError = (payload) => {
  return {
    type: Actions.SET_AUTH_RES_ERROR,
    payload,
  };
};

/**
 * @desc Set Auth Response Success
 */
export const setAuthResponseSuccess = (payload) => {
  return {
    type: Actions.SET_AUTH_RES_SUCCESS,
    payload: payload,
  };
};

/**
 * @desc Set Auth Loader
 */
export const setAuthLoader = (payload) => {
  return {
    type: Actions.SET_AUTH_LOADER,
    payload,
  };
};

/**
 * @desc Clear Auth Response
 */
export const clearAuthResponse = () => {
  return {
    type: Actions.CLEAR_AUTH_RES,
  };
};
/**
 * @desc Clear Auth Data
 */
export const clearAuthData = () => {
  return {
    type: Actions.CLEAR_AUTH,
  };
};
