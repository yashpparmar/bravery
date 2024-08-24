import _ from "lodash";

/**
 * @desc Check if given value is string
 * @param {*} value // Accepts string
 */
export function isString(value: string) {
  var myRegEx = /^[a-zA-Z\s]*$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value: string) {
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

export function isPassword(value: string) {
  var myRegEx =
    // eslint-disable-next-line
    /^.{8,}$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export function isEmail(value: string) {
  var myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

export const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value: string | object) {
  if (
    value === "" ||
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @desc: Check valid date
 */
export function isValidDate(d: Date) {
  return d instanceof Date;
}

/**
 * @desc it return unique GUID string
 */
export const getUniqueId = (): string => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
};

/**
 * @desc check does it dev mode or live mode
 * it return false only if its a production build
 */
export const isDev = (): boolean => {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  return false;
};

/**
 * @desc get query params
 */
export const getUrlParams = (queryParams?: string) => {
  if (!queryParams) return new URLSearchParams();
  return new URLSearchParams(queryParams);
};

/**
 * @desc get query param by name
 */
export const getUrlParam = (query: string, name: string) => {
  let queryParams = new URLSearchParams();
  if (query) queryParams = new URLSearchParams(query);
  return queryParams.get(name);
};

/**
 * @desc get user friendly string from the given value
 * @param {*} value
 * @param {*} replaceChar
 */
export const UserFriendlyString = (value?: string, replaceChar?: string) => {
  if (!value) return "";
  value = value.trim();

  if (!replaceChar) replaceChar = "_";
  return value === undefined
    ? ""
    : value
        .replace(/[^a-z0-9_]+/gi, replaceChar)
        .replace(/^-|-$/g, "")
        .toLowerCase();
};

export const stringToBoolean = (value: string) => {
  if (!value) return false;

  switch (value.toString().toLowerCase().trim()) {
    case "true":
    case "yes":
    case "1":
      return true;
    case "false":
    case "no":
    case "0":
    case null:
      return false;
    default:
      return Boolean(value);
  }
};

// export const appEnvironments = () => {
//   if (isProduction()) return "inDevlopment";
//   return null;
// };

export function mathRound(number: number, digit = 2) {
  try {
    if (Number(number) < 1) digit = 3;
    if (number) return Number(number).toFixed(digit);
  } catch (e) {
    console.log(e);
  }
  return Number(0).toFixed(2);
}

/**
 * @desc get formatted date
 */
export const getFormattedDate = (date: Date) => {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  return day + "/" + month + "/" + year;
};

export const getFormattedTime = (date: Date) => {
  if (!date) date = new Date();
  else date = new Date(date);
  var hour = date.getHours();
  var minutes = date.getMinutes();
  const time = String(hour).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
  return String(time);
};

export const removeWhiteSpaceRegex = (str: string) => {
  return str.replace(/ +/g, "");
};

export const replaceWhiteSpaceWithDash = (str: string) => {
  return str.replace(/\s+/g, "-");
};

export const replaceWhiteSpaceWithUnderscore = (str: string) => {
  return str.replace(/\s+/g, "_");
};

// Define the structure of the error object
interface ValidationError {
  type: "validation";
  errors: Array<{message: string}>;
}
interface GeneralError {
  message?: string;
}
// Define the possible types for the error parameter
type ErrorType = ValidationError | GeneralError | string | undefined;
export const getNestedError = (error: ErrorType): string | undefined => {
  if (error && typeof error === "object" && "type" in error && error.type === "validation") {
    if (error.errors.length === 1) {
      return error.errors[0].message;
    } else {
      let errors = "";
      for (let i = 0; i < error.errors.length; i++) {
        errors = errors + `(${i + 1}): ${error.errors[i].message}. `;
      }
      return errors;
    }
  } else if (error && typeof error === "object" && "message" in error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  }

  return;
};

export const getAPIResponseError = (
  e: {message?: string; data?: {message?: string}} | undefined,
) => {
  if (e?.message) {
    return e.message;
  }
  if (e?.data?.message) {
    return e.data.message;
  }
  return;
};

export const removeDuplicates = <T>(data: T[], key: (item: T) => unknown): T[] => {
  return [...new Map(data.map((x) => [key(x), x])).values()];
};

export const groupBy = <T>(
  collection: T[],
  iteratee: (item: T) => string | number,
): {id: string | number; orderItems: T[]}[] => {
  const groupResult = _.groupBy(collection, iteratee);
  return Object.keys(groupResult).map((key) => {
    return {id: key, orderItems: groupResult[key]};
  });
};

export function isUrl(value: any) {
  var myRegEx =
    // eslint-disable-next-line max-len
    /(https?:\/\/[^\s]+)/g;
  return value.match(myRegEx);
}
