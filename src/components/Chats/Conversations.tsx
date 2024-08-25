import {FC} from "react";
import {ListGroup} from "react-bootstrap";
import {connect, ConnectedProps} from "react-redux";
import {setSelectedConversationsId} from "../../redux/actions/chatActions";
import {AppState} from "../../redux/reducers";

const Conversations: FC<PropsFromRedux> = ({chat, setSelectedConversationsId}) => {
  const {conversations, notifications, selectedConversationId} = chat;
  return (
    <ListGroup variant='flush'>
      {conversations.length ? (
        conversations.map((conversation, index) => (
          <ListGroup.Item
            key={index}
            action
            onClick={() => setSelectedConversationsId(conversation._id)}
            active={selectedConversationId === conversation._id}
          >
            {conversation?.members?.map((member) => member.profile.name).join(", ")}
            {notifications.includes(conversation._id) ? (
              <span>
                <i className='fa-solid fa-comment-dots ms-2 text-primary'></i>
              </span>
            ) : null}
          </ListGroup.Item>
        ))
      ) : (
        <div className='text-muted text-center mt-4'>No conversations</div>
      )}
    </ListGroup>
  );
};

const mapStateToProps = (state: AppState) => ({
  chat: state.chat.data,
});
const connector = connect(mapStateToProps, {setSelectedConversationsId});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Conversations);
