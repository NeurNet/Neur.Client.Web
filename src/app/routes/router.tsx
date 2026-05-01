import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../layouts/main-layout';
import { DashboardLayout } from '../layouts/dashboard-layout';
import { LoginPage } from '@/pages/login';
import { HomePage } from '@/pages/home';
import { OverviewPage } from '@/pages/dashboard/overview';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [{ path: '', element: <OverviewPage /> }],
      },
    ],
  },
]);
