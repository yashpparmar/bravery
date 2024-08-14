import {FC} from "react";
import {ListGroup} from "react-bootstrap";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../redux/reducers";
import {addToChat} from "../../services/chatServices";

const Contacts: FC<PropsFromRedux> = ({chat, addToChat}) => {
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
const mapStateToProps = (state: AppState) => ({
  chat: state.chat.data,
});
const connector = connect(mapStateToProps, {addToChat});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Contacts);
