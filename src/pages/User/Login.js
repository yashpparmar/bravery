import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'

import './Login.scss'
import { Link } from 'react-router-dom'
import { isEmail, isEmpty, isPassword } from '../../common/helpers/functions'
import { login } from '../../services/authServices'
import { connect } from 'react-redux'
import AlertBox from '../../components/AlertBox'

const Login = ({ auth, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [alert, setAlert] = useState({
    show: false,
    variant: 'danger',
    message: '',
  })
  const onChangeFormData = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    let error = ''
    if (isEmpty(formData.email)) {
      error = 'Email is required!'
    } else if (!isEmail(formData.email)) {
      error = 'Not valid email'
    } else if (isEmpty(formData.password)) {
      error = 'Password is required!'
    } else if (!isPassword(password)) {
      error = 'Password should be 8 characters minimum'
    }

    if (!isEmpty(error)) {
      setAlert({ show: true, message: error, variant: 'danger' })
    } else {
      const result = await login(formData)
      console.log('result', result)
      if (result === 200) {
        setFormData({
          email: '',
          password: '',
        })
        setAlert({ show: true, message: auth.resSuccess, variant: 'success' })
      } else {
        console.log('auth.resError', auth.resError)
        setAlert({ show: true, message: auth.resError, variant: 'danger' })
      }
    }
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
            <div className="d-flex align-items-center justify-content-center flex-column">
              <h2>Login to BRAVERY!</h2>
              <Card body className="login-card">
                <AlertBox alert={alert} setAlert={setAlert} />
                <Form className="login-form" onSubmit={handleFormSubmit}>
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
                <Card.Footer className="text-muted text-end">
                  <Link to={'#forgot'}>Forgot password?</Link>
                </Card.Footer>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { login })(Login)
