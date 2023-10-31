import React, {useCallback, useEffect, useRef, useState} from "react";
import {Button, Form, InputGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {sendMessage} from "../../services/chatServices";

const ChatContainer = ({user, chat, sendMessage}) => {
  const selectedConversation = chat.conversations.find(
    (conversation) => conversation._id === chat.selectedConversationId,
  );
  const inputRef = useRef();
  const setRef = useCallback((node) => {
    if (node) node.scrollIntoView({smooth: true});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    sendMessage(inputRef.current.value, chat.selectedConversationId);
    inputRef.current.value = "";
  }

  return (
    <div className='d-flex flex-column flex-grow-1'>
      {selectedConversation ? (
        <>
          <div className='flex-grow-1 overflow-auto'>
            <div className='d-flex flex-column align-items-start justify-content-end px-3'>
              {selectedConversation?.messages?.map((message, index) => {
                const lastMessage = selectedConversation.messages.length - 1 === index;
                return (
                  <div
                    ref={lastMessage ? setRef : null}
                    key={index}
                    className={`my-1 d-flex flex-column 
                ${
                  message.sender === user._id
                    ? "align-self-end align-items-end"
                    : "align-items-start"
                }
                `}
                  >
                    <div
                      className={`rounded px-2 py-1 ${
                        message.sender === user._id ? "bg-primary text-white" : "border"
                      }`}
                    >
                      {message.message}
                    </div>
                    <div
                      className={`text-muted small ${
                        message.sender === user._id ? "text-right" : ""
                      }`}
                    >
                      {message.sender === user._id
                        ? "You"
                        : selectedConversation?.members?.find((mem) => mem._id === message.sender)
                            ?.profile.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
              <InputGroup>
                <Form.Control ref={inputRef} required placeholder='type message...' autoFocus />
                <Button type='submit'>Send</Button>
              </InputGroup>
            </Form.Group>
          </Form>{" "}
        </>
      ) : (
        <div className='d-flex align-items-center justify-content-center flex-grow-1'>
          Select chat
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  chat: state.chat.data,
});
export default connect(mapStateToProps, {sendMessage})(ChatContainer);
