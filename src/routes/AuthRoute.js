import React, {memo} from "react";
import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const AuthRoute = ({auth, element}) => {
  const isAuthenticated = auth.isAuthenticated;
  return isAuthenticated ? <Navigate to='/user/dashboard' /> : element;
};

AuthRoute.defaultProps = {
  element: "",
};

AuthRoute.propTypes = {
  element: PropTypes.element,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(memo(AuthRoute));
