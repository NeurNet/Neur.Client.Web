import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../layouts/main-layout';
import { LoginPage } from '@/pages/login';
import { HomePage } from '@/pages/home';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/', element: <MainLayout />, children: [{ path: '/', element: <HomePage /> }] },
]);
