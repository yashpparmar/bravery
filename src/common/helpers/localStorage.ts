import {JwtPayload} from "jwt-decode";

const AUTH_TOKEN_KEY = "token";
const USER_DETAILS_KEY = "user";

export const saveLocalAuthToken = (data: string) => {
  try {
    var jsonOfItem = localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
  }
};

interface ICustomJwtPayload extends JwtPayload {
  _id?: string;
  username?: string;
}
export const saveLocalUserDetails = (data: ICustomJwtPayload) => {
  try {
    var jsonOfItem = localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(data));
    return jsonOfItem;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
  }
};

export const getLocalAuthToken = () => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) return JSON.parse(token);
    return undefined;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
  }
};

export const getLocalUserDetails = () => {
  try {
    const user = localStorage.getItem(USER_DETAILS_KEY);
    if (user) return JSON.parse(user);
    return undefined;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
  }
};

export const deleteLocalAuthToken = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
  }
};

export const deleteLocalUserDetails = () => {
  try {
    localStorage.removeItem(USER_DETAILS_KEY);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
  }
};

export const deleteAllLocalData = () => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
  }
};
