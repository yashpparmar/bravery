import React from "react";
import {ListGroup} from "react-bootstrap";
import {connect} from "react-redux";
import {addToChat} from "../../services/chatServices";

const Contacts = ({chat, addToChat}) => {
  const {contacts} = chat;
  return (
    <ListGroup variant='flush'>
      {contacts.length ? (
        contacts.map((contact) => (
          <ListGroup.Item key={contact._id} action onClick={() => addToChat(contact._id)}>
            {contact.profile.name}
          </ListGroup.Item>
        ))
      ) : (
        <div className='text-muted text-center mt-4'>No contacts available</div>
      )}
    </ListGroup>
  );
};

const mapStateToProps = (state) => ({
  chat: state.chat.data,
});
export default connect(mapStateToProps, {addToChat})(Contacts);
