import {FC} from "react";
import {Navigate} from "react-router-dom";
import {getLocalAuthToken} from "../common/helpers/localStorage";

interface IAuthRoute {
  element: JSX.Element;
}
const AuthRoute: FC<IAuthRoute> = ({element}) => {
  const token = getLocalAuthToken();
  return token ? <Navigate to='/user/dashboard' /> : element;
};

export default AuthRoute;
