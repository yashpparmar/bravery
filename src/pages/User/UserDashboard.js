import React from "react";
import {connect} from "react-redux";

const UserDashboard = ({auth}) => {
  return <div>UserDashboard</div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(UserDashboard);
