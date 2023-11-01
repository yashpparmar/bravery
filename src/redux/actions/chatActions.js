import * as Actions from "./actionTypes";

/**
 * @desc Set Socket
 */
export const setSocket = (payload) => {
  return {
    type: Actions.SET_SOCKET,
    payload,
  };
};

/**
 * @desc Set Contacts
 */
export const setContacts = (payload) => {
  return {
    type: Actions.SET_CONTACTS,
    payload,
  };
};

/**
 * @desc Set Conversations
 */
export const setConversations = (payload) => {
  return {
    type: Actions.SET_CONVERSATIONS,
    payload,
  };
};

/**
 * @desc Set Notifications
 */
export const setNotifications = (payload) => {
  return {
    type: Actions.SET_NOTIFICATIONS,
    payload,
  };
};

/**
 * @desc Set Notifications
 */
export const setSelectedConversationsId = (payload) => {
  return {
    type: Actions.SET_SELECTED_CONVERSATIONS_ID,
    payload,
  };
};

/**
 * @desc Set Chat Response Errors
 */
export const setChatResponseError = (payload) => {
  return {
    type: Actions.SET_CHAT_RES_ERROR,
    payload,
  };
};

/**
 * @desc Set Chat Response Success
 */
export const setChatResponseSuccess = (payload) => {
  return {
    type: Actions.SET_CHAT_RES_SUCCESS,
    payload: payload,
  };
};

/**
 * @desc Set Chat Loader
 */
export const setChatLoader = (payload) => {
  return {
    type: Actions.SET_CHAT_LOADER,
    payload,
  };
};

/**
 * @desc Clear Chat Response
 */
export const clearChatResponse = () => {
  return {
    type: Actions.CLEAR_CHAT_RES,
  };
};
/**
 * @desc Clear Chat Data
 */
export const clearChatData = () => {
  return {
    type: Actions.CLEAR_CHAT,
  };
};
