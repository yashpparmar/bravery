import React, {memo} from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {getLocalUserDetails} from "../common/helpers/localStorage";

const AuthRoute = (props) => {
  const isAuthenticated = !!getLocalUserDetails();
  return isAuthenticated ? <Navigate to='/user/dashboard' /> : props.element;
};

AuthRoute.defaultProps = {
  element: "",
};

AuthRoute.propTypes = {
  element: PropTypes.element,
};

export default memo(AuthRoute);
