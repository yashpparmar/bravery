import React from "react";
import {connect} from "react-redux";
import {getSocket} from "../../config/socket";
import {conversations} from "../../config/conversations";

const ChatContainer = ({user}) => {
  const socket = user && getSocket(user._id);
  const {sendMessage} = socket && conversations(socket);
  return <div>ChatContainer</div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(ChatContainer);
