import React, {memo} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getUser} from "../services/authServices";
import {getLocalAuthToken} from "../common/helpers/localStorage";

const PrivatesRoutes = ({element, user, getUser}) => {
  const token = getLocalAuthToken();
  if (!!token) {
    // Only call getUser() if auth.isAuthenticated is false
    if (!user.email) {
      getUser();
      return element;
    } else {
      return element;
    }
  } else {
    return <Navigate to='/auth/login' />;
  }
};

PrivatesRoutes.defaultProps = {
  element: {},
};
PrivatesRoutes.propsTypes = {
  element: PropTypes.element,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {getUser})(memo(PrivatesRoutes));
