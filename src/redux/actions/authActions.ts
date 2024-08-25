import {AuthActionTypes} from "./actionTypes";

/**
 * @desc Set Current User
 */
export type User = {
  profile: {
    name: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    avatar: string;
  };
  registeredComplaints: {
    municipalComplaints: [];
    policeComplaints: [];
    fireComplaints: [];
  };
  chat: [];
  _id: string;
  email: string;
  token: string;
  __v: number;
};
interface ICurrentUserAction {
  type: typeof AuthActionTypes.SET_USER;
  payload: User;
}
export const setCurrentUser = (payload: User): ICurrentUserAction => {
  return {
    type: AuthActionTypes.SET_USER,
    payload,
  };
};

/**
 * @desc Set Auth Response Errors
 */
interface IAuthResponseErrorAction {
  type: typeof AuthActionTypes.SET_AUTH_RES_ERROR;
  payload: string;
}
export const setAuthResponseError = (payload: string): IAuthResponseErrorAction => {
  return {
    type: AuthActionTypes.SET_AUTH_RES_ERROR,
    payload,
  };
};

/**
 * @desc Set Auth Response Success
 */
interface IAuthResponseSuccessAction {
  type: typeof AuthActionTypes.SET_AUTH_RES_SUCCESS;
  payload: string;
}
export const setAuthResponseSuccess = (payload: string): IAuthResponseSuccessAction => {
  return {
    type: AuthActionTypes.SET_AUTH_RES_SUCCESS,
    payload,
  };
};

/**
 * @desc Set Auth Loader
 */
interface IAuthLoaderAction {
  type: typeof AuthActionTypes.SET_AUTH_LOADER;
  payload: boolean;
}
export const setAuthLoader = (payload: boolean): IAuthLoaderAction => {
  return {
    type: AuthActionTypes.SET_AUTH_LOADER,
    payload,
  };
};

/**
 * @desc Clear Auth Response
 */
interface IClearAuthResponseAction {
  type: typeof AuthActionTypes.CLEAR_AUTH_RES;
}
export const clearAuthResponse = (): IClearAuthResponseAction => {
  return {
    type: AuthActionTypes.CLEAR_AUTH_RES,
  };
};
/**
 * @desc Clear Auth Data
 */
interface IClearAuthDataAction {
  type: typeof AuthActionTypes.CLEAR_AUTH;
}
export const clearAuthData = (): IClearAuthDataAction => {
  return {
    type: AuthActionTypes.CLEAR_AUTH,
  };
};

export type AuthActions =
  | ICurrentUserAction
  | IAuthResponseErrorAction
  | IAuthResponseSuccessAction
  | IAuthLoaderAction
  | IClearAuthResponseAction
  | IClearAuthDataAction;
