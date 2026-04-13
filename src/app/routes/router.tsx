import { Home } from '@/pages/home';
import { Signin } from '@/pages/signin';
import { Layout } from '@/shared/ui/layout/layout';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', element: <Layout />, children: [{ path: '/', element: <Home /> }] },
  { path: '/signin', element: <Signin /> },
]);
