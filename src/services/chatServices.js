import {io} from "socket.io-client";
import {
  setChatLoader,
  setChatResponseError,
  setChatResponseSuccess,
  setContacts,
  setConversations,
  setNotifications,
  setSocket,
} from "../redux/actions/chatActions";

export const getSocket = (_id) => async (dispatch, getState) => {
  console.log(_id);
  if (_id) {
    try {
      dispatch(setChatLoader(true));
      const socket = io(`${process.env.REACT_APP_BACKEND_API_URL}/socket`, {
        query: {_id},
      });
      console.log(socket);
      dispatch(setSocket(socket));
      dispatch(setChatResponseSuccess("get socket successfully."));
      return socket;
    } catch (error) {
      console.log("socket error:", error);
      dispatchChatError(error || "Error when getting socket.", dispatch);
    } finally {
      dispatch(setChatLoader(false));
    }
  }
};

export const addMessageToConversation = (data) => async (dispatch, getState) => {
  const {chat} = getState();
  const updatedConversations = chat.data.conversations.reduce((a, v) => {
    if (v._id === data._id) {
      v.messages = [...data.messages];
    }
    return [...a, v];
  }, []);
  console.log("conversations", updatedConversations);
  dispatch(setConversations(updatedConversations));
};

export const sendMessage = (msg, selectedConversationId) => async (dispatch, getState) => {
  const {
    chat: {socket},
  } = getState();
  socket.emit(
    "call",
    "sendMessage",
    {
      to: selectedConversationId,
      message: msg,
    },
    (err, res) => {
      if (err) {
        alert(JSON.stringify(err));
        console.log(err);
      }
      console.log(res);
      dispatch(addMessageToConversation(res));
    },
  );
};

export const addToChat = (_id) => async (dispatch, getState) => {
  const {chat} = getState();
  chat.socket.emit(
    "call",
    "createChat",
    {
      recipients: [_id],
    },
    (err, res) => {
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
        console.log("addToChat", newConversations);
        dispatch(setConversations(newConversations));
      }
    },
  );
};

export const receiveMessage = () => async (dispatch, getState) => {
  const {chat} = getState();
  chat.socket.on("receiveMessage", (res) => {
    if (res._id !== chat.data.selectedConversationId) {
      dispatch(setNotifications([...chat.data.notifications, res._id]));
    }

    dispatch(addMessageToConversation(res));
  });
};

export const createChat = () => async (dispatch, getState) => {
  const {chat} = getState();
  chat.socket.on("chatCreated", (res) => {
    if (res) {
      const newContacts = chat.data.contacts.filter(
        (contact) => !res.members.findIndex((item) => item._id === contact._id),
      );
      dispatch(setContacts(newContacts));
      console.log("createChat", {res}, {chat});
      dispatch(setConversations([...chat.data.conversations, res]));
    }
  });
};

export const getContacts = () => async (dispatch, getState) => {
  const {
    chat: {socket},
  } = getState();
  socket.emit("call", "getContacts", {}, (err, res) => {
    if (err) {
      alert(JSON.stringify(err));
    }
    dispatch(setContacts(res.users));
    console.log("getContacts", res.chats);
    dispatch(setConversations(res.chats));
  });
};

export const closeSocketConnection = () => async (dispatch, getState) => {
  const {
    chat: {socket},
  } = getState();
  socket.off("receiveMessage");
};

function dispatchChatError(msg, dispatch) {
  dispatch(setChatResponseError(msg));
}
