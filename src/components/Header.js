import React, {memo, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {Button, Figure, Modal, NavDropdown, Offcanvas} from "react-bootstrap/esm";
import {connect} from "react-redux";
import {Link, redirect} from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import {deleteAllLocalData} from "../common/helpers/localStorage";
import "./Header.scss";

const Header = (props) => {
  const {routes, auth} = props;
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getUserData = () => {
    setShowModal(true);
    // getUserData here
  };

  const editProfile = () => {
    //EditProfile here
    setShowModal(false);
  };

  const logout = () => {
    deleteAllLocalData();
    redirect("/");
  };

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand='sm'
        fixed='top'
        id='mainNav'
        className={classNames("header", {
          "header-shadow": isScrolled,
        })}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <Figure className='mb-0 d-flex align-items-center'>
              <Figure.Image
                className='mb-0'
                width={34}
                height={34}
                alt='Bravery Logo'
                src='/images/bravery-logo.png'
              />
              &nbsp;
              <b>Bravery</b>
            </Figure>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} className='navToggleBtn' />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-sm`}
            aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
            placement='end'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>Bravery</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='ms-auto justify-content-end flex-grow-1 pe-3'>
                {routes
                  ? routes?.map((item) => (
                      <Nav.Link
                        className='menu-link'
                        key={item.id}
                        as={Link}
                        to={`${item?.isInSamePage ? "#" : "/"}${item?.route}`}
                      >
                        {item.text}
                      </Nav.Link>
                    ))
                  : null}
                {props?.isUser ? (
                  <NavDropdown
                    title={<img src={auth?.user?.profile?.avatar} alt='avatar' />}
                    className='profile'
                    id={`offcanvasNavbarDropdown-expand-sm`}
                  >
                    <NavDropdown.Item onClick={getUserData}> Edit Profile </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout}> Logout </NavDropdown.Item>
                  </NavDropdown>
                ) : null}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop='static'
        size='lg'
        fullscreen='sm-down'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you&apos;re reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={editProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

Header.defaultProps = {
  routes: [],
};

Header.propTypes = {
  routes: PropTypes.array,
  isUser: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(memo(Header));
