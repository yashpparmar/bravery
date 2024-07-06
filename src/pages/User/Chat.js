import {useEffect} from "react";
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
  socket,
  closeSocketConnection,
  createChat,
  getContacts,
  getSocket,
  receiveMessage,
}) => {
  useEffect(() => {
    getSocket(user._id);
  }, [user, getSocket]);
  useEffect(() => {
    if (socket !== undefined) {
      receiveMessage();
      createChat();
      getContacts();
      return () => closeSocketConnection();
    }
  }, [receiveMessage, createChat, getContacts, closeSocketConnection, socket]);

  return (
    <div className='h-100 p-4 d-flex'>
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  socket: state.chat.socket,
});
export default connect(mapStateToProps, {
  closeSocketConnection,
  createChat,
  getContacts,
  getSocket,
  receiveMessage,
})(Chat);
