import {ReactNode} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {userDashBoardRoutes} from "../routes/MenuLists/userDashBoardRoutes";
import PrivatesRoutes from "../routes/PrivatesRoutes";
import Header from "../components/Header/Header";
import UserDashboard from "../pages/User/UserDashboard";
import Chat from "../pages/User/Chat";
import RegisterComplaints from "../pages/User/RegisterComplaints";
import ViewComplaints from "../pages/User/ViewComplaints";
import Feedback from "../pages/User/Feedback";
import {LayoutContainer, SectionWrapper} from "./Layout";

const UserLayout = (): ReactNode => {
  return (
    <PrivatesRoutes
      element={
        <LayoutContainer>
          <Header routes={userDashBoardRoutes} isUser={true} />
          <SectionWrapper>
            <Routes>
              <Route path='dashboard' element={<UserDashboard />} />
              <Route path='chat' element={<Chat />} />
              <Route path='register-complaints' element={<RegisterComplaints />} />
              <Route path='view-complaints' element={<ViewComplaints />} />
              <Route path='feedback' element={<Feedback />} />
              <Route path='*' element={<Navigate to='dashboard' />} />
            </Routes>
          </SectionWrapper>
        </LayoutContainer>
      }
    />
  );
};

export default UserLayout;
