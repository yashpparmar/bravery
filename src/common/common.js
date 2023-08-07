import _ from "lodash";

/**
 * @desc Check if given value is string
 * @param {*} value // Accepts string
 */
export function isString(value) {
  var myRegEx = /^[a-zA-Z\s]*$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value) {
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

export function isPassword(value) {
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
export function isEmail(value) {
  var myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value) {
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
export function isValidDate(d) {
  return d instanceof Date;
}

/**
 * @desc it return unique GUID string
 */
export const getUniqueId = () => {
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
export const isDev = () => {
  if (process.env.NODE_ENV === "development") {
    return true;
  }
  return false;
};

/**
 * @desc get query params
 */
export const getUrlParams = (queryParams) => {
  if (!queryParams) return new URLSearchParams();
  return new URLSearchParams(queryParams);
};

/**
 * @desc get query param by name
 */
export const getUrlParam = (query, name) => {
  let queryParams = new URLSearchParams();
  if (query) queryParams = new URLSearchParams(query);
  return queryParams.get(name);
};

/**
 * @desc get user friendly string from the given value
 * @param {*} value
 * @param {*} replaceChar
 */
export const UserFriendlyString = (value, replaceChar) => {
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

export const stringToBoolean = (value) => {
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

export function mathRound(number, digit = 2) {
  try {
    if (Number(number) < 1) digit = 3;
    if (number) return Number(number).toFixed(digit);
  } catch (e) {}
  return Number(0).toFixed(2);
}

/**
 * @desc get formatted date
 */
export const getFormattedDate = (date) => {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  return day + "/" + month + "/" + year;
};

export const getFormattedTime = (date) => {
  if (!date) date = new Date();
  else date = new Date(date);
  var hour = date.getHours();
  var minutes = date.getMinutes();
  const time = String(hour).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
  return String(time);
};

export const removeWhiteSpaceRegex = (str) => {
  return str.replace(/ +/g, "");
};

export const replaceWhiteSpaceWithDash = (str) => {
  return str.replace(/\s+/g, "-");
};

export const replaceWhiteSpaceWithUnderscore = (str) => {
  return str.replace(/\s+/g, "_");
};

export const getNestedError = (error) => {
  if (error && error.type && error.type === "validation") {
    if (error.errors.length === 1) {
      return error.errors[0].message;
    } else {
      let errors = "";
      for (var i = 0; i < error.errors.length; i++) {
        errors = errors + "(" + (i + 1) + "): " + error.errors[i].message + ". ";
      }
      return errors;
    }
  } else if (error) {
    return error.message || error;
  }

  return;
};

export const getAPIResponseError = (e) => {
  if (e) {
    if (e.response && e.response.data) {
      if (e.response.data.message) {
        return e.response.data.message;
      }
    }
  }
  return;
};

export const removeDuplicates = (data, key) => {
  return [...new Map(data.map((x) => [key(x), x])).values()];
};

export const groupBy = (collection, iteratee) => {
  const groupResult = _.groupBy(collection, iteratee);
  return Object.keys(groupResult).map((key) => {
    return {id: key, orderItems: groupResult[key]};
  });
};

export function isUrl(value) {
  var myRegEx =
    // eslint-disable-next-line max-len
    /(https?:\/\/[^\s]+)/g;
  return value.match(myRegEx);
}
