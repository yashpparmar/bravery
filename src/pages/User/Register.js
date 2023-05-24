import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Figure,
  Form,
  Image,
  Row,
  Stack,
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './Register.scss'
import {
  isEmpty,
  isEmail,
  isPassword,
  isNumber,
} from '../../common/helpers/functions'
import AlertBox from '../../components/AlertBox'
import { register } from '../../services/authServices'
import {
  createImageFromInitials,
  getRandomColor,
} from '../../common/helpers/utils'
import {
  clearAuthResponse,
  setAuthResponseSuccess,
} from '../../redux/actions/authActions'
const Register = ({
  auth,
  register,
  clearAuthResponse,
  setAuthResponseSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  })

  const [filePreview, setFilePreview] = useState(null)

  const [alert, setAlert] = useState({
    show: false,
    variant: 'danger',
    message: '',
  })

  const onChangeFormData = (key, value) => {
    if (!key) return
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleFileChange = (e) => {
    const { files } = e.target
    if (files && files.length > 0) {
      onChangeFormData('avatar', files[0])
      setFilePreview(URL.createObjectURL(files[0]))
    }
  }

  const displayError = () => {
    return <AlertBox alert={alert} setAlert={setAlert} />
  }

  useEffect(() => {
    return () => {
      clearAuthResponse()
    }
    // eslint-disable-next-line
  }, [])

  const {
    fullName,
    dateOfBirth,
    gender,
    phoneNumber,
    email,
    password,
    confirmPassword,
    avatar,
  } = formData

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    console.log('formData', formData)
    let error = ''
    if (isEmpty(fullName)) {
      error = 'Full name is required!'
    } else if (isEmpty(gender)) {
      error = 'Gender is required!'
    } else if (isEmpty(dateOfBirth)) {
      error = 'DOB is required!'
    } else if (isEmpty(phoneNumber)) {
      error = 'Phone number is required!'
    } else if (!isNumber(phoneNumber)) {
      error = 'Not valid phone number!'
    } else if (isEmpty(email)) {
      error = 'Email is required!'
    } else if (!isEmail(email)) {
      error = 'Not valid email'
    } else if (isEmpty(password)) {
      error = 'Password is required!'
    } else if (!isPassword(password)) {
      error = 'Password should be 8 characters minimum'
    } else if (isEmpty(confirmPassword)) {
      error = 'Confirm password is required!'
    } else if (password !== confirmPassword) {
      error = 'Password not match with confirm password'
    }

    if (avatar === null && fullName !== '') {
      formData['avatar'] = await createImageFromInitials(
        100,
        fullName,
        getRandomColor()
      )
    }

    if (!isEmpty(error)) {
      setAlert({ show: true, message: error, variant: 'danger' })
    } else {
      const result = await register(formData)
      console.log('result', result)
      if (result === 200) {
        setAlert({ show: true, message: auth.resSuccess, variant: 'success' })
        setFilePreview(null)
        setFormData({
          fullName: '',
          gender: '',
          dateOfBirth: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: '',
          avatar: null,
        })
      } else {
        setAlert({ show: true, message: auth.resError, variant: 'danger' })
      }
    }
  }

  return (
    <Container fluid className="register-container">
      <Stack className="pt-3" direction="horizontal" gap={3}>
        <div>
          <Figure className="mb-0 d-flex align-items-center">
            <Figure.Image
              className="mb-0"
              width={50}
              height={50}
              alt="Bravery Logo"
              src="/images/bravery-logo.jpg"
            />
            &nbsp;
            <span className="text-uppercase fw-bolder">Bravery</span>
          </Figure>
        </div>
        <div className="ms-auto">
          <Link className="login-link" to={'/account/login'}>
            Login
          </Link>
        </div>
      </Stack>
      <div className="d-flex align-items-center justify-content-center flex-column">
        <h2>Create Account!</h2>
        <Card body className="register-card">
          {displayError()}
          <Form onSubmit={handleFormSubmit}>
            <Row className="mb-3">
              <Col
                sm={6}
                className="d-flex justify-content-center align-items-center"
              >
                <div className="profile-container">
                  <Image
                    alt="Profile Image"
                    src={filePreview || '/images/vector-users.jpg'}
                    roundedCircle
                  />
                  <div className="overlay">
                    <div className="d-flex align-items-center justify-content-center h-100">
                      <Form.Group controlId="avatar" className="mb-0">
                        <Form.Label className="text-white mb-0">
                          Choose Image
                        </Form.Label>
                        <Form.Control
                          type="file"
                          onChange={handleFileChange}
                          style={{ display: 'none' }}
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <Form.Group controlId="fullName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) =>
                      onChangeFormData('fullName', e.target.value)
                    }
                  />
                </Form.Group>
                <fieldset className="mb-3">
                  <Form.Group as={Row} controlId="gender">
                    <Form.Label as="legend" column sm={4}>
                      Gender
                    </Form.Label>
                    <Col sm={8}>
                      <Form.Check
                        label="Male"
                        name="genderRadio"
                        type="radio"
                        id="Male"
                        checked={gender === 'Male'}
                        onChange={(e) =>
                          onChangeFormData('gender', e.target.id)
                        }
                      />
                      <Form.Check
                        label="Female"
                        name="genderRadio"
                        type="radio"
                        id="Female"
                        checked={gender === 'Female'}
                        onChange={(e) =>
                          onChangeFormData('gender', e.target.id)
                        }
                      />
                      <Form.Check
                        label="Other"
                        name="genderRadio"
                        type="radio"
                        id="Other"
                        checked={gender === 'Other'}
                        onChange={(e) =>
                          onChangeFormData('gender', e.target.id)
                        }
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
                <Form.Group controlId="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) =>
                      onChangeFormData('dateOfBirth', e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="phoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) =>
                    onChangeFormData('phoneNumber', e.target.value)
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => onChangeFormData('email', e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} sm={6} controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => onChangeFormData('password', e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    onChangeFormData('confirmPassword', e.target.value)
                  }
                />
              </Form.Group>
            </Row>
            <Row className="justify-content-center">
              <Col sm={12} md={6}>
                <Button className="register-btn" type="submit">
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  )
}

const mapSateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapSateToProps, {
  register,
  clearAuthResponse,
  setAuthResponseSuccess,
})(Register)
