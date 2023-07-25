import Landing from '../pages/Landing/Landing'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import UserDashboard from '../pages/User/UserDashboard'

const routes = [
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/account/register',
    element: <Register />,
  },
  {
    path: '/account/login',
    element: <Login />,
  },
  {
    path: '/user/dashboard',
    element: <UserDashboard />,
    private: true,
  },
]

export default routes
