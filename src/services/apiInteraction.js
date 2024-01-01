import axios from "axios";
import jwt_decode from "jwt-decode";
import {deleteAllLocalData, getLocalAuthToken} from "../common/helpers/localStorage";

export const setupToken = () => {
  const authToken = getLocalAuthToken();

  if (authToken) {
    const decoded = jwt_decode(authToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      setHeadersAuthToken(authToken);
      return authToken;
    }
  }
  return false; // if no token or expired token, return false
};

export const setHeadersAuthToken = (token) => {
  try {
    let headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    axiosInstance.defaults.headers = headers;
  } catch (e) {
    console.log("Error setting up the token.", e);
  }
};

export const clearHeadersAuthToken = () => {
  delete axiosInstance.defaults.headers;
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      clearHeadersAuthToken();
      deleteAllLocalData();
      window.location.assign("/auth/login");
    }
    return Promise.reject(error.response.data);
  },
);

(() => {
  setupToken();
})();
