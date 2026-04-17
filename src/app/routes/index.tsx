import { Admin } from '@/pages/admin';
import { Chat } from '@/pages/chat';
import { Home } from '@/pages/home';
import { Signin } from '@/pages/signin';
import { Layout } from '@/shared/ui/layout/layout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/chat/:chatId', element: <Chat /> },
      { path: '/admin', element: <Admin /> },
    ],
  },
  { path: '/signin', element: <Signin /> },
]);
