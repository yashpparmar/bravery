import {useEffect, useState} from "react";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import AlertBox from "../../components/AlertBox/AlertBox";
import {createImageFromInitials, getRandomColor} from "../../common/utils";
import {register as registerServices} from "../../services/authServices";
import {emailRegEx} from "../../common/common";
import {clearAuthResponse, setAuthResponseSuccess} from "../../redux/actions/authActions";
import "./Register.scss";

const Register = ({registerServices, clearAuthResponse}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
    },
  });
  const files = watch("avatar");
  const [filePreview, setFilePreview] = useState(null);

  const [alert, setAlert] = useState({
    show: false,
    variant: "danger",
    message: "",
  });

  const displayError = () => {
    return <AlertBox alert={alert} setAlert={setAlert} />;
  };

  const validateDateOfBirth = (value) => {
    const selected = new Date(value).getFullYear();
    const now = new Date().getFullYear();
    return now - selected >= 18 || "You must be 18 years or older.";
  };

  useEffect(() => {
    if (files && files.length > 0) {
      const blob = new Blob([files[0]], {type: files[0].type});
      setFilePreview(URL.createObjectURL(blob));
    }
    return () => {
      clearAuthResponse();
    };
  }, [files]);

  const handleFormSubmit = async (formData) => {
    if (formData.avatar === null && formData.fullName !== "") {
      formData["avatar"] = await createImageFromInitials(100, formData.fullName, getRandomColor());
    } else {
      formData["avatar"] = formData.avatar[0];
    }
    const result = await registerServices(formData);
    if (result?.status === 200) {
      setAlert({
        show: true,
        message: "User registered successfully",
        variant: "success",
      });
      setFilePreview(null);
      reset();
    } else {
      setAlert({show: true, message: result, variant: "danger"});
      // reset();
    }
  };

  return (
    <Container fluid className='register-container'>
      <div className='h-100 d-flex align-items-center justify-content-center flex-column'>
        <h2>Create Account!</h2>
        <Card body className='register-card'>
          {displayError()}
          <Form className='register-form' onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className='mb-3'>
              <Col sm={6} className='d-flex justify-content-center align-items-center'>
                <div className='profile-container'>
                  <Image
                    alt='Profile Image'
                    src={filePreview || "/images/vector-users.jpg"}
                    roundedCircle
                  />
                  <Form.Group controlId='avatar' className='avatar mb-0 '>
                    <Form.Label>Choose Image</Form.Label>
                    <Form.Control
                      type='file'
                      accept='image/png, image/jpeg'
                      className='d-none'
                      {...register("avatar")}
                    />
                  </Form.Group>
                </div>
              </Col>
              <Col sm={6}>
                <Form.Group controlId='fullName' className='mb-3'>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter Full Name'
                    {...register("fullName", {
                      required: "This is required.",
                    })}
                  />
                  {errors.fullName && errors.fullName.type === "required" && (
                    <span className='fs-6 text-danger ms-1'>
                      <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                      {errors.fullName.message}
                    </span>
                  )}
                </Form.Group>
                <fieldset className='mb-3'>
                  <Form.Group as={Row} controlId='gender'>
                    <Form.Label as='legend' column sm={4}>
                      Gender
                    </Form.Label>

                    <Col sm={8}>
                      <Form.Check
                        label='Male'
                        name='genderRadio'
                        type='radio'
                        id='Male'
                        value={"male"}
                        {...register("gender", {required: "This is Required."})}
                      />
                      <Form.Check
                        label='Female'
                        name='genderRadio'
                        type='radio'
                        id='Female'
                        value={"female"}
                        {...register("gender", {required: "This is Required."})}
                      />
                      <Form.Check
                        label='Other'
                        name='genderRadio'
                        type='radio'
                        id='Other'
                        value={"other"}
                        {...register("gender", {required: "This is Required."})}
                      />
                      {errors.gender && errors.gender.type === "required" && (
                        <span className='fs-6 text-danger ms-1'>
                          <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                          {errors.gender.message}
                        </span>
                      )}
                    </Col>
                  </Form.Group>
                </fieldset>
                <Form.Group controlId='dateOfBirth'>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type='date'
                    {...register("dateOfBirth", {
                      required: "This is Required.",
                      validate: validateDateOfBirth,
                    })}
                  />
                  {errors.dateOfBirth && errors.dateOfBirth.type === "required" && (
                    <span className='fs-6 text-danger ms-1'>
                      <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                  {errors.dateOfBirth && errors.dateOfBirth.type === "validate" && (
                    <span className='fs-6 text-danger ms-1'>
                      <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                      {errors.dateOfBirth.message}
                    </span>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='phoneNumber'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Phone Number'
                  {...register("phoneNumber", {
                    required: "This is Required.",
                    pattern: {
                      value: /^(\s*[0-9]+\s*)+$/,
                      message: "Phone Number should be 10 digits.",
                    },
                  })}
                />
                {errors.phoneNumber && errors.phoneNumber.type === "required" && (
                  <span className='fs-6 text-danger ms-1'>
                    <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                    {errors.phoneNumber.message}
                  </span>
                )}
                {errors.phoneNumber && errors.phoneNumber.type === "pattern" && (
                  <span className='fs-6 text-danger ms-1'>
                    <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                    {errors.phoneNumber.message}
                  </span>
                )}
              </Form.Group>
              <Form.Group as={Col} controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
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
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} sm={6} controlId='password'>
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
              <Form.Group as={Col} controlId='confirmPassword'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm Password'
                  {...register("confirmPassword", {
                    required: "This is required.",
                    validate: (value, formValues) =>
                      value === formValues.password || "Password not match.",
                  })}
                />
                {errors.confirmPassword && errors.confirmPassword.type === "required" && (
                  <span className='fs-6 text-danger ms-1'>
                    <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                    {errors.confirmPassword.message}
                  </span>
                )}
                {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                  <span className='fs-6 text-danger ms-1'>
                    <i className='fa-solid fa-circle-exclamation fa-xs pe-1'></i>
                    {errors.confirmPassword.message}
                  </span>
                )}
              </Form.Group>
            </Row>
            <Row className='justify-content-center'>
              <Col sm={12} md={6}>
                <Button className='register-btn' type='submit'>
                  Register
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>
    </Container>
  );
};

export default connect(null, {
  registerServices,
  clearAuthResponse,
  setAuthResponseSuccess,
})(Register);
