import { createBrowserRouter } from 'react-router';
import { MainLayout } from '../layouts/main-layout';
import { DashboardLayout } from '../layouts/dashboard-layout';
import { LoginPage } from '@/pages/login';
import { HomePage } from '@/pages/home';
import { OverviewPage } from '@/pages/dashboard/overview';
import { UsersPage } from '@/pages/dashboard/users';
import { RequestsPage } from '@/pages/dashboard/requests';
import { ModelsPage } from '@/pages/dashboard/models';

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
        children: [
          { path: '', element: <OverviewPage /> },
          { path: 'users', element: <UsersPage /> },
          { path: 'requests', element: <RequestsPage /> },
          { path: 'models', element: <ModelsPage /> },
        ],
      },
    ],
  },
]);
