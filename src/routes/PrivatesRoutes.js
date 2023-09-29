import React, {memo, useEffect} from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getUser} from "../services/authServices";
import {setupToken} from "../services/apiInteraction";

const PrivatesRoutes = ({element, auth, getUser}) => {
  const token = setupToken();
  useEffect(() => {
    const fetchData = () => {
      if (token) {
        // Only call getUser() if auth.isAuthenticated is false
        if (auth.user && !auth.isAuthenticated) {
          getUser();
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return auth.isAuthenticated ? element : <Navigate to='/auth/login' />;
};

PrivatesRoutes.defaultProps = {
  element: {},
};
PrivatesRoutes.propsTypes = {
  element: PropTypes.element,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {getUser})(memo(PrivatesRoutes));
