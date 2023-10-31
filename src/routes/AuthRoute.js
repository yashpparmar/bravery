import React from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {getLocalAuthToken} from "../common/helpers/localStorage";

const AuthRoute = ({element}) => {
  const token = getLocalAuthToken();
  return !!token ? <Navigate to='/user/dashboard' /> : element;
};

AuthRoute.defaultProps = {
  element: "",
};

AuthRoute.propTypes = {
  element: PropTypes.element,
};

export default AuthRoute;
