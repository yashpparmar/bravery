import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import PrivatesRoutes from "../routes/PrivatesRoutes";
import Header from "../components/Header";
import UserDashboard from "../pages/User/UserDashboard";
import {userDashBoardRoutes} from "../routes/MenuLists/userDashBoardRoutes";
import {LayoutContainer, SectionWrapper} from "./Layout";

const UserLayout = () => {
  return (
    <PrivatesRoutes
      element={
        <LayoutContainer>
          <Header routes={userDashBoardRoutes} isUser={true} />
          <SectionWrapper>
            <Routes>
              <Route exact path='dashboard' element={<UserDashboard />} />
              {/* <Route exact path='chat' element={<Chat />} />
              <Route exact path='register-complaint' element={<RegisterComplaint />} />
              <Route exact path='view-complaint' element={<ViewComplaint />} /> */}
              <Route path='*' element={<Navigate to='dashboard' replace={true} />} />
            </Routes>
          </SectionWrapper>
        </LayoutContainer>
      }
    />
  );
};

export default UserLayout;
