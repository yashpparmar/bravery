import React, { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

import './Login.scss'
import { Link } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showAlert, setShowAlert] = useState({
    isError: false,
    errorMsg: '',
  })
  const onChangeFormData = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }
  const onSubmit = (e) => {
    e.preventDefault()
  }
  const { email, password } = formData
  return (
    <div className="login-container">
      <Container>
        <Row className="align-items-center">
          <Col>
            <div className="text-info">
              <h1>Sign into Bravery Direct</h1>
              <p>
                If you don't have a account you can&nbsp;
                <Link to={'/account/register'}>Register here!</Link>
              </p>
            </div>
          </Col>
          <Col>
            <Card className="login-card">
              <Card.Header className="text-center">
                <h1>Login</h1>
              </Card.Header>
              <Card.Body>
                {showAlert.isError ? (
                  <Alert
                    variant="danger"
                    onClose={() =>
                      setShowAlert({ isError: false, errorMsg: '' })
                    }
                    dismissible
                  >
                    <Alert.Heading>{showAlert.errorMsg}</Alert.Heading>
                  </Alert>
                ) : null}
                <Form className="login-form" onSubmit={onSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={onChangeFormData}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={onChangeFormData}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3"></Form.Group>
                  <Button
                    className="text-center"
                    variant="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-muted text-end">
                <Link to={'#forgot'}>Forgot password?</Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
