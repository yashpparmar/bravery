import React from "react";
import {getSocket} from "../../config/socket";
import {connect} from "react-redux";

const UserDashboard = ({auth}) => {
  const user = auth.user;
  // const socket = getSocket(user._id);

  // console.log("so", socket);
  return <div>UserDashboard</div>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {})(UserDashboard);
