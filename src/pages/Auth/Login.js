import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row, Toast, ToastContainer} from "react-bootstrap";

import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {isEmail, isEmpty, isPassword} from "../../common/common";
import {login} from "../../services/authServices";
import AlertBox from "../../components/AlertBox";
import "./Login.scss";

const Login = ({auth, login}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    show: false,
    variant: "danger",
    message: "",
  });
  const [toast, setToast] = useState(false);
  const onChangeFormData = (e) => {
    const {id, value} = e.target;
    setFormData((prev) => ({...prev, [id]: value}));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let error = "";
    if (isEmpty(formData.email)) {
      error = "Email is required!";
    } else if (!isEmail(formData.email)) {
      error = "Not valid email";
    } else if (isEmpty(formData.password)) {
      error = "Password is required!";
    } else if (!isPassword(password)) {
      error = "Password should be 8 characters minimum";
    }

    if (!isEmpty(error)) {
      setAlert({show: true, message: error, variant: "danger"});
    } else {
      const result = await login(formData);
      if (result.code === 200) {
        setFormData({
          email: "",
          password: "",
        });
        setToast(true);
        navigate("/user/dashboard");

        // setAlert({ show: true, message: auth.resSuccess, variant: 'success' })
      } else {
        setAlert({show: true, message: auth.resError || result.data.message, variant: "danger"});
      }
    }
  };
  const {email, password} = formData;
  return (
    <Container fluid className='login'>
      <ToastContainer className='p-3' position='top-end'>
        <Toast bg='success' onClose={() => setToast(false)} show={toast} delay={4000} autohide>
          <Toast.Header>
            <img src='holder.js/20x20?text=%20' className='rounded me-2' alt='' />
            <strong className='me-auto'>Success</strong>
          </Toast.Header>
          <Toast.Body className='text-light'>{auth.resSuccess}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className='card-container'>
        <Row className='align-items-center w-100'>
          <Col sm='0' lg>
            <div className='text-info'>
              <h1>Sign into Bravery Direct</h1>
              <p>
                If you don't have a account you can&nbsp;
                <Link to={"/account/register"}>Register here!</Link>
              </p>
            </div>
          </Col>
          <Col sm='12' lg>
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <h2>Login to BRAVERY!</h2>
              <Card body className='login-card'>
                <AlertBox alert={alert} setAlert={setAlert} />
                <Form className='login-form' onSubmit={handleFormSubmit}>
                  <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={onChangeFormData}
                    />
                  </Form.Group>
                  <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={onChangeFormData}
                    />
                  </Form.Group>
                  <Button className='login-btn my-3' variant='primary' type='submit'>
                    Login
                  </Button>
                </Form>
                {/* <Card.Footer className="text-muted text-end">
                </Card.Footer> */}
              </Card>
              {/* <div className="align-self-end pe-3">
                <Link to={'#forgot'}>Forgot password?</Link>
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {login})(Login);
