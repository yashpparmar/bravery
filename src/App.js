import {Provider} from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store/store";
import AuthLayout from "./layouts/AuthLayout";
import UserLayout from "./layouts/UserLayout";
import Landing from "./pages/Landing/Landing";
import PageNotFound from "./pages/NotFound/PageNotFound";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />

          {/* Auth Routes */}
          <Route path='auth/*' element={<AuthLayout />} />

          {/* User Routes */}
          <Route path='user/*' element={<UserLayout />} />

          <Route path='*' element={<PageNotFound />} />

          {/* {routes.map((route, i) => {
            return <Route key={i} {...route} />;
          })} */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
