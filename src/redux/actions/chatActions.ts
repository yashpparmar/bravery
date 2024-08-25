import {Socket} from "socket.io-client";
import {IConversation} from "../reducers/chatReducer";
import {ChatActionTypes} from "./actionTypes";
import {User} from "./authActions";

/**
 * @desc Set Socket
 */
interface ISocketAction {
  type: ChatActionTypes.SET_SOCKET;
  payload: Socket;
}
export const setSocket = (payload: Socket): ISocketAction => {
  return {
    type: ChatActionTypes.SET_SOCKET,
    payload,
  };
};

/**
 * @desc Set Contacts
 */
interface IContactsAction {
  type: ChatActionTypes.SET_CONTACTS;
  payload: User[];
}
export const setContacts = (payload: User[]): IContactsAction => {
  return {
    type: ChatActionTypes.SET_CONTACTS,
    payload,
  };
};

/**
 * @desc Set Conversations
 */
interface IConversationsAction {
  type: ChatActionTypes.SET_CONVERSATIONS;
  payload: IConversation[];
}
export const setConversations = (payload: IConversation[]): IConversationsAction => {
  return {
    type: ChatActionTypes.SET_CONVERSATIONS,
    payload,
  };
};

/**
 * @desc Set Notifications
 */
interface INotificationsAction {
  type: ChatActionTypes.SET_NOTIFICATIONS;
  payload: string[];
}
export const setNotifications = (payload: string[]): INotificationsAction => {
  return {
    type: ChatActionTypes.SET_NOTIFICATIONS,
    payload,
  };
};

/**
 * @desc Set Notifications
 */
interface ISelectedConversationsIdAction {
  type: ChatActionTypes.SET_SELECTED_CONVERSATIONS_ID;
  payload: string;
}
export const setSelectedConversationsId = (payload: string): ISelectedConversationsIdAction => {
  return {
    type: ChatActionTypes.SET_SELECTED_CONVERSATIONS_ID,
    payload,
  };
};

/**
 * @desc Set Chat Response Errors
 */
interface IChatResponseErrorAction {
  type: ChatActionTypes.SET_CHAT_RES_ERROR;
  payload: string;
}
export const setChatResponseError = (payload: string): IChatResponseErrorAction => {
  return {
    type: ChatActionTypes.SET_CHAT_RES_ERROR,
    payload,
  };
};

/**
 * @desc Set Chat Response Success
 */
interface IChatResponseSuccessAction {
  type: ChatActionTypes.SET_CHAT_RES_SUCCESS;
  payload: string;
}
export const setChatResponseSuccess = (payload: string): IChatResponseSuccessAction => {
  return {
    type: ChatActionTypes.SET_CHAT_RES_SUCCESS,
    payload: payload,
  };
};

/**
 * @desc Set Chat Loader
 */
interface IChatLoaderAction {
  type: ChatActionTypes.SET_CHAT_LOADER;
  payload: boolean;
}
export const setChatLoader = (payload: boolean): IChatLoaderAction => {
  return {
    type: ChatActionTypes.SET_CHAT_LOADER,
    payload,
  };
};

/**
 * @desc Clear Chat Response
 */
interface IClearChatResponseAction {
  type: ChatActionTypes.CLEAR_CHAT_RES;
}
export const clearChatResponse = (): IClearChatResponseAction => {
  return {
    type: ChatActionTypes.CLEAR_CHAT_RES,
  };
};
/**
 * @desc Clear Chat Data
 */
interface IClearChatDataAction {
  type: ChatActionTypes.CLEAR_CHAT;
}
export const clearChatData = (): IClearChatDataAction => {
  return {
    type: ChatActionTypes.CLEAR_CHAT,
  };
};

export type ChatActions =
  | ISocketAction
  | IContactsAction
  | IConversationsAction
  | INotificationsAction
  | ISelectedConversationsIdAction
  | IChatResponseErrorAction
  | IChatResponseSuccessAction
  | IChatLoaderAction
  | IClearChatResponseAction
  | IClearChatDataAction;
