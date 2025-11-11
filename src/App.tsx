import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HeaderLayout from './components/HeaderLayout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route index element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
