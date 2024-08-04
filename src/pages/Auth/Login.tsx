import {FC, useState} from "react";
import {Button, Card, Col, Container, Form, Row, Toast, ToastContainer} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../redux/reducers";
import {login} from "../../services/authServices";
import {emailRegEx} from "../../common/common";
import AlertBox from "../../components/AlertBox/AlertBox";
import "./Login.scss";

export type LoginFormValues = {
  email: string;
  password: string;
};

const Login: FC<PropsFromRedux> = ({auth, login}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [alert, setAlert] = useState({
    show: false,
    variant: "danger",
    message: "",
  });

  const [toast, setToast] = useState(false);

  const handleFormSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const result = await login(data);
    if (result && result.code === 200) {
      reset();
      setToast(true);
      navigate("/user/dashboard");
    } else {
      setAlert({show: true, message: auth.resError || result.data.message, variant: "danger"});
      reset();
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
          <Col sm={0} lg>
            <div className='text-info'>
              <h1>Sign into Bravery Direct</h1>
              <p>
                If you don&apos;t have a account you can&nbsp;
                <Link to={"/auth/register"}>Register here!</Link>
              </p>
            </div>
          </Col>
          <Col sm={12} lg>
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
                      {...register("email", {
                        required: "This is required.",
                        pattern: {
                          value: emailRegEx,
                          message: "Invalid email.",
                        },
                      })}
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className='fs-6 text-danger ms-1'>
                        <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <span className='fs-6 text-danger ms-1'>
                        <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                        {errors.email.message}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      {...register("password", {
                        required: "This is required.",
                        minLength: {
                          value: 8,
                          message: "Minimum length is 8.",
                        },
                      })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className='fs-6 text-danger ms-1'>
                        <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                      <span className='fs-6 text-danger ms-1'>
                        <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                        {errors.password.message}
                      </span>
                    )}
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

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});
const connector = connect(mapStateToProps, {login});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
