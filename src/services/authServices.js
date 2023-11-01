import jwt_decode from "jwt-decode";
import {toast} from "react-toastify";
import {
  clearAuthResponse,
  setAuthLoader,
  setAuthResponseError,
  setAuthResponseSuccess,
  setCurrentUser,
} from "../redux/actions/authActions";
import {getAPIResponseError} from "../common/common";
import {
  deleteAllLocalData,
  saveLocalAuthToken,
  saveLocalUserDetails,
} from "../common/helpers/localStorage";
import {axiosInstance} from "./apiInteraction";
import {endPoints} from "./apiEndPoints";

const setLoginSession = (userData) => async (dispatch, getState) => {
  try {
    saveLocalAuthToken(userData.token);
    // Decode token to get user data
    const decoded = jwt_decode(userData.token);
    const user = {
      ...decoded,
      _id: decoded.id,
    };
    delete user.id;
    saveLocalUserDetails(user);

    // Set current user
    dispatch(setCurrentUser(userData));
  } catch (error) {}
};

export const register = (obj) => async (dispatch, getState) => {
  try {
    dispatch(clearAuthResponse());
    if (!obj) {
      dispatchAuthError("body is required", dispatch);
    } else {
      const body = new FormData();
      body.append("name", obj.fullName);
      body.append("gender", obj.gender);
      body.append("dateOfBirth", obj.dateOfBirth);
      body.append("email", obj.email);
      body.append("phoneNumber", obj.phoneNumber);
      body.append("password", obj.password);
      body.append("avatar", obj.avatar);
      // const headers = {"Content-Type": "multipart/form-data"};

      dispatch(setAuthLoader(true));

      const response = await axiosInstance.post(endPoints.register, body);
      const {status} = response;
      if (status === 200) {
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

export const login = (obj) => async (dispatch, getState) => {
  try {
    dispatch(clearAuthResponse());
    if (!obj) {
      dispatchAuthError("body is required", dispatch);
    } else {
      dispatch(setAuthLoader(true));
      const response = await axiosInstance.post(endPoints.login, obj);
      const {data, status} = response;
      if (status === 200 && data.code === 200) {
        dispatch(setLoginSession(data.user));
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

export const getUser = () => async (dispatch, getState) => {
  try {
    dispatch(setAuthLoader(true));
    const response = await axiosInstance.get(endPoints.getUser);
    if (response.status === 200 && response.data.code === 200) {
      dispatch(setCurrentUser(response.data.user));
      dispatch(setAuthResponseSuccess("User get successfully."));
    } else {
      toast.error(`Error when getting user: ${response.status} ` || "Something went wrong!");
      dispatchAuthError(response.data.data.message || "Login error", dispatch);
    }
  } catch (error) {
    if (error.code === 401) {
      deleteAllLocalData();
      window.location.assign("/auth/login");
    }
    toast.error(error.message || "Something went wrong!");
    dispatchAuthError(getAPIResponseError(error) || "Unable to login, please try again", dispatch);
  } finally {
    dispatch(setAuthLoader(false));
  }
};

function dispatchAuthError(msg, dispatch) {
  dispatch(setAuthResponseError(msg));
}
