import { createBrowserRouter } from 'react-router';
import { Home } from './pages/home';

export const router = createBrowserRouter([{ path: '/', element: <Home /> }]);
