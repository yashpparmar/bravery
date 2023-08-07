import React, {memo, useEffect} from "react";
import PropTypes from "prop-types";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {getUser} from "../services/authServices";
import {getLocalUserDetails} from "../common/helpers/localStorage";

const PrivatesRoutes = ({element, auth, getUser}) => {
  const localAuth = !!getLocalUserDetails();
  useEffect(() => {
    function fetchData() {
      if (localAuth) {
        // Only call getUser() if auth.isAuthenticated is false
        if (auth && !auth.isAuthenticated) {
          getUser();
        }
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return localAuth ? element : <Navigate to={"/auth/login"} />;
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
