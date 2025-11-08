import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HeaderLayout from './components/HeaderLayout';
import ModelList from './pages/ModelList';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route index element={<ModelList />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
