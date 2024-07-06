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

const UserLayout = () => {
  return (
    <PrivatesRoutes
      element={
        <LayoutContainer>
          <Header routes={userDashBoardRoutes} isUser={true} />
          <SectionWrapper>
            <Routes>
              <Route exact path='dashboard' element={<UserDashboard />} />
              <Route exact path='chat' element={<Chat />} />
              <Route exact path='register-complaints' element={<RegisterComplaints />} />
              <Route exact path='view-complaints' element={<ViewComplaints />} />
              <Route exact path='feedback' element={<Feedback />} />
              <Route path='*' element={<Navigate to='dashboard' />} />
            </Routes>
          </SectionWrapper>
        </LayoutContainer>
      }
    />
  );
};

export default UserLayout;
