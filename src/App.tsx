import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from './components//Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
