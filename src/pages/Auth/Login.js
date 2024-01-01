import React, {useState} from "react";
import {Button, Card, Col, Container, Form, Row, Toast, ToastContainer} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import {connect} from "react-redux";
import {login} from "../../services/authServices";
import AlertBox from "../../components/AlertBox/AlertBox";
import "./Login.scss";

const Login = ({auth, login}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })


  const [alert, setAlert] = useState({
    show: false,
    variant: "danger",
    message: "",
  });

  const [toast, setToast] = useState(false);

  const handleFormSubmit = async (data) => {
      const result = await login(data);
      if (result && result.code === 200) {
        reset();
        setToast(true);
        navigate("/user/dashboard");
        // setAlert({ show: true, message: auth.resSuccess, variant: 'success' })
      } else {
        setAlert({show: true, message: auth.resError || result.data.message, variant: "danger"});
      }
  };

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
          <Col sm='0' md>
            <div className='text-info'>
              <h1>Sign into Bravery Direct</h1>
              <p>
                If you don't have a account you can&nbsp;
                <Link to={"/auth/register"}>Register here!</Link>
              </p>
            </div>
          </Col>
          <Col sm='12' md>
            <div className='d-flex align-items-center justify-content-center flex-column'>
              <h2>Login to BRAVERY!</h2>
              <Card body className='login-card'>
                <AlertBox alert={alert} setAlert={setAlert} />
                <Form className='login-form' onSubmit={handleSubmit(handleFormSubmit)}>
                  <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      autoComplete='on'
                      {...register("email",  { required: "This is required.", pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email."
                      }})}
                    />
                    {errors.email && errors.password.type === "required" && <span className="fs-6 text-danger"> <i className="bi bi-exclamation"></i> {errors.email.message}</span>}
                    {errors.email && errors.password.type === "pattern" && <span className="fs-6 text-danger"> <i className="bi bi-exclamation"></i> {errors.email.message}</span>}
                  </Form.Group>
                  <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      {...register("password",  { required: "This is required.", minLength: {
                        value: 8,
                        message: "Minimum length is 8.",
                      }})}
                    />
                    {errors.password && errors.password.type === "required" && <span className="fs-6 text-danger"> <i className="bi bi-exclamation"></i> {errors.password.message}</span>}
                    {errors.password && errors.password.type === "minLength" && <span className="fs-6 text-danger"> <i className="bi bi-exclamation"></i> {errors.password.message}</span>}
                  </Form.Group>
                  <Button
                    className='login-btn my-3'
                    variant='primary'
                    type='submit'
                    disabled={auth.isLoading}
                  >
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
