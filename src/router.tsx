import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from './layouts/authorized-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Admin } from './pages/admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthorizedLayout minimumRole="student" />,
    children: [{ path: '', element: <Home /> }],
  },
  {
    path: '/',
    element: <AuthorizedLayout minimumRole="admin" />,
    children: [{ path: '/admin', element: <Admin /> }],
  },
  { path: '/login', element: <Login /> },
]);
