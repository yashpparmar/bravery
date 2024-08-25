import {FC} from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../redux/reducers";

const UserDashboard: FC<PropsFromRedux> = ({auth}) => {
  console.log(auth);
  return <div>UserDashboard</div>;
};

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
});
const connector = connect(mapStateToProps, {});
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(UserDashboard);
