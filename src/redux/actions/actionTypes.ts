// AUTH
export enum AuthActionTypes {
  SET_AUTH_LOADER = "SET_AUTH_LOADER",
  SET_USER = "SET_USER",
  SET_AUTH_RES_ERROR = "SET_AUTH_RES_ERROR",
  SET_AUTH_RES_SUCCESS = "SET_AUTH_RES_SUCCESS",
  CLEAR_AUTH_RES = "CLEAR_AUTH_RES",
  CLEAR_AUTH = "CLEAR_AUTH",
}

// CHAT
export enum ChatActionTypes {
  SET_SOCKET = "SET_SOCKET",
  SET_CHAT_LOADER = "SET_CHAT_LOADER",
  SET_CONTACTS = "SET_CONTACTS",
  SET_CONVERSATIONS = "SET_CONVERSATIONS",
  SET_NOTIFICATIONS = "SET_NOTIFICATIONS",
  SET_SELECTED_CONVERSATIONS_ID = "SET_SELECTED_CONVERSATIONS_ID",
  SET_CHAT_RES_ERROR = "SET_CHAT_RES_ERROR",
  SET_CHAT_RES_SUCCESS = "SET_CHAT_RES_SUCCESS",
  CLEAR_CHAT_RES = "CLEAR_CHAT_RES",
  CLEAR_CHAT = "CLEAR_CHAT",
}
