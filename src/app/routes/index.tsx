import { createBrowserRouter } from 'react-router';
import { Chat } from '@/pages/chat';
import { Home } from '@/pages/home';
import { Signin } from '@/pages/signin';
import { Layout } from '@/shared/ui/layout';
import { AdminLayout } from '@/shared/ui/admin-layout';
import { Overview } from '@/pages/admin-overview';
import { Users } from '@/pages/admin-users';
import { Requests } from '@/pages/admin-requests';
import { Models } from '@/pages/admin-models';

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
