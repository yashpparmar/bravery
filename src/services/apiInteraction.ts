import axios from "axios";
import jwtDecode, {JwtPayload} from "jwt-decode";
import {deleteAllLocalData, getLocalAuthToken} from "../common/helpers/localStorage";

export const setupToken = () => {
  const authToken = getLocalAuthToken();

  if (authToken) {
    const decoded = jwtDecode<JwtPayload>(authToken);
    const currentTime = Date.now() / 1000;
    if (decoded.exp! > currentTime) {
      setHeadersAuthToken(authToken);
      return authToken;
    }
  }
  return false; // if no token or expired token, return false
};

export const setHeadersAuthToken = (token: string) => {
  try {
    axiosInstance["defaults"]["headers"]["Content-Type"] = "application/json";
    axiosInstance["defaults"]["headers"]["Authorization"] = `Bearer ${token}`;
  } catch (error) {
    console.log("Error setting up the token.", error);
  }
};

export const clearHeadersAuthToken = () => {
  delete axiosInstance["defaults"]["headers"]["Authorization"];
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
