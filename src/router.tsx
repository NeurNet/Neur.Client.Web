import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from './layouts/authorized-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Panel } from './pages/panel';
import { Chat } from './pages/chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthorizedLayout minimumRole="student" />,
    children: [
      { path: '', element: <Home /> },
      { path: '/chat/:chatId', element: <Chat /> },
    ],
  },
  {
    path: '/',
    element: <AuthorizedLayout minimumRole="admin" />,
    children: [{ path: '/panel', element: <Panel /> }],
  },
  { path: '/login', element: <Login /> },
]);
