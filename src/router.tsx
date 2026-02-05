import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from './components/AuthorizedLayout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthorizedLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/chat/:chatId', element: <Chat /> },
    ],
  },
  {
    path: '/',
    element: <AuthorizedLayout role="admin" />,
    children: [{ path: '/admin', element: <Admin /> }],
  },
  { path: '/login', element: <Login /> },
]);
