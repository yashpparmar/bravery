import {Navigate, Route, Routes} from "react-router-dom";
import Header from "../components/Header/Header";
import {authRoutes} from "../routes/MenuLists/authRoutes";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import AuthRoute from "../routes/AuthRoute";
import {LayoutContainer, SectionWrapper} from "./Layout";

const AuthLayout = () => {
  return (
    <AuthRoute
      element={
        <LayoutContainer>
          <Header routes={authRoutes} />
          <SectionWrapper>
            <Routes>
              <Route index path='login' element={<Login />} />
              <Route exact path='register' element={<Register />} />
              <Route path='*' element={<Navigate to='login' />} />
            </Routes>
          </SectionWrapper>
        </LayoutContainer>
      }
    />
  );
};

export default AuthLayout;
