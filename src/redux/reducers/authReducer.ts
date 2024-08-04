import {AuthActionTypes} from "../actions/actionTypes";
import {AuthActions, User} from "../actions/authActions";

export interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  resError: string | undefined;
  resSuccess: string | undefined;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: {
    profile: {
      name: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      avatar: "",
    },
    registeredComplaints: {
      municipalComplaints: [],
      policeComplaints: [],
      fireComplaints: [],
    },
    chat: [],
    _id: "",
    email: "",
    token: "",
    __v: 0,
  },
  isLoading: false,
  resError: undefined,
  resSuccess: undefined,
};

export const authReducer = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case AuthActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AuthActionTypes.SET_AUTH_RES_ERROR:
      return {
        ...state,
        resError: action.payload,
      };
    case AuthActionTypes.SET_AUTH_RES_SUCCESS:
      return {
        ...state,
        resSuccess: action.payload,
      };
    case AuthActionTypes.CLEAR_AUTH_RES:
      return {
        ...state,
        resError: "",
        resSuccess: "",
      };
    case AuthActionTypes.CLEAR_AUTH:
      return initialState;
    default:
      return state;
  }
};
