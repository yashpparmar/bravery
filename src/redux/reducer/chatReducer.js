import * as Actions from "../actions/actionTypes";

const initialState = {
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

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case Actions.SET_CONTACTS:
      return {
        ...state,
        data: {
          ...state.data,
          contacts: action.payload,
        },
      };
    case Actions.SET_CONVERSATIONS:
      return {
        ...state,
        data: {
          ...state.data,
          conversations: action.payload,
        },
      };
    case Actions.SET_NOTIFICATIONS:
      return {
        ...state,
        data: {
          ...state.data,
          notifications: action.payload,
        },
      };
    case Actions.SET_SELECTED_CONVERSATIONS_ID:
      return {
        ...state,
        data: {
          ...state.data,
          selectedConversationId: action.payload,
        },
      };
    case Actions.SET_CHAT_RES_ERROR:
      return {
        ...state,
        resError: action.payload,
      };
    case Actions.SET_CHAT_RES_SUCCESS:
      return {
        ...state,
        resSuccess: action.payload,
      };
    case Actions.CLEAR_CHAT_RES:
      return {
        ...state,
        resError: "",
        resSuccess: "",
      };
    case Actions.CLEAR_CHAT:
      return initialState;
    default:
      return state;
  }
};
