import { createBrowserRouter } from 'react-router';
import { LoginPage } from '@/pages/login';

export const router = createBrowserRouter([{ path: '/login', element: <LoginPage /> }]);
