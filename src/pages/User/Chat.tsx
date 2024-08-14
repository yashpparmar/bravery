import {FC, useEffect} from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../redux/reducers";
import {ChatContainer, Sidebar} from "../../components/Chats";
import {
  closeSocketConnection,
  createChat,
  getContacts,
  getSocket,
  receiveMessage,
} from "../../services/chatServices";

const Chat: FC<PropsFromRedux> = ({
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
    }
    return () => {
      closeSocketConnection();
    };
  }, [receiveMessage, createChat, getContacts, closeSocketConnection, socket]);
  console.log("call chat");
  return (
    <div className='h-100 p-4 d-flex'>
      <Sidebar />
      <ChatContainer />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
  socket: state.chat.socket,
});
const connector = connect(mapStateToProps, {
  closeSocketConnection,
  createChat,
  getContacts,
  getSocket,
  receiveMessage,
});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Chat);
