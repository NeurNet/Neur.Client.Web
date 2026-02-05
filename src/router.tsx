import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from './components/authorized-layout';
import { Home } from './pages/home';
import { Profile } from './pages/profile';
import { Chat } from './pages/chat';
import { Login } from './pages/login';
import { Admin } from './pages/admin';

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
