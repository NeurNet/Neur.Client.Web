import { Chat } from '@/pages/chat';
import { Home } from '@/pages/home';
import { Signin } from '@/pages/signin';
import { Models, Overview, Requests, Users } from '@/pages/admin';
import { Layout } from '@/shared/ui/layout';
import { AdminLayout } from '@/shared/ui/admin-layout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/chat/:chatId', element: <Chat /> },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { path: 'overview', element: <Overview /> },
          { path: 'users', element: <Users /> },
          { path: 'requests', element: <Requests /> },
          { path: 'models', element: <Models /> },
        ],
      },
    ],
  },
  { path: '/signin', element: <Signin /> },
]);
