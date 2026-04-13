import { HomePage } from '@/pages/home';
import { SigninPage } from '@/pages/signin';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/signin', element: <SigninPage /> },
]);
