import { createBrowserRouter } from 'react-router';
import { AuthorizedLayout } from './layouts/authorized-layout';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { AdminPanel } from './pages/admin-panel';
import { TeacherPanel } from './pages/teacher-panel';
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
    children: [{ path: '/panel/teacher', element: <TeacherPanel /> }],
  },
  {
    path: '/',
    element: <AuthorizedLayout minimumRole="admin" />,
    children: [{ path: '/panel/admin', element: <AdminPanel /> }],
  },
  { path: '/login', element: <Login /> },
]);
