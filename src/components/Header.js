import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            className="bravery-logo"
            alt="Bravery Logo"
            src="/images/bravery-logo.png"
            width="32px"
            height="32px"
          />
          {/* <span className="text-uppercase">Bravery</span> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/achievements">Achievements</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/account/login">Login</Nav.Link>
            <Nav.Link href="/account/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
