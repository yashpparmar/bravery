export const conversations = (socket = null) => {
  if (socket !== null) {
    const addToChat = (_id) => {
      socket.emit(
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
            return res;
          }
        },
      );
    };

    const sendMessage = (text, selectedConversationId) => {
      socket.emit(
        "call",
        "sendMessage",
        {
          to: selectedConversationId,
          message: text,
        },
        (err, res) => {
          if (err) {
            alert(JSON.stringify(err));
            console.log(err);
            return err;
          } else {
            return res;
          }
        },
      );
    };

    const receiveMessage = () => {
      if (socket === null) return;
      socket.on("receiveMessage", (res) => {
        if (res) {
          return res;
        }
      });
    };

    const chatCreated = () => {
      socket.on("chatCreated", (res) => {
        if (res) {
          return res;
        }
      });
    };

    return {
      chatCreated,
      receiveMessage,
      sendMessage,
      addToChat,
    };
  }
};
