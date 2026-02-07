import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from './layouts/AuthorizedLayout';
import { Home } from './pages/home';
import { Login } from './pages/login';

export const router = createBrowserRouter([
  { path: '/', element: <AuthorizedLayout />, children: [{ path: '', element: <Home /> }] },
  { path: '/login', element: <Login /> },
]);
