import React, {useEffect} from "react";
import {connect} from "react-redux";
import {ChatContainer, Sidebar} from "../../components/Chats";
import {
  closeSocketConnection,
  createChat,
  getContacts,
  getSocket,
  receiveMessage,
} from "../../services/chatServices";

const Chat = ({
  user,
  closeSocketConnection,
  createChat,
  getContacts,
  getSocket,
  receiveMessage,
}) => {
  // const addMessageToConversation = useCallback(
  //   (data) => {
  //     const conversations = chat.conversations.find((conversation) => conversation._id === data.id);
  //     conversations.messages = [...data.messages];
  //     setConversations(conversations);
  //   },
  //   [setConversations],
  // );

  // const sendMessage = useCallback((text, selectedConversationId = chat.selectedConversationId) => {
  //   socket.emit(
  //     "call",
  //     "sendMessage",
  //     {
  //       to: selectedConversationId,
  //       message: text,
  //     },
  //     (err, res) => {
  //       if (err) {
  //         alert(JSON.stringify(err));
  //         console.log(err);
  //       }
  //       addMessageToConversation(res);
  //     },
  //   );
  // }, []);

  // const addToChat = (_id) => {
  //   socket.emit(
  //     "call",
  //     "createChat",
  //     {
  //       recipients: [_id],
  //     },
  //     (err, res) => {
  //       if (err) {
  //         alert(JSON.stringify(err));
  //         console.log(err);
  //         return err;
  //       } else {
  //         setContacts((prev) =>
  //           prev.filter((contact) => res.members.findIndex((item) => item._id === contact._id)),
  //         );
  //         setConversations((prev) => [...prev, res]);
  //       }
  //     },
  //   );
  // };

  useEffect(() => {
    const initSocket = async () => {
      await getSocket(user._id);
    };
    initSocket();

    // socket.on("receiveMessage", (res) => {
    //   if (res._id !== chat.selectedConversationId) {
    //     dispatch(setNotifications([...chat.notifications, res._id]));
    //   }
    //   addMessageToConversation(res);
    // });

    receiveMessage();

    // socket.on("chatCreated", (res) => {
    //   if (res) {
    //     const newContacts = chat.contacts.filter(
    //       (contact) => !res.members.findIndex((item) => item._id === contact._id),
    //     );
    //     dispatch(setContacts(newContacts));
    //     dispatch(setConversations([...chat.conversations, res]));
    //   }
    // });

    createChat();

    // socket.emit("call", "getContacts", {}, (err, res) => {
    //   if (err) {
    //     alert(JSON.stringify(err));
    //   }
    //   dispatch(setContacts(res.users));
    //   dispatch(setConversations(res.chats));
    // });

    getContacts();
    return () => closeSocketConnection();
  }, [user]);

  return (
    <div className='h-100 p-4 d-flex'>
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  closeSocketConnection,
  createChat,
  getContacts,
  getSocket,
  receiveMessage,
})(Chat);
