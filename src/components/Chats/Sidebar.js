import {useState} from "react";
import {connect} from "react-redux";
import {Nav, Tab} from "react-bootstrap";
import Conversations from "./Conversations";
import Contacts from "./Contacts";

const Sidebar = ({user}) => {
  const CONVERSATIONS_KEY = "conversations";
  const CONTACTS_KEY = "contacts";
  const [key, setKey] = useState(CONVERSATIONS_KEY);
  return (
    <div className='d-flex flex-column border-end rounded w-25'>
      <Tab.Container activeKey={key} onSelect={setKey}>
        <Nav variant='tabs' className='justify-content-center'>
          <Nav.Item className='flex-grow-1'>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>
          <Nav.Item className='flex-grow-1'>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className='overflow-auto flex-grow-1'>
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            {" "}
            <Conversations />{" "}
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            {" "}
            <Contacts />{" "}
          </Tab.Pane>
        </Tab.Content>
        <div className='p-2 border-top small'>
          <span className='text-muted'>{user?.profile?.name || "..."}</span>
        </div>
      </Tab.Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(Sidebar);
