const AUTH_TOKEN_KEY = "token";
const USER_DETAILS_KEY = "user";

export const saveLocalAuthToken = (data) => {
  try {
    var jsonOfItem = localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const saveLocalUserDetails = (data) => {
  try {
    var jsonOfItem = localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error) {
    console.log(error.message);
  }
};

export const getLocalAuthToken = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) return JSON.parse(token);
    return undefined;
  } catch (error) {
    console.log(error.message);
  }
};

export const getLocalUserDetails = () => {
  try {
    const user = localStorage.getItem(USER_DETAILS_KEY);
    if (user) return JSON.parse(user);
    return undefined;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLocalAuthToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLocalUserDetails = () => {
  try {
    localStorage.removeItem(USER_DETAILS_KEY);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAllLocalData = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);
  } catch (error) {
    console.log(error.message);
  }
};
