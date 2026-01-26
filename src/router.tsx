import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/chat/:chatId', element: <Chat /> },
    ],
  },
  { path: '/login', element: <Login /> },
]);
