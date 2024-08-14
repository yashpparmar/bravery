import {Socket} from "socket.io-client";
import {User} from "../actions/authActions";
import {ChatActionTypes} from "../actions/actionTypes";
import {ChatActions} from "../actions/chatActions";

type TMessage = {
  _id: string;
  message: string;
  sender: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export interface IConversation {
  members: User[];
  messages: TMessage[];
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IChatState {
  isLoading: boolean;
  socket: Socket | undefined;
  data: {
    contacts: User[];
    conversations: IConversation[];
    notifications: string[];
    selectedConversationId: string | undefined;
  };
  resError: string | undefined;
  resSuccess: string | undefined;
}

const initialState: IChatState = {
  isLoading: false,
  socket: undefined,
  data: {
    contacts: [],
    conversations: [],
    notifications: [],
    selectedConversationId: undefined,
  },
  resError: undefined,
  resSuccess: undefined,
};

export const chatReducer = (state = initialState, action: ChatActions) => {
  switch (action.type) {
    case ChatActionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case ChatActionTypes.SET_CONTACTS:
      return {
        ...state,
        data: {
          ...state.data,
          contacts: action.payload,
        },
      };
    case ChatActionTypes.SET_CONVERSATIONS:
      return {
        ...state,
        data: {
          ...state.data,
          conversations: action.payload,
        },
      };
    case ChatActionTypes.SET_NOTIFICATIONS:
      return {
        ...state,
        data: {
          ...state.data,
          notifications: action.payload,
        },
      };
    case ChatActionTypes.SET_SELECTED_CONVERSATIONS_ID:
      return {
        ...state,
        data: {
          ...state.data,
          selectedConversationId: action.payload,
        },
      };
    case ChatActionTypes.SET_CHAT_RES_ERROR:
      return {
        ...state,
        resError: action.payload,
      };
    case ChatActionTypes.SET_CHAT_RES_SUCCESS:
      return {
        ...state,
        resSuccess: action.payload,
      };
    case ChatActionTypes.CLEAR_CHAT_RES:
      return {
        ...state,
        resError: "",
        resSuccess: "",
      };
    case ChatActionTypes.CLEAR_CHAT:
      return initialState;
    default:
      return state;
  }
};
