import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from './components/authorized-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { ControlPanel } from './pages/control-panel';
import { UserControl } from './pages/user-control';
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
    element: <AuthorizedLayout minimumRole="teacher" />,
    children: [
      { path: '/panel', element: <ControlPanel /> },
      { path: '/panel/user/:userId', element: <UserControl /> },
    ],
  },
  { path: '/login', element: <Login /> },
]);
