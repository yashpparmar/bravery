import Landing from '../pages/Landing/Landing'
import Login from '../pages/User/Login'
import Register from '../pages/User/Register'

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
]

export default routes
