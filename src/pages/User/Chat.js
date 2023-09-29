import React from "react";
import ChatContainer from "../../components/Chats/ChatContainer";

const Chat = () => {
  return (
    <div className='h-100 px-4'>
      <div className='d-flex h-100 chatWrapper'>
        {/* <Sidebar /> */}
        <ChatContainer />
      </div>
    </div>
  );
};

export default Chat;
