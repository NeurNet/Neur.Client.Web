import { Login } from '@/pages/login';
import { createBrowserRouter } from 'react-router';
import { DashboardLayout } from '../layouts/dashboard-layout';
import { MainLayout } from '../layouts/main-layout';
import { Overview } from '@/pages/dashboard/overview';
import { Users } from '@/pages/dashboard/users';
import { Requests } from '@/pages/dashboard/requests';
import { Models } from '@/pages/dashboard/models';
import { Home } from '@/pages/home';

export const router = createBrowserRouter([
  { path: 'login', element: <Login /> },
  {
    path: '',
    element: <MainLayout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
          { path: '', element: <Overview /> },
          { path: 'users', element: <Users /> },
          { path: 'requests', element: <Requests /> },
          { path: 'models', element: <Models /> },
        ],
      },
    ],
  },
]);
