import { Home } from '@/pages/home';
import { Signin } from '@/pages/signin';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/signin', element: <Signin /> },
]);
