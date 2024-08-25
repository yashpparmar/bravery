import {Dispatch} from "redux";
import {io, Socket} from "socket.io-client";
import {AppThunk} from "../redux/store/store";
import {
  setChatLoader,
  setChatResponseError,
  setChatResponseSuccess,
  setContacts,
  setConversations,
  setNotifications,
  setSocket,
} from "../redux/actions/chatActions";
import {IConversation} from "../redux/reducers/chatReducer";
import {User} from "../redux/actions/authActions";

export const getSocket =
  (_id: string): AppThunk =>
  async (dispatch) => {
    if (_id) {
      try {
        dispatch(setChatLoader(true));
        const socket: Socket = io(`${process.env.REACT_APP_BACKEND_API_URL}/socket`, {
          query: {_id},
        });
        console.log(socket);
        dispatch(setSocket(socket));
        dispatch(setChatResponseSuccess("get socket successfully."));
        return socket;
      } catch (error) {
        console.log("socket error:", error);
        dispatchChatError("Error when getting socket.", dispatch);
      } finally {
        dispatch(setChatLoader(false));
      }
    }
  };

export const addMessageToConversation =
  (data: IConversation): AppThunk =>
  async (dispatch, getState) => {
    const {chat} = getState();
    const updatedConversations = chat.data.conversations.reduce<IConversation[]>((a, v) => {
      if (v._id === data._id) {
        v.messages = [...data.messages];
      }
      return [...a, v];
    }, []);
    console.log("updatedConversations", updatedConversations);
    dispatch(setConversations(updatedConversations));
  };

export const sendMessage =
  (msg: string, selectedConversationId: string | undefined): AppThunk =>
  async (dispatch, getState) => {
    const {
      chat: {socket},
    } = getState();
    if (socket) {
      socket.emit(
        "call",
        "sendMessage",
        {
          to: selectedConversationId,
          message: msg,
        },
        (err: Error | null, res: IConversation) => {
          if (err) {
            alert(JSON.stringify(err));
            console.log(err);
          }
          dispatch(addMessageToConversation(res));
        },
      );
    }
  };

export const addToChat =
  (_id: string): AppThunk =>
  async (dispatch, getState) => {
    const {chat} = getState();
    if (chat.socket) {
      chat.socket.emit(
        "call",
        "createChat",
        {
          recipients: [_id],
        },
        (err: Error, res: IConversation) => {
          if (err) {
            alert(JSON.stringify(err));
            console.log(err);
            return err;
          } else {
            const contacts = chat.data.contacts.filter((contact) =>
              res.members.findIndex((item) => item._id === contact._id),
            );
            const newConversations = [...chat.data.conversations, res];
            dispatch(setContacts(contacts));
            dispatch(setConversations(newConversations));
          }
        },
      );
    }
  };

export const receiveMessage = (): AppThunk => async (dispatch, getState) => {
  const {chat} = getState();
  if (chat.socket) {
    chat.socket.on("receiveMessage", (res) => {
      if (res._id !== chat.data.selectedConversationId) {
        dispatch(setNotifications([...chat.data.notifications, res._id]));
      }

      dispatch(addMessageToConversation(res));
    });
  }
};

export const createChat = (): AppThunk => async (dispatch, getState) => {
  const {chat} = getState();
  if (chat.socket) {
    chat.socket.on("chatCreated", (res: IConversation) => {
      if (res) {
        const newContacts = chat.data.contacts.filter(
          (contact) => !res.members.findIndex((item) => item._id === contact._id),
        );
        dispatch(setContacts(newContacts));
        dispatch(setConversations([...chat.data.conversations, res]));
      }
    });
  }
};

interface IGetContactsRes {
  users: User[];
  chats: IConversation[];
}
export const getContacts = (): AppThunk => async (dispatch, getState) => {
  const {
    chat: {socket},
  } = getState();
  if (socket) {
    socket.emit("call", "getContacts", {}, (err: Error, res: IGetContactsRes) => {
      if (err) {
        alert(JSON.stringify(err));
      }
      dispatch(setContacts(res.users));
      dispatch(setConversations(res.chats));
    });
  }
};

export const closeSocketConnection = (): AppThunk => async (dispatch, getState) => {
  const {
    chat: {socket},
  } = getState();
  if (socket) socket.off("receiveMessage");
};

function dispatchChatError(msg: string, dispatch: Dispatch) {
  dispatch(setChatResponseError(msg));
}
