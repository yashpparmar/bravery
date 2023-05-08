import { createBrowserRouter } from 'react-router-dom'
import Landing from '../pages/Landing/Landing'
import Login from '../pages/User/Login'
import Register from '../pages/User/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

export default router
