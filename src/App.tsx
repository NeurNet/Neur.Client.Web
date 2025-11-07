import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ModelList from './pages/ModelList';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ModelList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat/:chatId" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
