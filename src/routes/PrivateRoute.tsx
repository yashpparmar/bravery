import {FC, memo} from "react";
import {Navigate} from "react-router-dom";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../redux/reducers";
import {getUser} from "../services/authServices";
import {getLocalAuthToken} from "../common/helpers/localStorage";

interface IPrivateRoute extends PropsFromRedux {
  element: JSX.Element;
}
const PrivateRoute: FC<IPrivateRoute> = ({element, user, getUser}) => {
  const token = getLocalAuthToken();
  if (token) {
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

const mapStateToProps = (state: AppState) => ({
  user: state.auth.user,
});
const connector = connect(mapStateToProps, {getUser});
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(memo(PrivateRoute));
