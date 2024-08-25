import {Dispatch} from "redux";
import jwtDecode, {JwtPayload} from "jwt-decode";
import {toast} from "react-toastify";
import {
  clearAuthResponse,
  setAuthLoader,
  setAuthResponseError,
  setAuthResponseSuccess,
  setCurrentUser,
  User,
} from "../redux/actions/authActions";
import {
  deleteAllLocalData,
  saveLocalAuthToken,
  saveLocalUserDetails,
} from "../common/helpers/localStorage";
import {getAPIResponseError} from "../common/common";
import {axiosInstance} from "./apiInteraction";
import {endPoints} from "./apiEndPoints";
import {LoginFormValues} from "../pages/Auth/Login";
import {RegisterFormValues} from "../pages/Auth/Register";
import {AnyARecord} from "dns";

interface ICustomJwtPayload extends JwtPayload {
  id?: string;
  username?: string;
}
const setLoginSession = (userData: User) => {
  try {
    saveLocalAuthToken(userData.token);
    // Decode token to get user data
    const decoded = jwtDecode<ICustomJwtPayload>(userData.token);
    const user = {
      ...decoded,
      _id: decoded.id,
    };
    delete user.id;
    saveLocalUserDetails(user);
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData: RegisterFormValues) => async (dispatch: Dispatch) => {
  try {
    dispatch(clearAuthResponse());
    if (!formData) {
      dispatchAuthError("body is required", dispatch);
    } else {
      const body = new FormData();
      body.append("name", formData.fullName);
      body.append("gender", formData.gender);
      body.append("dateOfBirth", formData.dateOfBirth);
      body.append("email", formData.email);
      body.append("phoneNumber", formData.phoneNumber);
      body.append("password", formData.password);
      body.append("avatar", formData.avatar);
      // const headers = {"Content-Type": "multipart/form-data"};

      dispatch(setAuthLoader(true));
      const response = await axiosInstance.post(endPoints.register, body);
      if (response && response.status === 200) {
        dispatch(setAuthResponseSuccess("User registered successfully."));
      }
      return response;
    }
  } catch (error) {
    dispatchAuthError(
      getAPIResponseError(error) || "Unable to Register, please try again",
      dispatch,
    );
    return getAPIResponseError(error);
  } finally {
    dispatch(setAuthLoader(false));
  }
};

export const login = (formData: LoginFormValues) => async (dispatch: Dispatch) => {
  try {
    dispatch(clearAuthResponse());
    if (!formData) {
      dispatchAuthError("body is required", dispatch);
    } else {
      dispatch(setAuthLoader(true));
      const response = await axiosInstance.post(endPoints.login, formData);
      const {data, status} = response;
      if (status === 200 && data.code === 200) {
        setLoginSession(data.user);
        // Set current user
        dispatch(setCurrentUser(data.user));
        dispatch(setAuthResponseSuccess("User login successfully."));
      } else {
        dispatchAuthError(data.data.message || "Login error", dispatch);
      }
      return data;
    }
  } catch (error) {
    dispatchAuthError(getAPIResponseError(error) || "Unable to login, please try again", dispatch);
  } finally {
    dispatch(setAuthLoader(false));
  }
};

export const getUser = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setAuthLoader(true));
    const response = await axiosInstance.get(endPoints.getUser);
    if (response.status === 200 && response.data.code === 200) {
      dispatch(setCurrentUser(response.data.user));
      dispatch(setAuthResponseSuccess("User get successfully."));
    } else {
      toast.error(
        (response.status && `Error when getting user: ${response.status} `) ||
          "Something went wrong!",
      );
      dispatchAuthError(response.data.data.message || "Login error", dispatch);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if ((error as any).code === 401) {
        deleteAllLocalData();
        window.location.assign("/auth/login");
      }
      toast.error(error.message || "Something went wrong!");
    }
    dispatchAuthError(getAPIResponseError(error) || "Unable to login, please try again", dispatch);
  } finally {
    dispatch(setAuthLoader(false));
  }
};

function dispatchAuthError(msg: string, dispatch: Dispatch) {
  dispatch(setAuthResponseError(msg));
}
